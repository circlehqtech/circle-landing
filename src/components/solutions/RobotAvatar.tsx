import { motion } from "framer-motion";

type RobotAvatarProps = {
  awake: boolean;
  size?: number;
};

export function RobotAvatar({ awake, size = 40 }: RobotAvatarProps) {
  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      animate={awake ? { y: [0, -4, 0] } : { y: 0 }}
      transition={{
        duration: 3.2,
        repeat: awake ? Infinity : 0,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-brand blur-xl"
        animate={{ opacity: awake ? 0.5 : 0.14 }}
        transition={{ duration: 0.35 }}
      />

      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        className="relative"
        role="presentation"
      >
        <rect
          x="22.6"
          y="2"
          width="2.8"
          height="7"
          rx="1.4"
          fill={awake ? "#FF6B6B" : "#3A3A3A"}
        />
        <circle cx="24" cy="3" r="3" fill={awake ? "#FF0000" : "#454545"} />
        <rect
          x="1"
          y="19"
          width="6"
          height="12"
          rx="3"
          fill={awake ? "#C40000" : "#2C2C2C"}
        />
        <rect
          x="41"
          y="19"
          width="6"
          height="12"
          rx="3"
          fill={awake ? "#C40000" : "#2C2C2C"}
        />
        <rect
          x="7"
          y="10"
          width="34"
          height="30"
          rx="13"
          fill={awake ? "#FF0000" : "#2E2E2E"}
        />
        <path
          d="M12 22a12 12 0 0 1 12-11"
          stroke="#ffffff"
          strokeOpacity={awake ? 0.55 : 0.15}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        <rect x="12" y="17" width="24" height="14" rx="7" fill="#0A0A0A" />
        <motion.g
          animate={awake ? { scaleY: [1, 1, 0.1, 1] } : { scaleY: 1 }}
          transition={{
            duration: 4,
            times: [0, 0.88, 0.93, 1],
            repeat: awake ? Infinity : 0,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "24px 24px" }}
        >
          <rect
            x="16.5"
            y="21.5"
            width="5"
            height="5"
            rx="2.5"
            fill={awake ? "#FFFFFF" : "#4A4A4A"}
          />
          <rect
            x="26.5"
            y="21.5"
            width="5"
            height="5"
            rx="2.5"
            fill={awake ? "#FFFFFF" : "#4A4A4A"}
          />
        </motion.g>
        <rect
          x="16"
          y="41"
          width="16"
          height="4"
          rx="2"
          fill={awake ? "#C40000" : "#242424"}
        />
      </svg>
    </motion.div>
  );
}
