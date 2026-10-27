import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { markdownPosts } from "../data";

function BlogPost() {
  const { slug } = useParams();
  const post = markdownPosts.find((p) => p.slug === slug);

  useEffect(() => {
    document.title = post ? post.title : "Post not found";
  }, [post]);

  return (
    <div id="blog-page-container" style={{ top: 0, opacity: 1 }}>
      <div className="blog-header">
        <Link to="/blog" className="project-link blog-card-link">
          <HiOutlineArrowLeft />
          <span>Blog</span>
        </Link>
      </div>

      {post ? (
        <article className="blog-card blog-post">
          <div className="blog-card-strip">
            <span className="blog-card-strip-text">salmanrf@blog:~ $ cat {post.fileName}</span>
            <span className="blog-card-tag">md</span>
          </div>
          <div className="blog-card-body">
            <span className="blog-card-meta">
              {post.date}
              {post.readTime ? ` · ${post.readTime}` : ""}
            </span>
            <h1 className="blog-card-title">{post.title}</h1>
            <div className="blog-post-body">
              <Markdown>{post.body}</Markdown>
            </div>
            {post.tags.length > 0 && (
              <div className="blog-card-footer">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-chip">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      ) : (
        <p className="blog-empty">No post at this address.</p>
      )}
    </div>
  );
}

export default BlogPost;
