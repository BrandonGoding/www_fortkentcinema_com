import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BlogCard from '../components/BlogCard';
import './BlogListPage.css';

function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const fetchPosts = async (url = 'https://api.fortkentcinema.com/api/posts/', append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      const data = await response.json();

      if (append) {
        setPosts((prev) => [...prev, ...data.results]);
      } else {
        setPosts(data.results);
      }
      setNextPage(data.next);
      setTotalCount(data.count);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch blog posts:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const loadMore = useCallback(() => {
    if (nextPage && !loadingMore) {
      fetchPosts(nextPage, true);
    }
  }, [nextPage, loadingMore]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPage && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [nextPage, loadingMore, loadMore]);

  if (error && posts.length === 0) {
    return (
      <div className="blog-list-page">
        <div className="blog-list-container">
          <div className="blog-list-header">
            <Link to="/" className="blog-list-back">&larr; Back to Home</Link>
            <h1 className="blog-list-title">BLOG</h1>
            <p className="blog-list-subtitle">News, reviews, and updates from Fort Kent Cinema</p>
          </div>
          <div className="blog-list-error">
            <p>Unable to load blog posts. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-page">
      <Helmet>
        <title>Blog | Fort Kent Cinema</title>
        <meta name="description" content="News, reviews, and updates from Fort Kent Cinema. Stay up to date with the latest movie announcements, events, and community news." />
        <meta property="og:title" content="Blog | Fort Kent Cinema" />
        <meta property="og:description" content="News, reviews, and updates from Fort Kent Cinema." />
        <meta property="og:url" content="https://www.fortkentcinema.com/blog" />
        <link rel="canonical" href="https://www.fortkentcinema.com/blog" />
      </Helmet>
      <div className="blog-list-container">
        <div className="blog-list-header">
          <Link to="/" className="blog-list-back">&larr; Back to Home</Link>
          <h1 className="blog-list-title">BLOG</h1>
          <p className="blog-list-subtitle">News, reviews, and updates from Fort Kent Cinema</p>
        </div>

        {loading ? (
          <div className="blog-list-loading" aria-live="polite" role="status">
            <p>Loading posts...</p>
          </div>
        ) : (
          <>
            <div className="blog-list-grid">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="blog-list-card-link"
                >
                  <BlogCard post={post} />
                </Link>
              ))}
            </div>

            {/* Infinite scroll trigger element */}
            <div ref={loadMoreRef} className="blog-list-load-more">
              {loadingMore && (
                <div className="blog-list-loading-more" aria-live="polite" role="status">
                  <p>Loading more posts...</p>
                </div>
              )}
              {!nextPage && posts.length > 0 && (
                <div className="blog-list-end">
                  <p>You've reached the end</p>
                </div>
              )}
            </div>

            <div className="blog-list-count" aria-live="polite" role="status">
              Showing {posts.length} of {totalCount} posts
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BlogListPage;
