import Link from "next/link";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import GieeLayout from "../../../components/GieeLayout";
import nextI18NextConfig from "../../../next-i18next.config";
import { getNewsArticles, type NewsArticleSummary } from "../../../utils/gieeNews";

interface Props {
  articles: NewsArticleSummary[];
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    articles: getNewsArticles(locale),
    ...(await serverSideTranslations(
      locale ?? nextI18NextConfig.i18n.defaultLocale,
      ["common", "giee"],
      nextI18NextConfig,
    )),
  },
});

function formatDate(date: string, locale?: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function GieeNewsPage({ articles }: Props) {
  const { t, i18n } = useTranslation("giee");

  return (
    <GieeLayout title={t("news.heading")} description={t("news.intro")}>
      <section className="bg-giee-paper px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/giee"
            className="font-giee-sans text-sm text-giee-slate transition-colors hover:text-giee-ink"
          >
            {t("news.back")}
          </Link>
          <p className="mt-10 font-giee-sans text-xs font-semibold uppercase tracking-[0.22em] text-giee-accent md:text-sm">
            {t("news.eyebrow")}
          </p>
          <h1 className="mt-4 font-giee-serif text-4xl leading-[1.05] text-giee-ink md:text-6xl lg:text-7xl">
            {t("news.heading")}
          </h1>
          <p className="mt-8 max-w-2xl font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            {t("news.intro")}
          </p>
        </div>
      </section>

      <section className="bg-giee-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          {articles.length > 0 ? (
            <ul className="grid list-none gap-6 p-0 md:grid-cols-2">
              {articles.map((article) => (
                <li key={article.slug}>
                  <article className="flex h-full flex-col border border-giee-line bg-giee-paper p-8 transition-all hover:-translate-y-1 hover:border-giee-ink hover:shadow-md md:p-10">
                    <p className="font-giee-sans text-xs font-semibold uppercase tracking-[0.18em] text-giee-accent">
                      {formatDate(article.date, i18n.language)}
                    </p>
                    <h2 className="mt-5 font-giee-serif text-2xl leading-snug text-giee-ink md:text-3xl">
                      {article.title}
                    </h2>
                    <p className="mt-4 flex-1 font-giee-sans text-base leading-relaxed text-giee-ink-soft md:text-lg">
                      {article.excerpt}
                    </p>
                    <Link
                      href={`/giee/news/${article.slug}`}
                      className="mt-8 inline-flex items-center font-giee-sans text-sm font-semibold uppercase tracking-[0.18em] text-giee-green hover:text-giee-ink"
                    >
                      {t("news.readArticle")} <span aria-hidden="true" className="ml-2">→</span>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-giee-sans text-lg text-giee-ink-soft">{t("news.empty")}</p>
          )}
        </div>
      </section>
    </GieeLayout>
  );
}
