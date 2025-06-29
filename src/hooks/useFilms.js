import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ALL_FILMS_URL = "http://localhost:8000/api/v1/films/";

export function useFilms() {
  return useQuery({
    queryKey: ["allFilms"],
    queryFn: async () => {
      const response = await axios.get(ALL_FILMS_URL);
      return response.data;
    },
  });
}

const FILM_BY_SLUG_URL = "http://localhost:8000/api/v1/films/";

export function useFilmBySlug(slug) {
  return useQuery({
    queryKey: ["filmBySlug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const response = await axios.get(`${FILM_BY_SLUG_URL}${slug}/`);
      return response.data;
    },
    enabled: !!slug, // Only run if slug is provided
  });
}
