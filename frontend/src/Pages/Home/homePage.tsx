import React from "react";
import { Navbar } from "../../Common/Components/Navbar/navbar";
import Carousel from "./Components/carousel";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <Carousel />
      </div>
    </div>
  );
};

export default HomePage;
