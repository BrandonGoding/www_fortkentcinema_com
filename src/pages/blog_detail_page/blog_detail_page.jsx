import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import blogFile from "../blog_reel_page/blogs.json";

const BlogDetailPage = () => {
    const { slug } = useParams(); // Get UUID from route params
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchedBlog = blogFile.find((post) => post.slug === slug); // Find blog by UUID
        setBlog(fetchedBlog);
    }, [slug]);

    if (!blog) {
        return <p>Blog not found.</p>;
    }

    const sanitizedContent = DOMPurify.sanitize(blog.content.replace(/\n/g, "<br/>"));

    return (
        <div className="blog-container">
            <h2 className="blog-title">{blog.title}</h2>
            <h3 className="blog-subtitle">{blog.subtitle}</h3>
            <h4>Post By: {blog.author.first_name}&nbsp;{blog.author.last_name}</h4>
            <h5 className="blog-date">Written On: {new Date(blog.post_date).toLocaleDateString()}</h5>
            <p className="blog-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>
        </div>
    );
};

export default BlogDetailPage;