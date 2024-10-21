import { useState, useEffect } from "react";

function BlogPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    document.title = "Blog";

    return () => setIsMounted(false);
  }, []);

  return (
    <div id="blog-page-container">
      <div
        id="page-title"
        style={{
          top: isMounted ? "50%" : 0,
          opacity: isMounted ? 1 : 0,
        }}
      >
        <span>Coming Soon</span>
      </div>
    </div>
  );
}

export default BlogPage;
