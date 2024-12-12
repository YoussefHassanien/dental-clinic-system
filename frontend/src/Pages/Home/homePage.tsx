import React from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Carousel from "./Components/carousel";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center absolute max-w-full">
      <SubNavbar />
      <div className="translate-x-24">
        <Navbar />
      </div>
      <div className="w-full translate-y-[6.6px]">
        <Carousel />
      </div>
    </div>
  );
};

export default HomePage;
