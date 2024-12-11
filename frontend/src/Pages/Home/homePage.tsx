import React from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Carousel from "./Components/carousel";

const HomePage: React.FC = () => {
  return (
    <div>
      <SubNavbar />
      <Navbar />
      <Carousel />
    </div>
  );
};

export default HomePage;
