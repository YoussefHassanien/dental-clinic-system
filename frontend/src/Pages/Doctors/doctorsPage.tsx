import { useEffect, useState } from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Footer from "../../Common/Components/Footer/footer";
import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import { Doctor } from "./constants";
import Button from "../../Common/Components/Button/button";
import ReactPaginate from "react-paginate";
import Loading from "../../Common/Components/Loading/loading";
import SuccessMessage from "../../Common/Components/Success-Message/successMessage";
import ErrorMessage from "../../Common/Components/Error-Message/errorMessage";
import { getDoctorsCardsInfo, getDoctorAvailability } from "./services";
import { useAuthContext } from "../../Common/Contexts/Auth/AuthHook";

const DoctorsPage: React.FC = () => {
  const { user } = useAuthContext();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    hour: string;
  } | null>(null);
  const [doctorAvailableSlots, setdoctorAvailableSlots] = useState({});

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDoctorCardsLoading, setIsDoctorCardsLoading] = useState(true);
  const [isDoctorAvailabilityLoading, setIsDoctorAvailabilityLoading] =
    useState(true);
  const [paymentType, setPaymentType] = useState("");
  const itemsPerPage = 6;

  const paginatedDoctors =
    filteredDoctors.length > 0
      ? filteredDoctors.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
        )
      : [];

  useEffect(() => {
    getDoctorsCardsInfo()
      .then((doctorsData) => {
        if (doctorsData) {
          setDoctors(doctorsData);
          setFilteredDoctors(doctorsData);
          setIsDoctorCardsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      getDoctorAvailability(selectedDoctor.id, user?.token ?? "")
        .then((availability) => {
          if (availability) {
            setdoctorAvailableSlots(availability);
            setIsDoctorAvailabilityLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching doctor availability:", error);
        });
    }
  }, [selectedDoctor, user?.token]);

  useEffect(() => {
    let updatedDoctors = [...doctors];

    if (selectedFilter === "female") {
      updatedDoctors = doctors.filter((doctor) => doctor.gender === "female");
    } else if (selectedFilter === "male") {
      updatedDoctors = doctors.filter((doctor) => doctor.gender === "male");
    } else if (selectedFilter === "rating") {
      updatedDoctors = [...doctors].sort((a, b) => b.rating - a.rating);
    } else if (selectedFilter === "nearestAppointment") {
      updatedDoctors = [...doctors].sort(
        (a, b) =>
          new Date(a.appointment).getTime() - new Date(b.appointment).getTime()
      );
    } else if (selectedFilter === "sessions") {
      updatedDoctors = [...doctors].sort((a, b) => b.sessions - a.sessions);
    }

    if (searchTerm) {
      updatedDoctors = updatedDoctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(updatedDoctors);
    setCurrentPage(0); // Reset to the first page
  }, [selectedFilter, searchTerm, doctors]);

  const handleBookNow = (doctor: Doctor) => {
    if (!user) {
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);
    } else {
      setSelectedDoctor(doctor);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDoctor(null);
    setShowSuccessMessage(false);
    setSelectedSlot(null);
  };

  return (
    <div className="flex flex-col justify-start items-center relative max-w-full h-screen font-serif">
      <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24 mb-5">
        <Navbar />
      </div>
      <hr className="bg-gray-100 -translate-y-[14px] w-full mb-10" />
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
                  setCurrentPage(0);
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
                    setDoctors(doctors);
                  }}
                  width="w-3/5"
                />
              </div>
            </div>
          </div>
        </ReusableCard>
        {/* Doctors Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 shadow-lg mb-5 grid-rows-2">
          {isDoctorCardsLoading && <Loading />}
          {paginatedDoctors &&
            paginatedDoctors.map((doctor, index) => (
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
                        <p className="text-customBlue text-sm font-medium mb-2">
                          <span className="font-sans">
                            {doctor.yearsOfExperience}
                          </span>{" "}
                          years of experience
                        </p>

                        {/* Rating and Top Rated Badge */}
                        <div className="flex items-center space-x-2 text-yellow-500">
                          <p className="text-sm font-sans">
                            {doctor.rating <= 1
                              ? "⭐"
                              : doctor.rating <= 2
                              ? "⭐⭐"
                              : doctor.rating <= 3
                              ? "⭐⭐⭐"
                              : doctor.rating <= 4
                              ? "⭐⭐⭐⭐"
                              : "⭐⭐⭐⭐⭐"}{" "}
                            {doctor.rating} (Reviews)
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
                      {doctor.specialities.map((speciality, index) => (
                        <span
                          key={index}
                          className={`inline-block ${
                            index % 2 === 0 ? "bg-green-100" : "bg-gray-100"
                          } text-gray-600 px-3 py-1 rounded-full text-xs mr-2`}
                        >
                          {speciality}
                        </span>
                      ))}
                    </div>

                    {/* Appointment */}
                    <div className="text-sm text-gray-700 mb-4 font-sans">
                      <p>
                        🕒 Nearest Appointment:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          weekday: "long",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }).format(new Date(doctor.appointment))}
                      </p>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                      {" "}
                      <ErrorMessage
                        isVisible={showErrorMessage}
                        text="Please log in first"
                      />
                    </div>
                    {user && (
                      <div className="flex flex-row space-x-4 p-2 font-serif items-center mb-2">
                        <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2">
                          <p
                            className={`${
                              paymentType === `cash-${index}`
                                ? "text-customBlue"
                                : "text-gray-400"
                            } text-md font-serif`}
                          >
                            Pay in cash
                          </p>
                          <input
                            type="radio"
                            name={`paymentType-${index}`}
                            value="cash"
                            checked={paymentType === `cash-${index}`}
                            onChange={() => setPaymentType(`cash-${index}`)}
                            required={true}
                          />
                        </div>
                        <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2">
                          <p
                            className={`${
                              paymentType === `wallet-${index}`
                                ? "text-customBlue"
                                : "text-gray-400"
                            } text-md font-serif`}
                          >
                            Pay with wallet
                          </p>
                          <input
                            type="radio"
                            name={`paymentType-${index}`}
                            value="wallet"
                            checked={paymentType === `wallet-${index}`}
                            onChange={() => setPaymentType(`wallet-${index}`)}
                            required={true}
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-row justify-center w-full">
                      <Button
                        text="Book Now"
                        width="w-3/5"
                        onClick={() => {
                          handleBookNow(doctor);
                        }}
                      />
                    </div>
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
        pageCount={Math.ceil(doctors.length / itemsPerPage)}
        onPageChange={(selectedPage: { selected: number }) => {
          setCurrentPage(selectedPage.selected);
        }}
        containerClassName="flex justify-center flex-row space-x-2 my-4 ml-40"
        pageClassName="cursor-pointer px-4 py-2 bg-gray-100 rounded-full"
        activeClassName="bg-gray-900 text-white"
        previousClassName="cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white"
        nextClassName="cursor-pointer p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white"
      />
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <ReusableCard backgroundColor="white">
            <div className="p-6 min-w-96 flex flex-col justify-center items-start">
              <h2 className="text-xl font-bold mb-4 flex flex-row justify-center w-full">
                Booking Confirmation
              </h2>
              <div className="flex flex-row justify-start  items-center space-x-4">
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
                <p className="font-bold text-customBlue">
                  {selectedDoctor?.name}
                </p>
              </div>
              {/* Display Available Slots by Day */}
              <div className="mt-4 w-full">
                <h3 className="font-semibold mb-2">Available Slots:</h3>
                {isDoctorAvailabilityLoading && <Loading />}
                {doctorAvailableSlots &&
                Object.keys(doctorAvailableSlots).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(doctorAvailableSlots).map(
                      ([day, hours]) => (
                        <div key={day}>
                          <h4 className="font-medium mb-2">{day}</h4>
                          <div className="grid grid-cols-8 gap-2">
                            {(hours as string[]).map((hour, index) => (
                              <button
                                key={index}
                                className={`px-2 py-1 border border-gray-300 rounded font-sans ${
                                  selectedSlot?.day === day &&
                                  selectedSlot?.hour === hour
                                    ? "bg-green-500 text-white"
                                    : "hover:bg-customBlue"
                                }`}
                                onClick={() => setSelectedSlot({ day, hour })}
                              >
                                {hour}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p>No slots available</p>
                )}
              </div>
              <SuccessMessage
                text="Your booking request is sent, A confirmation email will be sent once accepted"
                isVisible={showSuccessMessage}
              ></SuccessMessage>
              <div className="flex justify-between flex-row w-full mt-4">
                <Button
                  text="Confirm"
                  width="w-2/5"
                  onClick={() => {
                    setShowSuccessMessage(true);
                  }}
                />
                <Button text="Cancel" width="w-2/5" onClick={closePopup} />
              </div>
            </div>{" "}
          </ReusableCard>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DoctorsPage;
