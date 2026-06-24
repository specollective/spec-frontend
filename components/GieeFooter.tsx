import Link from "next/link";

export default function GieeFooter() {
  return (
    <footer className="border-t border-giee-line bg-giee-paper">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-giee-serif text-2xl leading-none text-giee-ink">
              GIEE
            </p>
            <p className="mt-3 font-giee-sans text-sm leading-relaxed text-giee-slate">
              The Global Inclusive Education Ecosystem — designing the global
              benchmarks, policies, and guardrails that keep AI an instrument
              for collective empowerment and educational trust.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href="https://specollective.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-giee-sans text-sm tracking-[0.12em] text-giee-slate [font-variant:small-caps] hover:text-giee-ink"
            >
              An initiative of SPEC ↗
            </a>
            <Link
              href="/contact"
              className="font-giee-sans text-sm text-giee-ink-soft hover:text-giee-ink"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-giee-line pt-6">
          <p className="font-giee-sans text-xs text-giee-slate">
            © {new Date().getFullYear()} Sustainable Progress &amp; Equality
            Collective. In collaboration with GOER and the UN-Geneva Forum.
          </p>
        </div>
      </div>
    </footer>
  );
}
