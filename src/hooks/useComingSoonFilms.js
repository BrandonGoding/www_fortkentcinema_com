import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { COMING_SOON_URL, COMING_SOON_CALENDAR_URL } from "../constants";

export function useComingSoonFilms() {
  return useQuery({
    queryKey: ["comingSoonFilms"],
    queryFn: async () => {
      const response = await axios.get(COMING_SOON_URL);
      return response.data;
    },
  });
}


export function useComingSoonCalendarFilms() {
  return useQuery({
    queryKey: ["comingSoonCalendarFilms"],
    queryFn: async () => {
      const response = await axios.get(COMING_SOON_CALENDAR_URL);
      return response.data;
    },
  });
}