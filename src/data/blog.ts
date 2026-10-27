// Blog entries come from two sources and are rendered as one card grid.
//
// - `markdown`: native posts, one `.md` file each under `src/content/blog/`,
//   with a small front matter block (title, date, tags, excerpt, readTime).
// - `linkedin`: a link to a LinkedIn post. LinkedIn serves post content only to
//   signed-in users and blocks cross-origin fetches, so the preview data is
//   cached by hand in `src/content/linkedin-posts.json`, never fetched at runtime.

import linkedInPostsJson from "../content/linkedin-posts.json";

export type MarkdownPost = {
  kind: "markdown";
  slug: string;
  fileName: string;
  title: string;
  date: string; // ISO date, YYYY-MM-DD
  tags: string[];
  excerpt: string;
  readTime?: string;
  body: string;
};

export type LinkedInPost = {
  kind: "linkedin";
  /** Short or full link to the post; this is what the card opens. */
  url: string;
  /** Resolved linkedin.com/posts/... URL, shown truncated in the card strip. */
  postUrl: string;
  author: string;
  /** Kept in the cache for reference; not shown on the card. */
  headline?: string;
  date: string; // ISO date, YYYY-MM-DD
  /** Opening of the post, shown on the card. */
  excerpt: string;
  /** Full post text when available; falls back to `excerpt`. */
  text?: string;
  image?: string;
};

export type BlogEntry = MarkdownPost | LinkedInPost;

// Cached LinkedIn post previews. Nothing is fetched from LinkedIn at runtime:
// add or edit entries in src/content/linkedin-posts.json and rebuild.
export const linkedInPosts: LinkedInPost[] = (
  linkedInPostsJson as Omit<LinkedInPost, "kind">[]
).map((post) => ({ kind: "linkedin", ...post }));

// Every markdown file under src/content/blog becomes a post. The file name is the slug.
const markdownFiles = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return { meta, body: match[2] };
}

function estimateReadTime(body: string): string {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export const markdownPosts: MarkdownPost[] = Object.entries(markdownFiles).map(([path, raw]) => {
  const fileName = path.split("/").pop() ?? path;
  const slug = fileName.replace(/\.md$/, "");
  const { meta, body } = parseFrontMatter(raw);

  return {
    kind: "markdown",
    slug,
    fileName,
    title: meta.title ?? slug,
    date: meta.date ?? "",
    tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    excerpt: meta.excerpt ?? body.trim().split(/\n\s*\n/)[0]?.slice(0, 200) ?? "",
    readTime: meta.readTime ?? estimateReadTime(body),
    body,
  };
});

export const blogEntries: BlogEntry[] = [...markdownPosts, ...linkedInPosts].sort((a, b) =>
  b.date.localeCompare(a.date),
);
