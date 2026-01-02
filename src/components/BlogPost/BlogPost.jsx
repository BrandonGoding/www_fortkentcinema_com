import { useEffect } from 'react';
import './BlogPost.css';

function BlogPost({ post, loading, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T12:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatContent = (content) => {
    if (!content) return [];
    // Clean up the content and split into paragraphs
    return content
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n\n')
      .filter((p) => p.trim());
  };

  return (
    <div className="blog-post-overlay" onClick={handleBackdropClick}>
      <div className="blog-post-modal">
        <button
          className="blog-post-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {loading ? (
          <div className="blog-post-loading">
            <p>Loading post...</p>
          </div>
        ) : post ? (
          <>
            {post.header_image && (
              <div className="blog-post-hero">
                <img
                  src={post.header_image}
                  alt={post.title}
                  className="blog-post-hero-img"
                />
                <div className="blog-post-hero-overlay" />
              </div>
            )}

            <article className="blog-post-content">
              <header className="blog-post-header">
                {post.category && (
                  <span className="blog-post-category">{post.category.name}</span>
                )}
                <h1 className="blog-post-title">{post.title}</h1>
                {post.subtitle && (
                  <p className="blog-post-subtitle">{post.subtitle}</p>
                )}
                <div className="blog-post-meta">
                  {post.author && (
                    <span className="blog-post-author">
                      By {post.author.first_name} {post.author.last_name}
                    </span>
                  )}
                  <span className="blog-post-date">{formatDate(post.post_date)}</span>
                </div>
              </header>

              <div className="blog-post-body">
                {formatContent(post.content).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          </>
        ) : (
          <div className="blog-post-error">
            <p>Unable to load post.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPost;
