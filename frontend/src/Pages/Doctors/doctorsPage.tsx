import React from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Footer from "../../Common/Components/Footer/footer";
import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import { doctors } from "./constants";
import Button from "../../Common/Components/Button/button";

const DoctorsPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-center relative max-w-full h-screen font-serif">
      <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24 mb-5">
        <Navbar />
      </div>

      {/* Doctors Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 shadow-lg mb-5">
        {doctors.map((doctor, index) => (
          <ReusableCard key={index} backgroundColor="white">
            <div className="p-4 w-full">
              {/* Top Section: Doctor Image, Name, Specialty, and Rating */}
              <div className="flex items-center gap-4 mb-4">
                {/* Doctor Avatar (placeholder icon) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <div>
                  {/* Name and Sessions */}
                  <div className="flex flex-row justify-between items-center space-x-10 mb-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {doctor.name}
                    </h2>
                    <p className="bg-customBlue text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md font-sans">
                      {doctor.sessions}+ Sessions
                    </p>
                  </div>

                  {/* Specialty */}
                  <p className="text-customBlue text-sm font-medium">
                    {doctor.specialty}
                  </p>

                  {/* Rating and Top Rated Badge */}
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <p className="text-sm font-sans">
                      ⭐⭐⭐⭐⭐ {doctor.rating} (Reviews)
                    </p>
                    {doctor.topRated && (
                      <span className="text-xs font-semibold">
                        🏵️ Top Rated
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Interests Section */}
              <div className="mb-4">
                {doctor.interests.map((interest, index) => (
                  <span
                    key={index}
                    className={`inline-block ${
                      index % 2 === 0 ? "bg-green-100" : "bg-gray-100"
                    } text-gray-600 px-3 py-1 rounded-full text-xs mr-2`}
                  >
                    {interest}
                  </span>
                ))}
              </div>

              {/* Appointment */}
              <div className="text-sm text-gray-700 mb-4 font-sans">
                <p>🕒 Nearest Appointment: {doctor.appointment}</p>
              </div>
              <Button text="Book Now" />
            </div>
          </ReusableCard>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default DoctorsPage;

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="size-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
  />
</svg>;
