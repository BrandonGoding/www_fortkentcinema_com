
import Header from "../components/header";
import Footer from "../components/footer";
import { useFilms } from "../hooks/useFilms";
import LoadingSpinner from "../components/LoadingSpinner";
import ApiErrorMsg from "../components/ApiErrorMsg";
import {useBlogs} from "../hooks/useBlogs";
import {useEffect, useRef, useState} from "react";

const FilmArchivePage = () => {
  const [page, setPage] = useState(1);
  const [allFilms, setAllFilms] = useState([]);
  const observerRef = useRef(null);
  const { data = [], isLoading, error } = useFilms(page);
  const films = data?.results || [];
  const next = data?.next;

  useEffect(() => {
    if (films.length > 0) {
      setAllFilms((prevFilms) => [...prevFilms, ...films]);
    }
  }, [films]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && next && !isLoading) {
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
  }, [next, isLoading]);

  return (
    <>
      <Header />
      <div className="mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Fort Kent Cinema Film Archive
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Welcome to the Fort Kent Cinema Film Archive — a curated journey
              through every movie we've ever shown on the big screen.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-2/3 m-auto">
        {isLoading && page === 1 && <LoadingSpinner />}
        {!isLoading && error && (
          <ApiErrorMsg error="Unable to load the film archive. Please try later." />
        )}

        <div className="mx-auto mt-16 mb-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {allFilms.map((film) => (
            <article
              key={film.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
            >
              <img
                alt=""
                src={film?.omdb_json.Poster}
                className="absolute inset-0 -z-10 size-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                <time dateTime={film.omdb_json.Released} className="mr-8">
                  {film.omdb_json.Released}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg
                    viewBox="0 0 2 2"
                    className="-ml-0.5 size-0.5 flex-none fill-white/50"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <div className="flex gap-x-2.5">{film.omdb_json.Genre}</div>
                </div>
              </div>
              <h3 className="mt-3 text-lg/6 font-semibold text-white">
                <a href={`/archive/${film.slug}`}>
                  <span className="absolute inset-0" />
                  {film.title}
                </a>
              </h3>
            </article>
          ))}

          <div ref={observerRef} className="h-10" />
          {isLoading && page > 1 && <LoadingSpinner />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FilmArchivePage;
