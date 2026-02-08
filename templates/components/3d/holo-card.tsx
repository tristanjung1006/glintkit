"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { cn } from "__UTILS_ALIAS__/cn";

export interface HoloCardItem {
  title: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  categoryColor?: string;
  tags?: string[];
  badge?: string;
}

interface HoloCardProps {
  item: HoloCardItem | null;
  isOpen: boolean;
  onClose: () => void;
  backLogo?: string;
  backSubtitle?: string;
  footer?: string;
  className?: string;
}

export function HoloCard({
  item,
  isOpen,
  onClose,
  backLogo = "SPARK",
  backSubtitle = "UI COMPONENT",
  footer,
}: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingUpdateRef = useRef<{
    mx: number; my: number; rx: number; ry: number; hyp: number;
  } | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen && item) {
      setIsVisible(true);
      setIsExiting(false);
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
      const animTimer = setTimeout(() => setIsAnimating(false), 700);
      return () => clearTimeout(animTimer);
    } else if (!isOpen && isVisible) {
      setIsExiting(true);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
        document.body.style.overflow = "";
      }, 600);
      return () => clearTimeout(timer);
    }
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isOpen, item, isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const applyStyleUpdates = useCallback(() => {
    const card = cardRef.current;
    const update = pendingUpdateRef.current;
    if (!card || !update) return;
    card.style.setProperty("--mx", `${update.mx}%`);
    card.style.setProperty("--my", `${update.my}%`);
    card.style.setProperty("--posx", `${update.mx}%`);
    card.style.setProperty("--posy", `${update.my}%`);
    card.style.setProperty("--rx", `${update.ry}deg`);
    card.style.setProperty("--ry", `${update.rx}deg`);
    card.style.setProperty("--hyp", `${update.hyp}`);
    card.style.setProperty("--o", "1");
    pendingUpdateRef.current = null;
    rafRef.current = null;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mx = (x / rect.width) * 100;
    const my = (y / rect.height) * 100;
    const px = mx - 50;
    const py = my - 50;
    const hyp = Math.sqrt(px * px + py * py) / 50;
    const rx = (py / 50) * -15;
    const ry = (px / 50) * 15;
    pendingUpdateRef.current = { mx, my, rx, ry, hyp };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(applyStyleUpdates);
    }
  }, [applyStyleUpdates]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--hyp", "0.5");
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || !e.touches[0]) return;
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const mx = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const my = Math.max(0, Math.min(100, (y / rect.height) * 100));
    const px = mx - 50;
    const py = my - 50;
    const hyp = Math.sqrt(px * px + py * py) / 50;
    const rx = (py / 50) * -10;
    const ry = (px / 50) * 10;
    pendingUpdateRef.current = { mx, my, rx, ry, hyp };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(applyStyleUpdates);
    }
  }, [applyStyleUpdates]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!isVisible || !item) return null;

  const glowColor = item.categoryColor || "#69d1e9";

  return (
    <div
      className={cn(
        "holo-card-overlay",
        isExiting ? "holo-card-overlay--exiting" : "holo-card-overlay--entering"
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="holo-card-title"
    >
      <div className="holo-card-container">
        <div
          ref={cardRef}
          className={cn(
            "holo-card",
            isExiting && "holo-card--exiting",
            isAnimating && !isExiting && "holo-card--entering"
          )}
          style={{ "--glow": glowColor } as React.CSSProperties}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
        >
          <div className="holo-card__back">
            <div className="holo-card__back-content">
              <div className="holo-card__back-logo">{backLogo}</div>
              <div className="holo-card__back-subtitle">{backSubtitle}</div>
            </div>
          </div>
          <div className="holo-card__front">
            <div className="holo-card__shine" />
            <div className="holo-card__glare" />
            <div className="holo-card__inner-frame" />
            <div className="holo-card__content">
              {item.thumbnail && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={item.thumbnail} alt="" className="w-64 h-64 object-contain blur-[60px] opacity-40 saturate-150" aria-hidden="true" />
                  </div>
                </div>
              )}
              <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between flex-shrink-0">
                  {item.category && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs sm:text-sm font-bold uppercase tracking-wide border"
                      style={{ color: glowColor, borderColor: `${glowColor}30`, backgroundColor: `${glowColor}20` }}>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: glowColor }} />
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: glowColor }} />
                      </span>
                      {item.category}
                    </span>
                  )}
                  {item.badge && (
                    <span className="text-xs sm:text-sm font-mono text-white/70">{item.badge}</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center items-center py-4">
                  {item.thumbnail && (
                    <div className="relative flex-shrink-0 mb-3 flex justify-center">
                      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                    </div>
                  )}
                  <div className="text-center mb-2">
                    <h3 id="holo-card-title" className="text-lg sm:text-xl font-bold text-white leading-tight">{item.title}</h3>
                  </div>
                  {item.description && (
                    <div className="mb-2">
                      <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed text-center">{item.description}</p>
                    </div>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {item.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/10 rounded text-[10px] sm:text-xs text-white/70 border border-white/20">{tag}</span>
                      ))}
                      {item.tags.length > 4 && (
                        <span className="px-2 py-0.5 text-[10px] sm:text-xs text-white/50">+{item.tags.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>
                {footer && (
                  <div className="pt-2 border-t border-white/20 text-center flex-shrink-0">
                    <p className="text-[10px] sm:text-xs text-white/50 tracking-wider">{footer}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
