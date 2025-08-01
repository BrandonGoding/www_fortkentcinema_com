import React, { useRef, useEffect, useState } from "react";
  import placeHolder from "../assets/media/projector-background.jpg";
  import Header from "../components/header";
  import Footer from "../components/footer";
  import { useBlogs } from "../hooks/useBlogs";
  import LoadingSpinner from "../components/LoadingSpinner";
  import ApiErrorMsg from "../components/ApiErrorMsg";

  const BlogRollPage = () => {
    const [page, setPage] = useState(1);
    const [allPosts, setAllPosts] = useState([]);
    const observerRef = useRef(null);
    const { data, isLoading, error } = useBlogs(page);

    const blogPosts = data?.results || [];
    const next = data?.next;

    useEffect(() => {
      if (blogPosts.length > 0) {
        setAllPosts((prevPosts) => [...prevPosts, ...blogPosts]);
      }
    }, [blogPosts]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && next) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );

      if (observerRef.current) {
        observer.observe(observerRef.current);
      }

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current);
        }
      };
    }, [next]);

    return (
      <>
        <Header />
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                Fort Kent Cinema Blog
              </h2>
              <p className="mt-2 text-lg/8 text-gray-600">
                Welcome to the Fort Kent Cinema Blog — your behind-the-scenes pass
                to everything happening at our hometown theater. Here, we share
                the latest movie news, upcoming releases, special events, and
                community spotlights. You’ll also find staff picks, throwbacks to
                classic films, and stories from around the St. John Valley.
                Whether you're a film fanatic or just love a good night out, we
                hope this blog brings you a little extra movie magic between
                visits.
              </p>
            </div>
            {isLoading && page === 1 && <LoadingSpinner />}
            {!isLoading && error && (
              <ApiErrorMsg
                error={
                  "Unable to load the blog roll at this time. Please check back later."
                }
              />
            )}
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {allPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between"
                >
                  <a
                    href={`/fort-kent-cinema-blog/${post.slug}`}
                    className="relative w-full"
                  >
                    <img
                      alt=""
                      src={
                        post.header_image
                          ? post.header_image
                          : placeHolder
                      }
                      className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                  </a>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.post_date} className="text-gray-500">
                        {post.post_date}
                      </time>
                      <a
                        href="#"
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post.category.name}
                      </a>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <a href={`/fort-kent-cinema-blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}<br/><small>{post.subtitle}</small>
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                        {post.content}
                      </p>
                    </div>
                    <div className="relative mt-3 flex items-center gap-x-4">
                      <img
                        alt=""
                        src={placeHolder}
                        className="size-10 rounded-full bg-gray-100"
                      />
                      <div className="text-sm/6">
                        <p className="font-semibold text-gray-900">
                          <span className="absolute inset-0" />
                          {post.author.first_name}&nbsp;{post.author.last_name}
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div ref={observerRef} className="h-10" />
            {isLoading && page > 1 && <LoadingSpinner />}
          </div>
        </div>
        <Footer />
      </>
    );
  };

  export default BlogRollPage;