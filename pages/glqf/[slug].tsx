import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation, Trans } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import Link from "next/link";
import GlqfLayout from "../../components/GlqfLayout";
import nextI18NextConfig from "../../next-i18next.config";

type Kind = "Construct" | "Domain";

interface Item {
  slug: string;
  name: string;
  kind: Kind;
}

const ITEMS: Item[] = [
  { slug: "integration", name: "Integration", kind: "Construct" },
  { slug: "knowledge", name: "Knowledge", kind: "Construct" },
  { slug: "engagement", name: "Engagement", kind: "Construct" },
  {
    slug: "specialized-knowledge",
    name: "Specialized Knowledge",
    kind: "Domain",
  },
  { slug: "applied-knowledge", name: "Applied Knowledge", kind: "Domain" },
  {
    slug: "integrated-knowledge",
    name: "Integrated Knowledge",
    kind: "Domain",
  },
  { slug: "communication", name: "Communication", kind: "Domain" },
  {
    slug: "information-literacy",
    name: "Information Literacy",
    kind: "Domain",
  },
  {
    slug: "ethical-responsibility",
    name: "Ethical Responsibility",
    kind: "Domain",
  },
  {
    slug: "sociocultural-and-civic-engagement",
    name: "Sociocultural and Civic Engagement",
    kind: "Domain",
  },
  { slug: "learning-engagement", name: "Learning Engagement", kind: "Domain" },
];

const CONTENT_DIR = path.join(process.cwd(), "content", "glqf");

interface Props {
  slug: string;
  name: string;
  kind: Kind;
  html: string | null;
  siblings: { slug: string; name: string }[];
}

export default function GlqfItemPage({
  slug,
  kind,
  html,
  siblings,
}: Props) {
  const { t } = useTranslation("glqf");
  const displayName = t(`items.${slug}`);

  return (
    <GlqfLayout title={`${displayName} — ${t("diagram.title")}`}>
      {/* HERO */}
      <section className="bg-glqf-paper">
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-16 md:pt-24">
          <nav
            aria-label={t("slug.breadcrumbLabel")}
            className="font-montserrat text-sm text-glqf-slate"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/glqf"
                  className="hover:text-glqf-ink hover:underline underline-offset-4"
                >
                  GLQF
                </Link>
              </li>
              <li aria-hidden="true" className="text-glqf-line">
                /
              </li>
              <li>
                <Link
                  href={`/glqf#${kind === "Construct" ? "constructs" : "domains"}`}
                  className="hover:text-glqf-ink hover:underline underline-offset-4"
                >
                  {kind === "Construct"
                    ? t("slug.constructsCrumb")
                    : t("slug.domainsCrumb")}
                </Link>
              </li>
              <li aria-hidden="true" className="text-glqf-line">
                /
              </li>
              <li aria-current="page" className="font-semibold text-glqf-ink">
                {displayName}
              </li>
            </ol>
          </nav>

          <p className="mt-10 font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-glqf-accent md:text-sm">
            {kind === "Construct"
              ? t("slug.constructEyebrow")
              : t("slug.domainEyebrow")}
          </p>
          <h1 className="mt-4 font-dmserif text-4xl leading-[1.05] text-glqf-ink md:text-6xl lg:text-7xl">
            {displayName}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-glqf-white px-6 py-20 md:py-28">
        <article className="mx-auto max-w-3xl">
          {html ? (
            <div
              className="font-montserrat text-glqf-ink-soft
                [&_h2]:font-dmserif [&_h2]:leading-snug [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-glqf-ink
                [&_h3]:font-dmserif [&_h3]:leading-snug [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-glqf-ink
                [&_p]:leading-relaxed [&_p]:text-base md:[&_p]:text-lg [&_p]:mb-5
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-5 [&_ul]:space-y-2
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-5 [&_ol]:space-y-2
                [&_li]:leading-relaxed [&_li]:text-base md:[&_li]:text-lg
                [&_strong]:font-semibold [&_strong]:text-glqf-ink [&_em]:italic
                [&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-glqf-accent [&_blockquote]:pl-6 [&_blockquote]:font-dmserif [&_blockquote]:text-2xl [&_blockquote]:text-glqf-ink
                [&_a]:underline [&_a]:underline-offset-4 [&_a]:text-glqf-ink hover:[&_a]:text-glqf-accent"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className="font-montserrat text-lg leading-relaxed text-glqf-ink-soft md:text-xl">
              <Trans
                i18nKey="slug.underConstruction"
                t={t}
                values={{ name: displayName }}
                components={{
                  highlight: (
                    <span className="font-semibold text-glqf-ink" />
                  ),
                }}
              />
            </p>
          )}
        </article>
      </section>

      {/* SIBLINGS */}
      {siblings.length > 0 && (
        <section className="bg-glqf-paper px-6 py-20 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-glqf-accent md:text-sm">
              {kind === "Construct"
                ? t("slug.otherConstructs")
                : t("slug.otherDomains")}
            </p>
            <h2 className="mt-3 font-dmserif text-2xl leading-snug text-glqf-ink md:text-3xl">
              {t("slug.continueExploring")}
            </h2>

            <ul
              className={`mt-10 grid list-none gap-4 p-0 ${
                kind === "Construct"
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/glqf/${s.slug}`}
                    className="group flex items-center justify-between gap-4 border border-glqf-line bg-glqf-white p-6 transition-all hover:-translate-y-1 hover:border-glqf-ink hover:shadow-md"
                  >
                    <span className="font-dmserif text-lg leading-snug text-glqf-ink md:text-xl">
                      {t(`items.${s.slug}`)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-montserrat text-xl text-glqf-ink transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/glqf"
              className="mt-12 inline-flex items-center gap-2 font-montserrat text-sm font-semibold uppercase tracking-[0.22em] text-glqf-ink transition-colors hover:text-glqf-accent"
            >
              <span aria-hidden="true">←</span> {t("slug.backToFramework")}
            </Link>
          </div>
        </section>
      )}
    </GlqfLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => ({
  // Emit each slug for every configured locale so /<locale>/glqf/<slug> pages
  // are generated (without an explicit locale, only the default locale's paths
  // are produced and the others 404 under fallback: false).
  paths: (locales ?? ["en"]).flatMap((locale) =>
    ITEMS.map((item) => ({ params: { slug: item.slug }, locale })),
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
  params,
  locale,
}) => {
  const slug = params!.slug;
  const fallback = ITEMS.find((i) => i.slug === slug)!;

  const localizedPath =
    locale && locale !== "en"
      ? path.join(CONTENT_DIR, locale, `${slug}.md`)
      : path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(localizedPath)
    ? localizedPath
    : path.join(CONTENT_DIR, `${slug}.md`);

  let name = fallback.name;
  let kind: Kind = fallback.kind;
  let html: string | null = null;

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    html = await marked.parse(content);
    if (typeof data.name === "string") name = data.name;
    if (data.kind === "Construct" || data.kind === "Domain") {
      kind = data.kind as Kind;
    }
  }

  const siblings = ITEMS.filter(
    (i) => i.kind === kind && i.slug !== slug,
  ).map(({ slug, name }) => ({ slug, name }));

  return {
    props: {
      slug,
      name,
      kind,
      html,
      siblings,
      ...(await serverSideTranslations(
        locale ?? nextI18NextConfig.i18n.defaultLocale,
        ["common", "glqf"],
        nextI18NextConfig,
      )),
    },
  };
};
