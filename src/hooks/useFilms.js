import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ALL_FILMS_URL } from "../constants";

export function useFilms() {
  return useQuery({
    queryKey: ["allFilms"],
    queryFn: async () => {
      const response = await axios.get(ALL_FILMS_URL);
      return response.data;
    },
  });
}


export function useFilmBySlug(slug) {
  return useQuery({
    queryKey: ["filmBySlug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const response = await axios.get(`${ALL_FILMS_URL}${slug}/`);
      return response.data;
    },
    enabled: !!slug, // Only run if slug is provided
  });
}
