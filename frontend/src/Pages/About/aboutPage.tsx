import React from "react";
import Navbar from "../../Common/Components/Navbar/navbar";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-custom-blue min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl">About Page</h1>
        <p className="text-white text-lg">Welcome to the about page</p>
      </div>
    </div>
  );
};

export default AboutPage;
