import React from "react";
import Carousel from "./../components/homePage/carousel";
import HowItWorks from "../components/homePage/howItWorks";
import ProvidedServices from "../components/homePage/providedServices";
import TopRated from "../components/homePage/topRated";
import Trust from "../components/homePage/trust";

function Home() {
  return (
    <>
      <Carousel></Carousel>
      <HowItWorks></HowItWorks>
      <ProvidedServices></ProvidedServices>
      <Trust></Trust>
      <TopRated></TopRated>
    </>
  );
}
export default Home;
