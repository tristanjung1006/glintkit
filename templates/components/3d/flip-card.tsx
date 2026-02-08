"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "__UTILS_ALIAS__/cn";
import { CardContainer, CardBody, CardItem } from "__COMPONENTS_ALIAS__/3d-card";

interface FlipCardProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image?: string;
  badges?: Array<{ label: string; color?: string }>;
  quote?: string;
  children?: React.ReactNode;
  className?: string;
}

export function FlipCard({ isOpen, onClose, title, subtitle, image, badges, quote, children, className }: FlipCardProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsExiting(false);
      setIsFlipped(false);
      document.body.style.overflow = "hidden";
      const flipTimer = setTimeout(() => setIsFlipped(true), 50);
      return () => clearTimeout(flipTimer);
    } else if (!isOpen && isVisible) {
      setIsExiting(true);
      setIsFlipped(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsExiting(false);
        document.body.style.overflow = "";
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/80 backdrop-blur-sm",
        "transition-opacity duration-300",
        isExiting ? "opacity-0" : "opacity-100"
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      style={{ perspective: "1200px" }}
    >
      <div
        className="transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped
            ? "rotateY(0deg)"
            : isExiting
            ? "rotateY(-90deg)"
            : "rotateY(180deg)",
          touchAction: "none",
        }}
      >
        <CardContainer
          containerClassName={cn("!py-0", "transition-opacity duration-300", isExiting ? "opacity-0" : "opacity-100")}
        >
          <CardBody className={cn(
            "relative group/card w-[320px] sm:w-[380px] h-auto rounded-2xl p-6 sm:p-8 border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl",
            className
          )}>
            <CardItem translateZ={40} className="absolute top-3 right-3 z-10">
              <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Close">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </CardItem>

            {image && (
              <CardItem translateZ={100} className="w-full flex justify-center mb-4">
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cover bg-center border-2 border-white/20 shadow-lg"
                  style={{ backgroundImage: `url(${image})` }}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </CardItem>
            )}

            <CardItem translateZ={60} className="w-full text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
            </CardItem>

            {badges && badges.length > 0 && (
              <CardItem translateZ={50} className="w-full flex flex-wrap justify-center gap-2 mb-3">
                {badges.map((badge, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      backgroundColor: `${badge.color || '#00E5A0'}20`,
                      color: badge.color || '#00E5A0',
                      borderColor: `${badge.color || '#00E5A0'}30`,
                    }}>
                    {badge.label}
                  </span>
                ))}
              </CardItem>
            )}

            {subtitle && (
              <CardItem translateZ={40} className="w-full flex justify-center items-center gap-3 mb-6">
                <p className="text-sm font-medium text-white/90 text-center">{subtitle}</p>
              </CardItem>
            )}

            <CardItem translateZ={20} className="w-full mb-6">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </CardItem>

            {quote && (
              <CardItem translateZ={80} className="w-full">
                <div className="relative">
                  <svg className="absolute -top-2 -left-1 w-8 h-8 text-[#00E5A0]/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed pl-6 italic">{quote}</p>
                </div>
              </CardItem>
            )}

            {children}
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}
