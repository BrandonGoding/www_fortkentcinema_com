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