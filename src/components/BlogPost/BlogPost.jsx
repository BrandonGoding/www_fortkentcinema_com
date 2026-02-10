import { useEffect, useState, useRef, useCallback } from 'react';
import './BlogPost.css';

function BlogPost({ post, loading, onClose }) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Prevent body scroll when modal is open and manage focus
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    // Focus the close button when modal opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    return () => {
      document.body.style.overflow = 'unset';
      // Restore focus to the element that opened the modal
      if (previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, []);

  // Focus trap within modal
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
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

  const handleCopyLink = async () => {
    if (!post?.slug) return;
    const url = `${window.location.origin}/#blog/${post.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div
      className="blog-post-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-post-dialog-title"
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      <div className="blog-post-modal">
        <button
          className="blog-post-close"
          onClick={onClose}
          aria-label="Close"
          ref={closeButtonRef}
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
                <h1 className="blog-post-title" id="blog-post-dialog-title">{post.title}</h1>
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
                  <button
                    className="blog-post-share"
                    onClick={handleCopyLink}
                    aria-label="Copy link to post"
                  >
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
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
