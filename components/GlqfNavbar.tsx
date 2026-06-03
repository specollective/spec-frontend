import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/glqf#overview", label: "Overview" },
  { href: "/glqf#constructs", label: "Constructs" },
  { href: "/glqf#domains", label: "Domains" },
  { href: "/glqf#international", label: "Research" },
];

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/glqf"
      className={`group inline-flex items-baseline gap-3 ${className}`}
      aria-label="GLQF — Global Learning Qualifications Framework, home"
    >
      <span className="font-dmserif text-2xl leading-none tracking-tight text-glqf-ink md:text-3xl">
        GLQF
      </span>
    </Link>
  );
}

export default function GlqfNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-glqf-line bg-glqf-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <Wordmark />

        {/* Desktop nav */}
        <nav
          aria-label="GLQF navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-montserrat text-sm font-medium text-glqf-ink-soft transition-colors hover:text-glqf-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="glqf-mobile-nav"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded text-glqf-ink"
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
          id="glqf-mobile-nav"
          aria-label="GLQF mobile navigation"
          className="border-t border-glqf-line bg-glqf-paper md:hidden"
        >
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-4 py-3 font-montserrat text-base font-medium text-glqf-ink hover:bg-glqf-paper-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
