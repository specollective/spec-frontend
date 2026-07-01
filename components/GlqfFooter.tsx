import Link from "next/link";
import { useTranslation } from "next-i18next/pages";

export default function GlqfFooter() {
  const { t } = useTranslation("glqf");
  const { t: tCommon } = useTranslation("common");
  return (
    <footer className="border-t border-glqf-line bg-glqf-paper">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-dmserif text-2xl leading-none text-glqf-ink">
              GLQF
            </p>
            <p className="mt-3 font-montserrat text-sm leading-relaxed text-glqf-slate">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href="https://specollective.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-montserrat text-xs uppercase tracking-[0.22em] text-glqf-ink-soft hover:text-glqf-ink"
            >
              {t("footer.initiative")}
            </a>
            <Link
              href="/contact"
              className="font-montserrat text-sm text-glqf-ink-soft hover:text-glqf-ink"
            >
              {tCommon("nav.contact")}
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-glqf-line pt-6">
          <p className="font-montserrat text-xs text-glqf-slate">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
