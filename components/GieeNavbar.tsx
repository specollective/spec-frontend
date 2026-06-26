import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/giee#overview", label: "Overview" },
  { href: "/giee#pillars", label: "Pillars" },
  { href: "/giee/research", label: "Research" },
  { href: "/giee/partner", label: "Partner" },
];

// Supported languages for the GIEE site. Selection is presentational only for
// now — wiring the chosen locale into actual content translation lands in a
// separate internationalization PR.
const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Desktop disclosure dropdown. Implemented as a button-triggered panel of
// buttons (rather than a half-finished listbox) so every option is natively
// focusable and operable by keyboard.
function LanguageMenu({
  value,
  onChange,
}: {
  value: LanguageCode;
  onChange: (code: LanguageCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === value) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="giee-language-menu"
        aria-label={`Change language, current language ${current.label}`}
        className="inline-flex items-center gap-1.5 rounded font-giee-sans text-sm font-medium text-giee-ink-soft transition-colors hover:text-giee-ink"
      >
        <GlobeIcon />
        <span>{current.short}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          id="giee-language-menu"
          className="absolute right-0 mt-2 min-w-[10rem] overflow-hidden rounded-md border border-giee-line bg-giee-paper py-1 shadow-lg"
        >
          {LANGUAGES.map((lang) => {
            const selected = lang.code === value;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onChange(lang.code);
                  setOpen(false);
                }}
                aria-current={selected ? "true" : undefined}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left font-giee-sans text-sm transition-colors hover:bg-giee-paper-2 ${
                  selected
                    ? "font-semibold text-giee-ink"
                    : "text-giee-ink-soft"
                }`}
              >
                <span>{lang.label}</span>
                {selected ? (
                  <CheckIcon />
                ) : (
                  <span className="text-xs uppercase tracking-wide text-giee-ink-soft">
                    {lang.short}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/giee"
      className={`group inline-flex items-baseline gap-3 ${className}`}
      aria-label="GIEE — Global AI Governance & Inclusive Education Ecosystem, home"
    >
      <span className="font-giee-serif text-2xl leading-none tracking-tight text-giee-ink md:text-3xl">
        GIEE
      </span>
    </Link>
  );
}

export default function GieeNavbar() {
  const [open, setOpen] = useState(false);
  // TODO(i18n): drive this from the active locale / route once translation
  // wiring lands. For now it is local UI state only.
  const [language, setLanguage] = useState<LanguageCode>("en");

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-giee-line bg-giee-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <Wordmark />

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label="GIEE navigation" className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-giee-sans text-sm font-medium text-giee-ink-soft transition-colors hover:text-giee-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <LanguageMenu value={language} onChange={setLanguage} />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="giee-mobile-nav"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded text-giee-ink"
        >
          <span className="sr-only">Menu</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          id="giee-mobile-nav"
          aria-label="GIEE mobile navigation"
          className="border-t border-giee-line bg-giee-paper md:hidden"
        >
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-4 py-3 font-giee-sans text-base font-medium text-giee-ink hover:bg-giee-paper-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Language options */}
          <div
            role="group"
            aria-label="Select language"
            className="flex items-center gap-2 border-t border-giee-line p-3"
          >
            <GlobeIcon />
            {LANGUAGES.map((lang) => {
              const selected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  aria-pressed={selected}
                  className={`rounded px-3 py-1.5 font-giee-sans text-sm font-medium transition-colors ${
                    selected
                      ? "bg-giee-ink text-giee-paper"
                      : "text-giee-ink-soft hover:bg-giee-paper-2"
                  }`}
                >
                  {lang.short}
                  <span className="sr-only"> — {lang.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
