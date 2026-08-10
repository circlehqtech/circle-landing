import { motion } from "framer-motion";

type TypingDotsProps = {
  className?: string;
};

export function TypingDots({ className = "bg-hq-red" }: TypingDotsProps) {
  return (
    <span
      className="flex items-center gap-1.5 py-1"
      aria-label="AI Assistant is typing"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`block h-2 w-2 rounded-full ${className}`}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  );
}
