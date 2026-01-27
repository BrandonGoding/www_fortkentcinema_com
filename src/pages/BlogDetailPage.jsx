import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './BlogDetailPage.css';

function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.fortkentcinema.com/api/posts/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch blog post');
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

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
    return content
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n\n')
      .filter((p) => p.trim());
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-loading">
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail-container">
          <div className="blog-detail-error">
            <p>Unable to load this post.</p>
            <Link to="/blog" className="blog-detail-back-btn">
              &larr; Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getExcerpt = (content, maxLength = 160) => {
    if (!content) return '';
    const plainText = content.replace(/\r\n/g, ' ').replace(/\n/g, ' ').trim();
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="blog-detail-page">
      <Helmet>
        <title>{post.title} | Fort Kent Cinema</title>
        <meta name="description" content={post.subtitle || getExcerpt(post.content)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.subtitle || getExcerpt(post.content)} />
        <meta property="og:url" content={`https://www.fortkentcinema.com/blog/${slug}`} />
        <meta property="og:type" content="article" />
        {post.header_image && <meta property="og:image" content={post.header_image} />}
        <link rel="canonical" href={`https://www.fortkentcinema.com/blog/${slug}`} />
      </Helmet>
      {post.header_image && (
        <div className="blog-detail-hero">
          <img
            src={post.header_image}
            alt={post.title}
            className="blog-detail-hero-img"
          />
          <div className="blog-detail-hero-overlay" />
        </div>
      )}

      <div className="blog-detail-container">
        <nav className="blog-detail-nav">
          <Link to="/blog" className="blog-detail-back">
            &larr; Back to Blog
          </Link>
        </nav>

        <article className="blog-detail-article">
          <header className="blog-detail-header">
            {post.category && (
              <span className="blog-detail-category">{post.category.name}</span>
            )}
            <h1 className="blog-detail-title">{post.title}</h1>
            {post.subtitle && (
              <p className="blog-detail-subtitle">{post.subtitle}</p>
            )}
            <div className="blog-detail-meta">
              {post.author && (
                <span className="blog-detail-author">
                  By {post.author.first_name} {post.author.last_name}
                </span>
              )}
              <span className="blog-detail-date">{formatDate(post.post_date)}</span>
              <button
                className="blog-detail-share"
                onClick={handleCopyLink}
                aria-label="Copy link to post"
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </header>

          <div className="blog-detail-body">
            {formatContent(post.content).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <footer className="blog-detail-footer">
          <Link to="/blog" className="blog-detail-footer-link">
            &larr; Back to all posts
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default BlogDetailPage;
