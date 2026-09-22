import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface NewsArticleSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
}

export interface NewsArticle extends NewsArticleSummary {
  html: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "giee", "news");

function readArticleFile(slug: string, locale?: string) {
  const localizedPath = locale && locale !== "en"
    ? path.join(CONTENT_DIR, locale, `${slug}.md`)
    : path.join(CONTENT_DIR, `${slug}.md`);
  const fallbackPath = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(localizedPath) ? localizedPath : fallbackPath;

  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  if (
    typeof data.title !== "string" ||
    typeof data.date !== "string" ||
    typeof data.excerpt !== "string"
  ) {
    throw new Error(`News article ${slug} is missing required frontmatter`);
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    author: typeof data.author === "string" ? data.author : undefined,
    content,
  };
}

export function getNewsSlugs() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getNewsArticles(locale?: string): NewsArticleSummary[] {
  return getNewsSlugs()
    .map((slug) => readArticleFile(slug, locale))
    .filter((article): article is NonNullable<typeof article> => article !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ content: _content, ...summary }) => summary);
}

export async function getNewsArticle(
  slug: string,
  locale?: string,
): Promise<NewsArticle | null> {
  const article = readArticleFile(slug, locale);
  if (!article) return null;

  return {
    ...article,
    html: await marked.parse(article.content),
  };
}
