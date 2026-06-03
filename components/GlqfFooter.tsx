import Link from "next/link";

export default function GlqfFooter() {
  return (
    <footer className="border-t border-glqf-line bg-glqf-paper">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-dmserif text-2xl leading-none text-glqf-ink">
              GLQF
            </p>
            <p className="mt-3 font-montserrat text-sm leading-relaxed text-glqf-slate">
              The Global Learning Qualifications Framework — an open standard
              for defining and assessing college-level learning.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href="https://specollective.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat text-xs uppercase tracking-[0.22em] text-glqf-ink-soft hover:text-glqf-ink"
            >
              An initiative of SPEC ↗
            </a>
            <Link
              href="/contact"
              className="font-montserrat text-sm text-glqf-ink-soft hover:text-glqf-ink"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-glqf-line pt-6">
          <p className="font-montserrat text-xs text-glqf-slate">
            © {new Date().getFullYear()} Sustainable Progress &amp; Equality
            Collective. The GLQF is freely available under an open license.
          </p>
        </div>
      </div>
    </footer>
  );
}
