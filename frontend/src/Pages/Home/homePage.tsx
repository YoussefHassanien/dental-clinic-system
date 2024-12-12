import React from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Carousel from "./Components/Carousel/carousel";
import Card from "./Components/Card/card";

const HomePage: React.FC = () => {
  return (
    // HomePage Container
    <div className="flex flex-col justify-center items-center relative max-w-full">
      <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24">
        <Navbar />
      </div>
      {/* Carousel Container*/}
      <div className="w-full translate-y-[6.6px]">
        <Carousel />
      </div>
      {/* Cards Container */}
      <div className="-translate-y-20 flex flex-row justify-start items-center space-x-10">
        <Card
          title="Patients' Feedback"
          paragraph="Hear from our satisfied patients about their experiences and the exceptional care they received at our clinic."
          buttonText="Learn More"
          icon="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
        <Card
          title="About Us"
          paragraph="At our dental care clinic, we are dedicated to providing top-notch dental services with a focus on patient comfort and satisfaction."
          buttonText="Learn More"
          icon="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
        <Card
          title="Opening Hours"
          paragraph={`Sunday - Thursday: 10:00 AM - 10:00 PM\nFriday: 2:00 PM - 8:00 PM\nSaturday: 11:00 AM - 9:00 PM`}
          buttonText="Learn More"
          icon="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </div>
    </div>
  );
};

export default HomePage;
