"use client";

import { useState, useRef, useEffect } from "react";
import { GlassSurface } from "__COMPONENTS_ALIAS__/glass-surface";

interface MusicPlayerProps {
  src: string;
  initialVolume?: number;
}

export function MusicPlayer({ src, initialVolume = 0.5 }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = initialVolume;
    }
  }, [initialVolume]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const buttonContent = (
    <>
      <div className="flex items-center gap-[3px] h-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-[3px] bg-gradient-to-t from-[#00D4FF] to-[#00FF88] rounded-full transition-all ${
              isPlaying ? "animate-soundwave" : "h-1"
            }`}
            style={{ animationDelay: isPlaying ? `${i * 0.1}s` : undefined }}
          />
        ))}
      </div>
      <span className="text-sm text-white/60 hidden sm:inline">
        {isPlaying ? "ON" : "OFF"}
      </span>
    </>
  );

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      {!isDesktop && (
        <button
          onClick={togglePlay}
          className={`h-14 sm:h-16 w-14 sm:w-auto sm:px-4 flex items-center justify-center sm:justify-start gap-2 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.12] transition-all shadow-lg shadow-black/10 ${
            !isPlaying ? "animate-attention-ring" : ""
          }`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {buttonContent}
        </button>
      )}
      {isDesktop && (
        <GlassSurface
          borderRadius={9999}
          backgroundOpacity={0.1}
          brightness={50}
          blur={11}
          displace={0.5}
          distortionScale={-180}
          redOffset={0}
          greenOffset={10}
          blueOffset={20}
          className={`cursor-pointer hover:scale-105 transition-transform ${
            !isPlaying ? "animate-attention-ring" : ""
          }`}
        >
          <button
            onClick={togglePlay}
            className="h-14 sm:h-16 w-14 sm:w-auto sm:px-4 flex items-center justify-center sm:justify-start gap-2"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {buttonContent}
          </button>
        </GlassSurface>
      )}
    </>
  );
}
