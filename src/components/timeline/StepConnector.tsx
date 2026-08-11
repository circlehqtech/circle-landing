import React from "react";
import { motion } from "framer-motion";

type StepConnectorProps = {
  direction: "down" | "up";
  lit: boolean;
};

/**
 * Dashed elbow that links one step card to the next across the grid gap.
 * Only rendered on large screens, where the cards are staggered.
 */
export function StepConnector({ direction, lit }: StepConnectorProps) {
  const path = direction === "down" ? "M0 2 H18 V62 H36" : "M0 62 H18 V2 H36";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-full hidden lg:block ${
        direction === "down" ? "top-1/2" : "bottom-1/2"
      }`}
    >
      <svg width="36" height="64" viewBox="0 0 36 64" fill="none">
        <motion.path
          d={path}
          stroke={lit ? "#FF0000" : "#3A3A3A"}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ transition: "stroke 0.3s ease" }}
        />

        <motion.circle
          cx="36"
          cy={direction === "down" ? 62 : 2}
          r="2.5"
          fill={lit ? "#FF0000" : "#3A3A3A"}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        />
      </svg>
    </span>
  );
}
