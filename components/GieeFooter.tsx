import Link from "next/link";
import { useTranslation } from "next-i18next/pages";

export default function GieeFooter() {
  const { t } = useTranslation("giee");
  const { t: tCommon } = useTranslation("common");
  return (
    <footer className="border-t border-giee-line bg-giee-paper">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-giee-serif text-2xl leading-none text-giee-ink">
              GIEE
            </p>
            <p className="mt-3 font-giee-sans text-sm leading-relaxed text-giee-slate">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href="https://specollective.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-giee-sans text-sm tracking-[0.12em] text-giee-slate hover:text-giee-ink"
            >
              {t("footer.initiativeOf")}
            </a>
            <Link
              href="/contact"
              className="font-giee-sans text-sm text-giee-ink-soft hover:text-giee-ink"
            >
              {t("footer.contact")}
            </Link>
            <Link
              href="/privacy"
              className="font-giee-sans text-sm text-giee-ink-soft hover:text-giee-ink"
            >
              {tCommon("footer.privacy")}
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-giee-line pt-6">
          <p className="font-giee-sans text-xs text-giee-slate">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
