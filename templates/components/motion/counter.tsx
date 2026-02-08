"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollAnimation } from "__HOOKS_ALIAS__/use-scroll-animation";
import { cn } from "__UTILS_ALIAS__/cn";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const CYBER_CHARS = "ア イ ウ エ オ カ キ ク ケ コ 0 1 2 3 4 5 6 7 8 9 A B C D E F # $ % & @".split(" ");

export function Counter({ end, suffix = "", duration = 2500, className }: CounterProps) {
  const [displayText, setDisplayText] = useState("");
  const [ref, isInView] = useScrollAnimation<HTMLSpanElement>({ threshold: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;

      const targetText = end.toString();
      const totalLength = targetText.length;

      const lockedChars: boolean[] = new Array(totalLength).fill(false);
      const currentChars: string[] = new Array(totalLength).fill("");

      for (let i = 0; i < totalLength; i++) {
        currentChars[i] = CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
      }
      setDisplayText(currentChars.join(""));

      const intervals: ReturnType<typeof setInterval>[] = [];
      const timeouts: ReturnType<typeof setTimeout>[] = [];

      const scrambleInterval = setInterval(() => {
        for (let i = 0; i < totalLength; i++) {
          if (!lockedChars[i]) {
            currentChars[i] = CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          }
        }
        setDisplayText(currentChars.join(""));
      }, 50);
      intervals.push(scrambleInterval);

      const lockDelay = duration / (totalLength + 1);

      for (let i = 0; i < totalLength; i++) {
        const lockTimeout = setTimeout(() => {
          let findCount = 0;
          const findInterval = setInterval(() => {
            currentChars[i] = CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
            setDisplayText(currentChars.join(""));
            findCount++;
            if (findCount >= 5) {
              clearInterval(findInterval);
              lockedChars[i] = true;
              currentChars[i] = targetText[i];
              setDisplayText(currentChars.join(""));
            }
          }, 60);
          intervals.push(findInterval);
        }, lockDelay * (i + 1));
        timeouts.push(lockTimeout);
      }

      const finalTimeout = setTimeout(() => {
        clearInterval(scrambleInterval);
        setDisplayText(targetText);
      }, duration + 100);
      timeouts.push(finalTimeout);

      return () => {
        intervals.forEach(clearInterval);
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {displayText}{suffix}
    </span>
  );
}
