// src/hooks/useBlogs.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BLOGROLL_URL, BLOG_BY_SLUG_URL } from "../constants";

export function useBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axios.get(BLOGROLL_URL);
      return response.data;
    },
  });
}


export function useBlogBySlug(slug) {
  return useQuery({
    queryKey: ["blogBySlug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const response = await axios.get(`${BLOG_BY_SLUG_URL}${slug}/`);
      return response.data;
    },
    enabled: !!slug,
  });
}
