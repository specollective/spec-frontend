import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import GieeLayout from "../../../components/GieeLayout";
import nextI18NextConfig from "../../../next-i18next.config";
import {
  getNewsArticle,
  getNewsSlugs,
  type NewsArticle,
} from "../../../utils/gieeNews";

interface Props {
  article: NewsArticle;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  paths: (locales ?? ["en"]).flatMap((locale) =>
    getNewsSlugs().map((slug) => ({ params: { slug }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
  locale,
}) => {
  const article = await getNewsArticle(params!.slug, locale);
  if (!article) return { notFound: true };

  return {
    props: {
      article,
      ...(await serverSideTranslations(
        locale ?? nextI18NextConfig.i18n.defaultLocale,
        ["common", "giee"],
        nextI18NextConfig,
      )),
    },
  };
};

function formatDate(date: string, locale?: string) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function GieeNewsArticlePage({ article }: Props) {
  const { t, i18n } = useTranslation("giee");

  return (
    <GieeLayout title={article.title} description={article.excerpt}>
      <section className="bg-giee-paper px-6 pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/giee/news"
            className="font-giee-sans text-sm text-giee-slate transition-colors hover:text-giee-ink"
          >
            {t("news.backToNews")}
          </Link>
          <p className="mt-10 font-giee-sans text-xs font-semibold uppercase tracking-[0.18em] text-giee-accent md:text-sm">
            {formatDate(article.date, i18n.language)}
            {article.author ? ` · ${t("news.by")} ${article.author}` : ""}
          </p>
          <h1 className="mt-5 font-giee-serif text-4xl leading-[1.08] text-giee-ink md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-8 font-giee-sans text-lg leading-relaxed text-giee-ink-soft md:text-xl">
            {article.excerpt}
          </p>
        </div>
      </section>

      <section className="bg-giee-white px-6 py-20 md:py-28">
        <article
          className="mx-auto max-w-3xl font-giee-sans text-giee-ink-soft
            [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-giee-serif [&_h2]:text-2xl [&_h2]:leading-snug [&_h2]:text-giee-ink md:[&_h2]:text-3xl
            [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:font-giee-serif [&_h3]:text-xl [&_h3]:leading-snug [&_h3]:text-giee-ink md:[&_h3]:text-2xl
            [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed md:[&_p]:text-lg
            [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
            [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
            [&_li]:text-base [&_li]:leading-relaxed md:[&_li]:text-lg
            [&_strong]:font-semibold [&_strong]:text-giee-ink [&_em]:italic
            [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-giee-accent [&_blockquote]:pl-6 [&_blockquote]:font-giee-serif [&_blockquote]:text-2xl [&_blockquote]:text-giee-ink
            [&_a]:text-giee-ink [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-giee-accent"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </section>
    </GieeLayout>
  );
}
