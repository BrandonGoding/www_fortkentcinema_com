import './BlogCard.css';

function BlogCard({ post }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T12:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return '';
    // Remove carriage returns and normalize line breaks
    const cleanContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    // Get first paragraph or truncate
    const firstParagraph = cleanContent.split('\n\n')[0];
    if (firstParagraph.length <= maxLength) return firstParagraph;
    return firstParagraph.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className="blog-card">
      <div className="blog-card-image">
        {post.header_image ? (
          <img
            src={post.header_image}
            alt={post.title}
            className="blog-card-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="blog-card-placeholder"
          style={{ display: post.header_image ? 'none' : 'flex' }}
        >
          <div className="blog-card-placeholder-icon">📝</div>
        </div>
        {post.category && (
          <span className="blog-card-category">{post.category.name}</span>
        )}
      </div>
      <div className="blog-card-content">
        <h3 className="blog-card-title">{post.title}</h3>
        {post.subtitle && (
          <p className="blog-card-subtitle">{post.subtitle}</p>
        )}
        <p className="blog-card-excerpt">{getExcerpt(post.content)}</p>
        <div className="blog-card-meta">
          {post.author && (
            <span className="blog-card-author">
              {post.author.first_name} {post.author.last_name}
            </span>
          )}
          <span className="blog-card-date">{formatDate(post.post_date)}</span>
        </div>
        <span className="blog-card-read-more">Read More</span>
      </div>
    </article>
  );
}

export default BlogCard;
