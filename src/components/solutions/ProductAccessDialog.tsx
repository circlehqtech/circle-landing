import React, { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  LockKeyholeIcon,
  MailCheckIcon,
  XIcon,
} from "lucide-react";
import { requestProductAccess } from "../../services/emailService";

export type ProductAccessProduct = {
  id: "restaurant-ai" | "circle-props" | "circle-pay";
  name: string;
  headline: string;
};

type ProductAccessDialogProps = {
  product: ProductAccessProduct;
  onClose: () => void;
};

const inputClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 hover:border-white/20 focus:border-hq-red focus:ring-2 focus:ring-hq-red/20";

export function ProductAccessDialog({
  product,
  onClose,
}: ProductAccessDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href]",
        ),
      );

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isSubmitting, onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const result = await requestProductAccess({
      product_id: product.id,
      user_name: String(formData.get("name") || "").trim(),
      user_email: email,
      user_phone: String(formData.get("phone") || "").trim(),
      user_company: String(formData.get("company") || "").trim(),
      business_context: String(formData.get("context") || "").trim(),
    });

    if (!result.success) {
      setError(result.error || "We could not process your request.");
      setIsSubmitting(false);
      return;
    }

    setSubmittedEmail(email);
    setIsComplete(true);
    setIsSubmitting(false);
  };

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-x-hidden overflow-y-auto bg-black/80 px-4 py-4 backdrop-blur-md sm:items-center sm:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-x-hidden overflow-y-auto rounded-[28px] border border-white/10 bg-[#101014] shadow-[0_32px_120px_rgba(0,0,0,0.75)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-hq-red/15 blur-[90px]"
        />

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close product access form"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 transition-colors hover:border-hq-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hq-red disabled:cursor-not-allowed disabled:opacity-40"
        >
          <XIcon size={18} aria-hidden="true" />
        </button>

        <div className="relative border-b border-white/10 px-6 pb-6 pt-8 sm:px-9 sm:pb-8 sm:pt-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-hq-red/25 bg-hq-red/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-hq-red">
            {isComplete ? (
              <MailCheckIcon size={12} aria-hidden="true" />
            ) : (
              <LockKeyholeIcon size={12} aria-hidden="true" />
            )}
            {isComplete ? "Access sent" : "Product access"}
          </span>
          <h2
            id={titleId}
            className="mt-5 max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl"
          >
            {isComplete
              ? "Check your inbox"
              : `Before you explore ${product.name}`}
          </h2>
          <p
            id={descriptionId}
            className="mt-3 max-w-xl text-sm leading-relaxed text-hq-mute sm:text-base"
          >
            {isComplete
              ? `We sent your private ${product.name} access link to ${submittedEmail}.`
              : "Tell us a little about you and what you are trying to improve. We use this context to understand product interest and make any follow-up useful."}
          </p>
        </div>

        {isComplete ? (
          <div className="relative p-6 sm:p-9" role="status" aria-live="polite">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] p-5 sm:p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                <MailCheckIcon size={23} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                Your access email is on its way
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-hq-mute">
                Open the email and select{" "}
                <strong className="text-white">Explore {product.name}</strong>{" "}
                to visit the live product. If it does not arrive shortly, check
                your spam or promotions folder.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-hq-red px-6 text-sm font-semibold text-white transition-colors hover:bg-hq-red-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hq-red focus-visible:ring-offset-2 focus-visible:ring-offset-[#101014]"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative space-y-5 p-6 sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-white">
                Name
                <input
                  ref={firstInputRef}
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  className={inputClassName}
                />
              </label>

              <label className="text-sm font-medium text-white">
                Work email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                  className={inputClassName}
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-white">
                Organisation
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  maxLength={120}
                  required
                  placeholder="Company or organisation"
                  className={inputClassName}
                />
              </label>

              <label className="text-sm font-medium text-white">
                Phone number
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  maxLength={30}
                  required
                  placeholder="+234 800 000 0000"
                  className={inputClassName}
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-white">
              What are you hoping to improve?
              <textarea
                name="context"
                required
                minLength={12}
                maxLength={1200}
                rows={4}
                placeholder="Briefly describe the workflow, challenge, or result you are interested in."
                className={`${inputClassName} resize-y py-3.5`}
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm leading-relaxed text-red-200"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex max-w-xs items-start gap-2 text-xs leading-relaxed text-hq-mute">
                <CheckCircle2Icon
                  size={15}
                  className="mt-0.5 shrink-0 text-hq-red"
                  aria-hidden="true"
                />
                Your details are sent securely to Circle HQ and are not
                displayed publicly.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-hq-red px-6 text-sm font-semibold text-white transition-colors hover:bg-hq-red-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hq-red focus-visible:ring-offset-2 focus-visible:ring-offset-[#101014] disabled:cursor-wait disabled:opacity-60"
              >
                {isSubmitting
                  ? "Sending access link…"
                  : "Email me the access link"}
                {!isSubmitting && (
                  <ArrowRightIcon size={16} aria-hidden="true" />
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
