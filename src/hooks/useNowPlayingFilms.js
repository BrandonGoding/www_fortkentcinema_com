import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NOW_PLAYING_URL } from "../constants";

export function useNowPlayingFilms() {
  return useQuery({
    queryKey: ["nowPlayingFilms"],
    queryFn: async () => {
      const response = await axios.get(NOW_PLAYING_URL);
      return response.data;
    },
  });
}
