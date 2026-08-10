import React from "react";

export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src="/circle_logo.png"
      alt="Circle HQ Emblem"
      className={`object-contain ${className}`}
    />
  );
}

interface LogoProps {
  theme?: "light" | "dark" | "auto";
  isLightPage?: boolean;
  showTagline?: boolean;
  className?: string;
}

export function Logo({
  theme = "auto",
  isLightPage = false,
  showTagline = false,
  className = "",
}: LogoProps) {
  const isDarkText = theme === "light" || (theme === "auto" && isLightPage);

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoIcon className="h-8 w-8 flex-shrink-0" />
      <div className="flex flex-col">
        <span className="font-display text-xl font-bold tracking-tight leading-none">
          <span className="text-[#FF0000]">Circle</span>
          <span className={isDarkText ? "text-black" : "text-white"}>hq</span>
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-tight font-sans font-normal text-hq-mute mt-1">
            Well rounded results
          </span>
        )}
      </div>
    </div>
  );
}
