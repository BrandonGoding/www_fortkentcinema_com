import React from "react";
import Footer from "../src/components/footer";
import Header from "../src/components/header";
import HeroSection from "../src/components/hero_section";
import NowPlaying from "../src/components/now_playing";
import Showtimes from "../src/components/showtimes";
import Rates from "../src/components/rates";

const Index = ({ films }) => {

  return (
    <>
      <Header />
      <HeroSection />
      <NowPlaying films={films} />
      <Showtimes />
      <Rates />
      <Footer />
    </>
  );
};

export default Index;
