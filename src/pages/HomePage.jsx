import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import HeroSection from "../components/hero_section";
import NowPlaying from "../components/now_playing";
import Showtimes from "../components/showtimes";
import Rates from "../components/rates";

const HomePage = ({ films }) => {

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

export default HomePage;
