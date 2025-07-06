import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FILMS_ARCHIVE_URL } from "../constants";

export function useFilms(page) {
  return useQuery({
    queryKey: ["allFilms", page],
    queryFn: async () => {
      const response = await axios.get(`${FILMS_ARCHIVE_URL}?page=${page}`);
      return response.data;
    },
    keepPreviousData: true,
  });
}


export function useFilmBySlug(slug) {
  return useQuery({
    queryKey: ["filmBySlug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const response = await axios.get(`${FILMS_ARCHIVE_URL}${slug}/`);
      return response.data;
    },
    enabled: !!slug, // Only run if slug is provided
  });
}
