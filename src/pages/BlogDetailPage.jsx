import React from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useTitle } from "../hooks/useTitle";
// import { useMetaDescription} from "../hooks/useMetaDescription";
import { useMetaImage } from "../hooks/useMetaImage";
import Header from "../components/header";
import Footer from "../components/footer";
import { useBlogBySlug } from "../hooks/useBlogs";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: blog, isLoading, error } = useBlogBySlug(slug);

  useTitle((blog?.title ? blog.title + " | " : "") + "Fort Kent Cinema Blog");
  useMetaImage(blog?.header_image && "https://fortkentcinema.com/static/images/fort-kent-cinema-logo.png");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !blog) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-semibold text-gray-500">Blog not found.</p>
        </div>
        <Footer />
      </>
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
