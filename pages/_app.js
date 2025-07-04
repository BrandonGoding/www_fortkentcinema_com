// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { initGA, trackPageview } from "../src/analytics";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import "../src/App.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageview(window.location.pathname + window.location.search);
  }, [router.asPath]);

  return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
        );
}

export default MyApp;