import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NOW_PLAYING_URL = "http://localhost:8000/api/v1/films/now-playing/";

export function useNowPlayingFilms() {
  return useQuery({
    queryKey: ["nowPlayingFilms"],
    queryFn: async () => {
      const response = await axios.get(NOW_PLAYING_URL);
      return response.data;
    },
  });
}