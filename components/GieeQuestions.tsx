import { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next/pages";

export interface HeroQuestion {
  question: string;
  source: string;
  region: string;
}

// Marker colour per continent, as on the v3 hero.
const REGION_COLORS: Record<string, string> = {
  na: "#EC4C98",
  eu: "#E8352A",
  as: "#2E9E52",
};

const ROTATE_MS = 6000;

/**
 * The hero's rotating "questions our case studies are asking". It advances on
 * its own every 6 s, but pauses while hovered or focused, never auto-advances
 * for visitors who prefer reduced motion, and stops for good once someone uses
 * the button (WCAG 2.2.2). Only button presses are announced to screen readers.
 */
export default function GieeQuestions({
  questions,
  size,
}: {
  questions: HeroQuestion[];
  size: "desktop" | "phone";
}) {
  const { t } = useTranslation("giee");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (paused || manual || reduced.current || questions.length < 2) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % questions.length),
      ROTATE_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, paused, manual, questions.length]);

  if (!questions.length) return null;
  const desktop = size === "desktop";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={t("hero.questionsLabel")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`flex items-start ${desktop ? "gap-5" : "gap-[14px]"}`}
    >
      <button
        type="button"
        onClick={() => {
          setManual(true);
          setIndex((i) => (i + 1) % questions.length);
        }}
        aria-label={t("hero.next")}
        className="flex h-11 w-11 flex-none items-center justify-center rounded-[10px_10px_22px_10px] text-giee-navy shadow-[inset_0_0_0_1.5px_#111322] transition-colors hover:bg-giee-navy hover:text-giee-cream"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
          />
        </svg>
      </button>
      <div
        aria-live={manual ? "polite" : "off"}
        className={`relative min-w-0 flex-1 ${desktop ? "h-14" : "h-24"}`}
      >
        {questions.map((q, i) => {
          const on = i === index;
          return (
            <p
              key={i}
              aria-hidden={!on}
              className={`absolute inset-x-0 top-0 m-0 flex transition-[opacity,transform] duration-[450ms,800ms] ease-giee motion-reduce:transition-none ${
                desktop ? "gap-[14px]" : "gap-3"
              } ${on ? "translate-y-0 opacity-100 delay-300" : "translate-y-[10px] opacity-0"}`}
            >
              <span
                aria-hidden="true"
                className={`flex-none rounded-[2px_6px_6px_6px] ${
                  desktop ? "mt-[6px] h-3 w-3" : "mt-[5px] h-[11px] w-[11px]"
                }`}
                style={{ background: REGION_COLORS[q.region] ?? "#3F4152" }}
              />
              <span className="flex flex-col gap-1">
                <span
                  className={`font-semibold tracking-[-0.01em] text-giee-navy ${
                    desktop ? "text-[20px] leading-[1.25]" : "text-[18px] leading-[1.22]"
                  }`}
                >
                  {q.question}
                </span>
                <span
                  className={`font-medium text-giee-muted ${
                    desktop ? "text-[13px]" : "text-[12px] leading-[1.35]"
                  }`}
                >
                  {q.source}
                </span>
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
