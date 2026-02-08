"use client";

import { cn } from "__UTILS_ALIAS__/cn";
import { useCountdown } from "__HOOKS_ALIAS__/use-countdown";
import { useMemo } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  endDate?: Date;
  className?: string;
  labels?: {
    days?: string;
    hours?: string;
    mins?: string;
    secs?: string;
  };
  endedText?: [string, string];
  liveText?: string;
  todayText?: [string, string]; // [title, subtitle template with {time}]
}

type CountdownState = "normal" | "approaching" | "imminent" | "today-waiting" | "live" | "ended";

function getCountdownState(targetDate: Date, endDate?: Date): CountdownState {
  const now = new Date();
  const msUntilStart = targetDate.getTime() - now.getTime();
  const msUntilEnd = endDate ? endDate.getTime() - now.getTime() : msUntilStart;

  const oneDayMs = 24 * 60 * 60 * 1000;
  const sevenDaysMs = 7 * oneDayMs;

  if (msUntilEnd <= 0) return "ended";
  if (msUntilStart <= 0 && msUntilEnd > 0) return "live";

  const isSameDay =
    now.getFullYear() === targetDate.getFullYear() &&
    now.getMonth() === targetDate.getMonth() &&
    now.getDate() === targetDate.getDate();

  if (isSameDay && msUntilStart > 0) return "today-waiting";
  if (msUntilStart > 0 && msUntilStart <= oneDayMs) return "imminent";
  if (msUntilStart > 0 && msUntilStart <= sevenDaysMs) return "approaching";

  return "normal";
}

function TimeUnit({ value, label, state }: { value: number; label: string; state: CountdownState }) {
  const stateStyles = {
    normal: { text: "gradient-text glow-text-gradient", glass: "glass" },
    approaching: { text: "animate-ember", glass: "glass animate-ember-glow" },
    imminent: { text: "text-rose-400 drop-shadow-[0_0_25px_rgba(251,113,133,0.8)] animate-pulse", glass: "glass border-rose-500/40 shadow-[0_0_40px_rgba(251,113,133,0.3)] animate-shake" },
    "today-waiting": { text: "text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.7)]", glass: "glass border-emerald-500/30 shadow-[0_0_30px_rgba(52,211,153,0.2)]" },
    live: { text: "gradient-text", glass: "glass" },
    ended: { text: "gradient-text", glass: "glass" },
  };
  const styles = stateStyles[state];

  return (
    <div className="flex flex-col items-center">
      <div className={cn("px-3 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 min-w-[56px] sm:min-w-[72px] md:min-w-[90px] transition-all duration-300", styles.glass)}>
        <span className={cn("text-2xl sm:text-4xl md:text-5xl font-bold tabular-nums transition-all duration-300", styles.text)} suppressHydrationWarning>
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className={cn("text-[10px] sm:text-xs md:text-sm mt-1.5 sm:mt-2 uppercase tracking-wider transition-colors duration-300",
        state === "approaching" ? "text-orange-500/80" :
        state === "imminent" ? "text-rose-400/70" :
        state === "today-waiting" ? "text-emerald-400/70" :
        "text-gray-400"
      )}>
        {label}
      </span>
    </div>
  );
}

function Separator({ state }: { state: CountdownState }) {
  const colorClass =
    state === "approaching" ? "text-orange-500 animate-ember" :
    state === "imminent" ? "text-rose-400 animate-pulse" :
    state === "today-waiting" ? "text-emerald-400" :
    "gradient-text";

  return (
    <div className={cn("flex items-center text-xl sm:text-3xl md:text-4xl self-start mt-3 sm:mt-4 transition-colors duration-300", colorClass)}>:</div>
  );
}

function LiveIndicator({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      <span className="relative flex h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.9)]"></span>
      </span>
      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-400 tracking-wider animate-pulse drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]">
        {text}
      </span>
      <span className="relative flex h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.9)]"></span>
      </span>
    </div>
  );
}

export function CountdownTimer({
  targetDate,
  endDate,
  className,
  labels = {},
  endedText = ["Event", "Ended"],
  liveText = "LIVE NOW",
  todayText,
}: CountdownTimerProps) {
  const timeLeft = useCountdown(targetDate);
  const daysLabel = labels.days ?? "Days";
  const hoursLabel = labels.hours ?? "Hours";
  const minsLabel = labels.mins ?? "Mins";
  const secsLabel = labels.secs ?? "Secs";

  const state = useMemo(
    () => getCountdownState(targetDate, endDate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetDate, endDate, timeLeft.total]
  );

  if (state === "ended") {
    return (
      <div className={cn("text-center flex flex-col items-center gap-1 sm:gap-2", className)}>
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide"
          style={{ background: "linear-gradient(135deg, #FFD700, #FFA500, #FFE066)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 20px rgba(255,215,0,0.5))" }}>
          {endedText[0]}
        </span>
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide"
          style={{ background: "linear-gradient(135deg, #FFD700, #FFA500, #FFE066)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 20px rgba(255,215,0,0.5))" }}>
          {endedText[1]}
        </span>
      </div>
    );
  }

  if (state === "live") {
    return (
      <div className={cn("text-center", className)}>
        <LiveIndicator text={liveText} />
      </div>
    );
  }

  if (state === "today-waiting") {
    return (
      <div className={cn("flex gap-1.5 sm:gap-3 md:gap-4 flex-wrap", className)}>
        <TimeUnit value={timeLeft.hours} label={hoursLabel} state={state} />
        <Separator state={state} />
        <TimeUnit value={timeLeft.minutes} label={minsLabel} state={state} />
        <Separator state={state} />
        <TimeUnit value={timeLeft.seconds} label={secsLabel} state={state} />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex gap-1.5 sm:gap-3 md:gap-4 flex-wrap justify-center">
        <TimeUnit value={timeLeft.days} label={daysLabel} state={state} />
        <Separator state={state} />
        <TimeUnit value={timeLeft.hours} label={hoursLabel} state={state} />
        <Separator state={state} />
        <TimeUnit value={timeLeft.minutes} label={minsLabel} state={state} />
        <Separator state={state} />
        <TimeUnit value={timeLeft.seconds} label={secsLabel} state={state} />
      </div>
    </div>
  );
}
