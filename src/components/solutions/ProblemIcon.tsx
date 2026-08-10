import React from "react";
import {
  ClipboardTypeIcon,
  DatabaseZapIcon,
  MessageSquareDashedIcon,
  RouteIcon,
  TrendingUpIcon,
} from "lucide-react";
import type { Problem } from "../../data/problems";

const icons = {
  manual: ClipboardTypeIcon,
  data: DatabaseZapIcon,
  inbox: MessageSquareDashedIcon,
  onboarding: RouteIcon,
  revenue: TrendingUpIcon,
};

type ProblemIconProps = {
  name: Problem["icon"];
  active: boolean;
};

export function ProblemIcon({ name, active }: ProblemIconProps) {
  const Icon = icons[name];
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
        active
          ? "border-brand bg-brand text-white"
          : "border-white/10 bg-white/[0.04] text-zinc-400"
      }`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
    </span>
  );
}
