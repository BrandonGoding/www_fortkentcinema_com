import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const COMING_SOON_URL = "http://localhost:8000/api/v1/films/coming-soon/";

export function useComingSoonFilms() {
  return useQuery({
    queryKey: ["comingSoonFilms"],
    queryFn: async () => {
      const response = await axios.get(COMING_SOON_URL);
      return response.data;
    },
  });
}