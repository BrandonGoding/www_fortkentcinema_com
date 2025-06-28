import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import blogFile from "../assets/blogs.json";
import { useTitle } from "../hooks/useTitle";
import Header from "../components/header";
import Footer from "../components/footer";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  useTitle(blog?.title + "| Fort Kent Cinema Blog");
  useEffect(() => {
    const fetchedBlog = blogFile.find((post) => post.slug === slug);
    setBlog(fetchedBlog);
  }, [slug]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-500">Blog not found.</p>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(
    blog.content.replace(/\n/g, "<br/>"),
  );

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white relative p-8 rounded-lg shadow-md border border-gray-300 lined-paper">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 ml-2">
            {blog.title}
          </h1>
          <h2 className="text-2xl font-medium text-gray-600 mb-6 ml-2">
            {blog.subtitle}
          </h2>
          <div className="text-sm text-gray-500 mb-8  ml-2">
            <p>
              <span className="font-semibold">Post By:</span>{" "}
              {blog.author.first_name} {blog.author.last_name}
            </p>
            <p>
              <span className="font-semibold">Written On:</span>{" "}
              {new Date(blog.post_date).toLocaleDateString()}
            </p>
          </div>
          <div
            className="prose prose-lg max-w-none text-gray-800  ml-2"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          ></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
