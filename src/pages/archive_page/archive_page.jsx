import { useTitle } from "../../hooks/useTitle";

const ArchivePage = ({ films }) => {
  useTitle("Fort Kent Cinema Film Archive");
  const today = new Date();

  // Filter out films with a future release date
  const filteredFilms = films.filter((film) => {
    const released = new Date(film.omdb_json.Released);
    return released <= today;
  });

  // Sort the filtered films by release date (newest first)
  const sortedFilms = [...filteredFilms].sort((a, b) => {
    const dateA = new Date(a.omdb_json.Released);
    const dateB = new Date(b.omdb_json.Released);
    return dateB - dateA;
  });

  return (
    <>
      <div className="mt-24 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Fort Kent Cinema Film Archive
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Welcome to the Fort Kent Cinema Film Archive — a curated journey
              through every movie we've ever shown on the big screen. From
              blockbuster premieres to indie gems, family favorites to cinematic
              epics, this archive celebrates the diverse stories that have lit
              up our screens and brought our community together. Take a stroll
              down memory lane and rediscover the films that made you laugh,
              cry, cheer, and come back for more. This is more than a list —
              it’s our shared history in film.
            </p>
            <p className="mt-4 !text-md font-medium text-pretty text-gray-700 sm:text-xl/8">
              Note: Film information is sourced from the{" "}
              <a
                href="http://www.omdbapi.com/"
                title="OMDB API website"
                className="font-bold text-gray-950"
              >
                OMDB API
              </a>{" "}
              and may not be complete for all titles.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-2/3 m-auto">
        <div className="mx-auto mt-16 mb-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {sortedFilms.map((film) => (
            <article
              key={film.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
            >
              <img
                alt=""
                src={film.omdb_json.Poster}
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
        </div>
      </div>
    </>
  );
};

export default ArchivePage;
