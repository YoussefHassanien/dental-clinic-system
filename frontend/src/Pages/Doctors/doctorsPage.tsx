import { useEffect, useState } from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Footer from "../../Common/Components/Footer/footer";
import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import { doctors } from "./constants";
import Button from "../../Common/Components/Button/button";
import ReactPaginate from "react-paginate";

const DoctorsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentDoctors, setCurrentDoctors] = useState(doctors);
  const itemsPerPage = 6;

  const paginatedDoctors = currentDoctors.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    if (selectedFilter === "female") {
      setCurrentDoctors(doctors.filter((doctor) => doctor.gender === "female"));
    } else if (selectedFilter === "male") {
      setCurrentDoctors(doctors.filter((doctor) => doctor.gender === "male"));
    } else if (selectedFilter === "rating") {
      setCurrentDoctors(doctors.sort((a, b) => b.rating - a.rating));
    } else if (selectedFilter === "nearestAppointment") {
      setCurrentDoctors(
        doctors.sort(
          (a, b) =>
            new Date(a.appointment).getTime() -
            new Date(b.appointment).getTime()
        )
      );
    } else if (selectedFilter === "sessions") {
      setCurrentDoctors(doctors.sort((a, b) => b.sessions - a.sessions));
    } else {
      setCurrentDoctors(
        doctors.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [selectedFilter, searchTerm]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };
  return (
    <div className="flex flex-col justify-start items-center relative max-w-full h-screen font-serif">
      <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24 mb-5">
        <Navbar />
      </div>

      <div className="flex flex-row justify-around items-start space-x-8">
        <ReusableCard backgroundColor="white">
          <div className="flex flex-col justify-start items-center shadow-lg p-4 w-96">
            <div className="flex flex-row justify-between py-2 font-serif items-center text-gray-400 w-full space-x-2">
              <input
                type="text"
                id="searchBar"
                placeholder="Doctor Name"
                className="w-full rounded-md border-2 p-2"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedFilter("");
                }}
              />
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <p className="text-xl text-customBlue my-4 font-bold">Filters</p>
            <hr className="bg-gray-500 mb-4 w-full" />

            <div className="flex flex-col justify-start items-start w-full">
              <p
                className={`text-md font-serif p-2 ${
                  selectedFilter === "male" || selectedFilter === "female"
                    ? "text-customBlue"
                    : ""
                }`}
              >
                Gender
              </p>
              <div className="flex flex-row space-x-4 p-2 font-serif items-center w-full mb-4">
                <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2">
                  <p
                    className={`${
                      selectedFilter === "male"
                        ? "text-customBlue"
                        : "text-gray-400"
                    } text-md font-serif`}
                  >
                    Male
                  </p>
                  <input
                    type="radio"
                    name="filterOption"
                    value="male"
                    onChange={() => setSelectedFilter("male")}
                    checked={selectedFilter === "male"}
                  />
                </div>
                <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2">
                  <p
                    className={`${
                      selectedFilter === "female"
                        ? "text-customBlue"
                        : "text-gray-400"
                    } text-md font-serif`}
                  >
                    Female
                  </p>
                  <input
                    type="radio"
                    name="filterOption"
                    value="female"
                    onChange={() => setSelectedFilter("female")}
                    checked={selectedFilter === "female"}
                  />
                </div>
              </div>
              <hr className="bg-gray-500 mb-4 w-full" />
              <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2 mb-4">
                <p
                  className={`${
                    selectedFilter === "rating" ? "text-customBlue" : ""
                  } text-md font-serif`}
                >
                  Rating
                </p>
                <input
                  type="radio"
                  name="filterOption"
                  value="rating"
                  onChange={() => setSelectedFilter("rating")}
                  checked={selectedFilter === "rating"}
                />
              </div>
              <hr className="bg-gray-500 mb-4 w-full" />
              <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2 mb-4">
                <p
                  className={`${
                    selectedFilter === "nearestAppointment"
                      ? "text-customBlue"
                      : ""
                  } text-md font-serif`}
                >
                  Nearest Appointment
                </p>
                <input
                  type="radio"
                  name="filterOption"
                  value="nearestAppointment"
                  onChange={() => setSelectedFilter("nearestAppointment")}
                  checked={selectedFilter === "nearestAppointment"}
                />
              </div>
              <hr className="bg-gray-500 mb-4 w-full" />
              <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2 mb-4">
                <p
                  className={`${
                    selectedFilter === "sessions" ? "text-customBlue" : ""
                  } text-md font-serif`}
                >
                  Number of Sessions
                </p>
                <input
                  type="radio"
                  name="filterOption"
                  value="sessions"
                  onChange={() => setSelectedFilter("sessions")}
                  checked={selectedFilter === "sessions"}
                />
              </div>
              <hr className="bg-gray-500 mb-4 w-full" />
              <div className="flex flex-row justify-center items-center w-full">
                <Button
                  text="Reset Filters"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedFilter("");
                    setCurrentDoctors(doctors);
                  }}
                />
              </div>
            </div>
          </div>
        </ReusableCard>
        {/* Doctors Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 shadow-lg mb-5 grid-rows-2">
          {paginatedDoctors.map((doctor, index) => (
            <div
              key={index}
              className="max-w-[450px] min-w-[400px] max-h-[300px] min-h-[250px]"
            >
              {" "}
              <ReusableCard backgroundColor="white">
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
                    <p>
                      🕒 Nearest Appointment:
                      {` ${doctor.appointment.toLocaleDateString()} ${doctor.appointment.toLocaleTimeString()}`}
                    </p>
                  </div>
                  <Button text="Book Now" />
                </div>
              </ReusableCard>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        }
        nextLabel={
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        }
        pageCount={Math.ceil(currentDoctors.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center flex-row space-x-2 my-4 ml-40"
        pageClassName="cursor-pointer px-4 py-2 bg-gray-100 rounded-full"
        activeClassName="bg-gray-900 text-white"
        previousClassName="cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white"
        nextClassName="cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white"
      />

      <Footer />
    </div>
  );
};

export default DoctorsPage;
