import { useState, useEffect } from 'react';
import BlogCard from '../BlogCard';
import BlogPost from '../BlogPost';
import './Blog.css';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  const POSTS_PER_PAGE = 6;

  const fetchPosts = async (url = 'https://api.fortkentcinema.com/api/posts/') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      const data = await response.json();
      setPosts(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setTotalCount(data.count);

      // Extract offset from URL for pagination display
      const urlObj = new URL(url);
      const offset = parseInt(urlObj.searchParams.get('offset') || '0', 10);
      setCurrentOffset(offset);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePrevPage = () => {
    if (prevPage) {
      fetchPosts(prevPage);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchPosts(nextPage);
    }
  };

  const handlePostClick = async (post) => {
    setPostLoading(true);
    try {
      const response = await fetch(`https://api.fortkentcinema.com/api/posts/${post.slug}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      const fullPost = await response.json();
      setSelectedPost(fullPost);
    } catch (err) {
      console.error('Failed to fetch blog post:', err);
      // Still show the post with existing data if detail fetch fails
      setSelectedPost(post);
    } finally {
      setPostLoading(false);
    }
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  const currentPage = Math.floor(currentOffset / POSTS_PER_PAGE) + 1;
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

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
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="blog-pagination">
                <button
                  className="pagination-arrow"
                  onClick={handlePrevPage}
                  disabled={!prevPage}
                  aria-label="Previous page"
                >
                  <span>&#8249;</span>
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-arrow"
                  onClick={handleNextPage}
                  disabled={!nextPage}
                  aria-label="Next page"
                >
                  <span>&#8250;</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {(selectedPost || postLoading) && (
        <BlogPost
          post={selectedPost}
          loading={postLoading}
          onClose={handleClosePost}
        />
      )}
    </section>
  );
}

export default Blog;
