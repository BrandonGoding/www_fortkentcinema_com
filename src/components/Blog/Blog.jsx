import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogCard';
import './Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch only the 2 most recent posts for the home page preview
        const response = await fetch('https://api.fortkentcinema.com/api/posts/?limit=2');
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();
        setPosts(data.results.slice(0, 2));
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return (
      <section className="blog" id="blog">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">BLOG</h2>
            <p className="section-subtitle">News, reviews, and updates from Fort Kent Cinema</p>
          </div>
          <div className="blog-error">
            <p>Unable to load blog posts. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog" id="blog">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">BLOG</h2>
          <p className="section-subtitle">News, reviews, and updates from Fort Kent Cinema</p>
        </div>

        {loading ? (
          <div className="blog-loading">
            <p>Loading posts...</p>
          </div>
        ) : (
          <>
            <div className="blog-grid blog-grid-preview">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="blog-card-link"
                >
                  <BlogCard post={post} />
                </Link>
              ))}
            </div>

            <div className="blog-view-all">
              <Link to="/blog" className="blog-view-all-link">
                View All Posts &rarr;
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Blog;
