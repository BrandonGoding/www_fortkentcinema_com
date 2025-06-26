import React from "react";
import "./blog_reel.scss";
import SectionHeading from "../../components/section_heading/section_heading";
import blogFile from "./blogs.json";
import {Link} from "react-router-dom";
import  placeHolder from "../../components/hero_section/projector-background.jpg"

const blogPosts = blogFile || [];



const BlogRollPage = () => {

    return (
        <div className="blog-reel-page">
            <SectionHeading heading_text="Fort Kent Cinema Blog" />
                <div className="intro-text">
                <p>
                    Welcome to the Fort Kent Cinema blog! Here, we share the latest news, updates, and insights
                    from our cinema. Stay tuned for exciting announcements, behind-the-scenes content, and more!
                </p>
            </div>
            <div className="blog-roll">
                {blogPosts.map((post, idx) => (
                    <div key={idx} style={{ position: "relative" }}>
    <img src={post.header_image || placeHolder} alt={post.title} className="blog-post-image" />
    <div className="blog-post-overlay">
        <h3>{post.title}</h3>
        <h4>{post.subtitle}</h4>
        <h5>By {post.author.first_name}&nbsp;{post.author.last_name}</h5>
        <Link className="blog-post-link" to={`/fort-kent-cinema-blog/${post.slug}`}>Read More</Link>
    </div>
</div>
                ))}
            </div>
        </div>
    );
};

export default BlogRollPage;