import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  MailIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { CursorField } from "../../components/common/CursorField";
import { READINESS_QUESTIONS } from "../../data/readinessQuestions";
import { sendReadinessScoreEmail } from "../../services/emailService";
import html2pdf from "html2pdf.js";

export function ReadinessPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0-9 questions, 10 capture, 11 results
  const [selectedOptionIndexes, setSelectedOptionIndexes] = useState<
    (number | null)[]
  >(Array(READINESS_QUESTIONS.length).fill(null));

  // Form capture state
  const [fname, setFname] = useState("");
  const [femail, setFemail] = useState("");
  const [fphone, setFphone] = useState("");
  const [fcompany, setFcompany] = useState("");

  const [emailSent, setEmailSent] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  const totalQuestions = READINESS_QUESTIONS.length;
  const isQuestionPhase = currentStep < totalQuestions;
  const isCapturePhase = currentStep === totalQuestions;
  const isResultsPhase = currentStep === totalQuestions + 1;

  // Calculate score
  const totalScore = selectedOptionIndexes.reduce<number>(
    (acc, optionIdx, qIdx) => {
      if (optionIdx !== null) {
        return acc + (READINESS_QUESTIONS[qIdx].options[optionIdx]?.score || 0);
      }
      return acc;
    },
    0,
  );

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedOptionIndexes];
    updated[currentStep] = optionIndex;
    setSelectedOptionIndexes(updated);
  };

  const handleNext = () => {
    if (selectedOptionIndexes[currentStep] === null) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fname.trim() || !femail.trim()) return;
    setCurrentStep(totalQuestions + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine Tier Content
  const getTierData = (score: number) => {
    if (score <= 16) {
      return {
        tierName: "AI Foundation Stage",
        resTitle:
          "Your business is at the starting line. That is the right place to begin.",
        tierDesc:
          "Your business is building the operational foundations that AI needs to work well. This is where most Nigerian businesses are right now. It is not a setback. It is a starting point.",
        insights: [
          "Your processes are mostly undocumented or informal, which means AI would have nothing consistent to work with yet. The first move is to write down how things work clearly and specifically before you automate anything.",
          "Your customer communication appears to be largely manual and reactive. Even simple tools like WhatsApp Business auto-replies can create meaningful improvement without any complex build or significant cost.",
          "Your data situation suggests decisions are being made on instinct more than evidence. Improving this does not require AI. It requires discipline and basic tracking first. That groundwork is worth doing now.",
          "Your team readiness for new tools may need attention before any system is deployed. The human side of AI adoption matters as much as the technology itself.",
          "Your current investment position suggests other priorities need addressing first, which is the right instinct. AI built on an unstable foundation consistently underperforms.",
        ],
        ctaTitle: "Your recommended first step: a 60-minute strategy session.",
        ctaBody:
          "Before any tool, build, or investment, you need a clear map of where to start. We review what to do first, in what order, and how to prepare your operation.",
        ctaBtnText: "Book a Consultation",
        paystackUrl: "/consultation#booking",
      };
    } else if (score <= 26) {
      return {
        tierName: "AI Exploration Stage",
        resTitle:
          "Your business has real AI potential with a few clear things to address first.",
        tierDesc:
          "You have structure, some data, and genuine curiosity about AI. You are in the most common and most interesting position, close enough to act but with important groundwork still to complete.",
        insights: [
          "Your processes are partially documented, which means you can identify the ones ready for automation now while you finish documenting the rest. You do not need everything perfect to start somewhere meaningful.",
          "Your customer communication has gaps that are almost certainly costing you leads. A well-configured WhatsApp response system and a structured follow-up sequence can close most of these gaps quickly.",
          "You have some data, but it is not yet consistently powering decisions. Before automating reporting, agree on the three metrics that matter most to your business and track them weekly for one month.",
          "There is likely someone on your team who could champion an AI initiative with the right support. Identifying that person before any build begins is a critical step that most businesses skip.",
          "Your investment position suggests you are exploring seriously. A strategy session at this stage gives you the most value and a specific roadmap rather than a generic conversation.",
        ],
        ctaTitle:
          "Your recommended next step: a 60-minute AI Strategy Session.",
        ctaBody:
          "In 60 minutes with Flora and the Circle HQ team, we map your top automation opportunities, identify what to build first, and give you a realistic roadmap with investment ranges.",
        ctaBtnText: "Book a Consultation",
        paystackUrl: "/consultation#booking",
      };
    } else {
      return {
        tierName: "AI Implementation Ready",
        resTitle:
          "Your business is genuinely ready for AI. The question now is where to start first.",
        tierDesc:
          "You have the operational foundation, the data habits, and the team readiness that most businesses spend months building. You are in a strong position to move with confidence and see measurable results within 90 days.",
        insights: [
          "Your documented processes mean AI has something clean and consistent to work with. This significantly reduces build time, cost, and implementation risk. You have already done the groundwork that most businesses skip entirely.",
          "Your data practices mean you will be able to measure the impact of any AI system clearly, which is essential for knowing what is working and making the internal case for further investment over time.",
          "Your team openness to new tools is a significant advantage. AI implementations fail most often not because of the technology but because of internal resistance. You have already handled the harder half of that equation.",
          "Your current pain points are well-matched to AI solutions that deliver measurable results within 60 to 90 days of deployment. The path from where you are to tangible return on investment is shorter than for most businesses.",
          "You are ready for a full implementation conversation. The next step is a detailed scoping session where we design the right system for your specific business and agree on a build plan.",
        ],
        ctaTitle: "Your next step: a full AI implementation scoping session.",
        ctaBody:
          "You are ready to build. Circle HQ's next conversation with you is a detailed scoping session. We design the right AI system for your business, define measurable success, and agree on a build plan with clear timelines.",
        ctaBtnText: "Book a Consultation",
        paystackUrl: "/consultation#booking",
      };
    }
  };

  const tierData = getTierData(totalScore);

  const handleSendEmail = async () => {
    if (!femail || isSendingEmail || emailSent) return;
    setIsSendingEmail(true);

    const result = await sendReadinessScoreEmail({
      user_name: fname,
      user_email: femail,
      user_phone: fphone,
      user_company: fcompany,
      total_score: totalScore,
      max_score: 40,
      tier_name: tierData.tierName,
      tier_desc: tierData.tierDesc,
      insights: tierData.insights,
      company_email: "hello@circlehqcompany.com",
    });

    setIsSendingEmail(false);
    if (result.success) {
      setEmailSent(true);
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloadingPDF(true);
    try {
      const element = document.createElement("div");
      element.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 30px; color: #0A0A0A; background: #ffffff;">
          <div style="border-bottom: 2px solid #CC0000; padding-bottom: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: bold; letter-spacing: 0.15em; color: #CC0000; text-transform: uppercase;">CIRCLE HQ &middot; FLORA NNAMAKA</div>
            <h1 style="font-size: 24px; font-weight: bold; margin: 10px 0 5px; color: #111;">AI Readiness Scorecard</h1>
            <p style="font-size: 14px; color: #666; margin: 0 0 10px;">Personalized Assessment for ${fname || "Your Business"}</p>
          </div>

          <div style="background: #0A0A0A; color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <div style="font-size: 32px; font-weight: bold; color: #CC0000;">${totalScore} / 40</div>
            <div style="font-size: 18px; font-weight: bold; color: #ffffff; margin-top: 5px;">${tierData.tierName}</div>
            <p style="font-size: 13px; color: #cccccc; margin-top: 8px; line-height: 1.5;">${tierData.tierDesc}</p>
          </div>

          <h3 style="font-size: 16px; font-weight: bold; color: #111; margin-bottom: 12px;">Key Operational Insights:</h3>
          ${tierData.insights
            .map(
              (item) =>
                `<div style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-size: 13px; line-height: 1.6; color: #333;">&bull; ${item}</div>`,
            )
            .join("")}

          <div style="margin-top: 30px; font-size: 11px; color: #888888; border-top: 1px solid #dddddd; padding-top: 15px;">
            Circle HQ &middot; Smart AI Solutions & Workforce Capability &middot; hello@circlehqcompany.com
          </div>
        </div>
      `;

      const opt = {
        margin: 10,
        filename: `AI-Readiness-Score-${(fname || "Business").replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "mm" as const,
          format: "a4" as const,
          orientation: "portrait" as const,
        },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-hq-black text-white pb-24">
      {/* Hero Header */}
      <section className="relative isolate overflow-hidden pt-28 pb-14 border-b border-hq-line">
        <CursorField theme="dark" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-hq-red/40 bg-hq-red/10 px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-hq-red mb-6">
            <SparklesIcon size={12} />
            FREE ASSESSMENT &middot; 3 MINUTES
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl">
            How <span className="text-hq-red italic">AI-Ready</span> Is Your
            Business?
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-sm sm:text-base leading-relaxed text-zinc-400">
            10 honest questions about how your business really operates. Get a
            personalised score, your readiness tier, and specific next steps
            delivered instantly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 border-t border-white/10 pt-6 font-mono text-xs text-zinc-400">
            <div>
              <strong className="text-white block font-sans text-base">
                10
              </strong>{" "}
              Questions
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <strong className="text-white block font-sans text-base">
                3 min
              </strong>{" "}
              To complete
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <strong className="text-white block font-sans text-base">
                Personal
              </strong>{" "}
              Result
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div>
              <strong className="text-hq-red block font-sans text-base">
                Free
              </strong>{" "}
              Always
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Quiz Section */}
      <section className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8">
        {/* Progress Bar (Visible during questions) */}
        {isQuestionPhase && (
          <div className="mb-10 space-y-2">
            <div className="flex justify-between font-mono text-xs text-zinc-400">
              <span>{READINESS_QUESTIONS[currentStep].num}</span>
              <span className="text-hq-red font-bold">
                {Math.round(((currentStep + 1) / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-hq-red"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / totalQuestions) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* 1. Question Step */}
        {isQuestionPhase && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 bg-hq-panel p-6 sm:p-10 shadow-2xl"
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-hq-red">
                {READINESS_QUESTIONS[currentStep].num}
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-white leading-snug">
                {READINESS_QUESTIONS[currentStep].question}
              </h2>

              <div className="mt-8 space-y-3">
                {READINESS_QUESTIONS[currentStep].options.map((opt, idx) => {
                  const isSelected = selectedOptionIndexes[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full flex items-start gap-4 p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-hq-red bg-hq-red/10 text-white shadow-[0_0_20px_rgba(255,0,0,0.2)]"
                          : "border-white/10 bg-[#121212] text-zinc-300 hover:border-white/25 hover:bg-[#161616]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                          isSelected
                            ? "border-hq-red bg-hq-red text-white"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </span>
                      <span className="text-sm sm:text-base font-medium leading-relaxed">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation Controls */}
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeftIcon size={14} /> Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedOptionIndexes[currentStep] === null}
                  className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedOptionIndexes[currentStep] !== null
                      ? "bg-hq-red text-white shadow-lg shadow-hq-red/30 hover:bg-hq-red-deep"
                      : "bg-white/10 text-zinc-500 cursor-not-allowed opacity-50"
                  }`}
                >
                  {currentStep === totalQuestions - 1
                    ? "See My Results"
                    : "Next"}{" "}
                  <ArrowRightIcon size={14} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* 2. Lead Capture Step */}
        {isCapturePhase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-hq-panel p-6 sm:p-10 shadow-2xl"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-hq-red">
              ALMOST DONE
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white">
              Where should we send your results?
            </h2>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Your personalised AI Readiness Score is ready. Enter your details
              below to receive your full breakdown including your tier, specific
              insights, and recommended next step.
            </p>

            <form onSubmit={handleCaptureSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  required
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="Ada"
                  className="w-full rounded-xl border border-white/10 bg-hq-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-hq-red transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                  BUSINESS EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={femail}
                  onChange={(e) => setFemail(e.target.value)}
                  placeholder="you@yourbusiness.com"
                  className="w-full rounded-xl border border-white/10 bg-hq-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-hq-red transition-colors"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                    WHATSAPP / PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    value={fphone}
                    onChange={(e) => setFphone(e.target.value)}
                    placeholder="+234 801 234 5678"
                    className="w-full rounded-xl border border-white/10 bg-hq-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-hq-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                    COMPANY / INDUSTRY (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={fcompany}
                    onChange={(e) => setFcompany(e.target.value)}
                    placeholder="Real Estate, Logistics..."
                    className="w-full rounded-xl border border-white/10 bg-hq-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-hq-red transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2 rounded-full bg-hq-red py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-hq-red-deep transition-all cursor-pointer"
              >
                Reveal my AI Readiness Score <ArrowRightIcon size={16} />
              </button>

              <p className="text-center font-mono text-[11px] text-zinc-500 pt-2">
                🔒 Your information is private. No spam. Only your results &
                business insights from Circle HQ.
              </p>
            </form>
          </motion.div>
        )}

        {/* 3. Results Step */}
        {isResultsPhase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-hq-red/40 bg-hq-panel p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {/* Header / Score Display */}
            <div className="border-b border-white/10 pb-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                PERSONAL RESULTS FOR {fname.toUpperCase() || "YOU"}
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                {tierData.resTitle}
              </h2>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6 rounded-2xl border border-hq-red/30 bg-[#160305] p-6">
                <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-2 border-hq-red bg-hq-red/10 text-white">
                  <span className="font-display text-3xl font-extrabold leading-none text-hq-red">
                    {totalScore}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">
                    / 40
                  </span>
                </div>

                <div>
                  <span className="rounded-full bg-hq-red/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-hq-red">
                    {tierData.tierName}
                  </span>
                  <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                    {tierData.tierDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Operational Insights List */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">
                WHAT YOUR SCORE TELLS US ABOUT YOUR BUSINESS
              </h3>
              <ul className="space-y-3">
                {tierData.insights.map((insight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#111111] p-4 text-sm text-zinc-300 leading-relaxed"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-hq-red" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Box */}
            <div className="rounded-2xl border border-white/10 bg-hq-black p-6 sm:p-8 space-y-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hq-red font-bold">
                RECOMMENDED NEXT STEP
              </span>
              <h4 className="font-display text-2xl font-semibold text-white">
                {tierData.ctaTitle}
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {tierData.ctaBody}
              </p>

              <div className="pt-2">
                <Link
                  to={tierData.paystackUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-hq-red px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-hq-red-deep transition-all"
                >
                  {tierData.ctaBtnText} <ArrowRightIcon size={16} />
                </Link>
              </div>
            </div>

            {/* Action Buttons: Email Score & Download PDF */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={emailSent || isSendingEmail}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-xs font-mono text-white hover:border-hq-red hover:bg-[#181818] transition-all cursor-pointer disabled:opacity-70"
              >
                <MailIcon size={14} className="text-hq-red" />
                {emailSent
                  ? "Score Sent to Your Email!"
                  : isSendingEmail
                    ? "Sending Email..."
                    : "Send Score to My Email"}
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isDownloadingPDF}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#121212] px-4 py-3 text-xs font-mono text-white hover:border-hq-red hover:bg-[#181818] transition-all cursor-pointer disabled:opacity-70"
              >
                <DownloadIcon size={14} className="text-hq-red" />
                {isDownloadingPDF
                  ? "Downloading PDF..."
                  : "Download Result as PDF"}
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
