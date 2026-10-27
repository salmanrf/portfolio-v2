import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineArrowRight, HiOutlineExternalLink } from "react-icons/hi";
import { blogEntries, BlogEntry, LinkedInPost, MarkdownPost } from "../data";

type Filter = "all" | "markdown" | "linkedin";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "markdown", label: "Posts" },
  { id: "linkedin", label: "LinkedIn" },
];

function BlogPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setIsMounted(true);
    document.title = "Blog";
    return () => setIsMounted(false);
  }, []);

  const entries = blogEntries.filter((entry) => filter === "all" || entry.kind === filter);

  return (
    <div
      id="blog-page-container"
      style={{
        top: isMounted ? 0 : undefined,
        opacity: isMounted ? 1 : 0,
      }}
    >
      <div className="blog-header">
        <div id="page-title">Blog</div>
        <nav className="blog-filters" aria-label="Filter by source">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`tab-nav-link ${filter === id ? "tab-nav-link-active" : ""}`}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {entries.length === 0 ? (
        <p className="blog-empty">Nothing here yet.</p>
      ) : (
        <div className="blog-grid">
          {entries.map((entry) => (
            <BlogCard key={entry.kind === "markdown" ? entry.slug : entry.url} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogCard({ entry }: { entry: BlogEntry }) {
  return entry.kind === "markdown" ? <MarkdownCard post={entry} /> : <LinkedInCard post={entry} />;
}

function MarkdownCard({ post }: { post: MarkdownPost }) {
  return (
    <article className="blog-card">
      <div className="blog-card-strip">
        <span className="blog-card-strip-text">salmanrf@blog:~ $ cat {post.fileName}</span>
        <span className="blog-card-tag">md</span>
      </div>
      <div className="blog-card-body">
        <span className="blog-card-meta">
          {post.date}
          {post.readTime ? ` · ${post.readTime}` : ""}
        </span>
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-footer">
          {post.tags.map((tag) => (
            <span key={tag} className="blog-chip">
              {tag}
            </span>
          ))}
          <Link to={`/blog/${post.slug}`} className="project-link blog-card-link">
            <span>Read</span>
            <HiOutlineArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

function LinkedInCard({ post }: { post: LinkedInPost }) {
  const initials = post.author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
  const stripUrl = post.postUrl.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <article className="blog-card">
      <div className="blog-card-strip">
        <span className="blog-card-strip-text">{stripUrl}</span>
        <span className="blog-card-tag">
          <FaLinkedin aria-hidden="true" />
          in
        </span>
      </div>
      <div className="blog-card-body">
        <div className="blog-author">
          <span className="blog-avatar" aria-hidden="true">
            {initials}
          </span>
          <div className="blog-author-text">
            <span className="blog-author-name">{post.author}</span>
            <span className="blog-author-headline">
              {post.headline} · {post.date}
            </span>
          </div>
        </div>
        <p className="blog-card-text">{post.text ?? post.excerpt}</p>
        {post.image && <img className="blog-card-image" src={post.image} alt="" />}
        <div className="blog-card-footer">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link blog-card-link"
          >
            <span>Open on LinkedIn</span>
            <HiOutlineExternalLink />
          </a>
        </div>
      </div>
    </article>
  );
}

export default BlogPage;
