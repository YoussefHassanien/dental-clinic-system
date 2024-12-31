import { useState } from "react";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Navbar from "../../Common/Components/Navbar/navbar";
import Footer from "../../Common/Components/Footer/footer";
import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import SuccessMessage from "../../Common/Components/Success-Message/successMessage";

// Mock data to replace external service calls
const MOCK_PATIENT_DATA = {
  title: "Mr.",
  fName: "John",
  lName: "Doe",
  phone: "+1 234 567 8900",
  email: "john.doe@example.com",
  district: "Downtown",
  city: "Metropolis",
  gov: "State",
  gender: "Male",
  dateOfBirth: "1990-01-01",
  allergies: "None",
  bloodType: "O+",
  totalVisits: 12,
};

const ReceptionistPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Appointments");
  const [patientData] = useState(MOCK_PATIENT_DATA);
  const [patientEmail, setPatientEmail] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const doctorsIds = ["D1", "D2", "D3"]; // Example doctor IDs
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [appointmentStartTime, setAppointmentStartTime] = useState("");
  const services: string[] = [
    "Braces",
    "Cavity Fillings",
    "Cavity Prevention",
    "Clear Aligners",
    "Cosmetic Dentistry",
    "Dental Bonding",
    "Dental Bridges",
    "Dental Cleaning",
  ];

  return (
    <div className="flex flex-col justify-start items-center relative max-w-full h-screen font-serif">
      <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24 mb-5">
        <Navbar />
      </div>
      <hr className="bg-gray-100 -translate-y-[14px] w-full mb-10" />
      <div className="flex w-full justify-start items-start flex-row space-x-8 px-5">
        {/* Left Panel */}
        <div className="flex flex-col items-center justify-start space-y-16 mb-10 shadow-lg rounded-md">
          <ReusableCard backgroundColor="white">
            <div className="flex flex-col items-center mb-2.5 w-[400px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-44"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-customBlue">
                {patientData.title} {patientData.fName} {patientData.lName}
              </h2>
            </div>
            <div className="text-lg flex flex-col w-[400px] items-center space-y-2 pb-3">
              <div className="flex flex-row items-center justify-center w-full">
                <div>📞</div> <p className="font-sans">{patientData.phone}</p>
              </div>
              <div className="flex flex-row items-center justify-center w-full space-x-1">
                <div>✉️</div> <p className="font-sans">{patientData.email}</p>
              </div>
              <div className="flex flex-row items-center justify-center w-full">
                <div>📍</div>{" "}
                <p className="font-sans">
                  {patientData.district}, {patientData.city}, {patientData.gov}
                </p>
              </div>
            </div>
          </ReusableCard>
          <ReusableCard backgroundColor="white">
            <div className="flex flex-col items-center mb-2.5 w-[400px]">
              {" "}
              <h3 className="text-2xl font-bold mb-4 text-customBlue">
                Book Appointment
              </h3>
              <hr className="bg-gray-100 w-5/6 my-4" />
              <form className="w-full">
                <div className="flex flex-row justify-center items-center p-2">
                  <input
                    type="text"
                    id="patientEmail"
                    className="text-gray-400 rounded-md border-2 p-2 w-full"
                    placeholder="Patient Email"
                    required={true}
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-row space-x-4 p-2 font-serif items-center">
                  <select
                    id="doctorId"
                    className="text-gray-400 rounded-md border-2 p-2 w-full font-sans"
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    required={true}
                  >
                    <option value="">Doctors Ids</option>
                    {doctorsIds.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row justify-center items-center p-2">
                  <input
                    type="text"
                    id="startTime"
                    className="text-gray-400 rounded-md border-2 p-2 w-full"
                    placeholder="Appointment Start Time"
                    required={true}
                    value={appointmentStartTime}
                    onChange={(e) => setAppointmentStartTime(e.target.value)}
                  />
                </div>
              </form>
              <SuccessMessage
                text="Appointment booked successfully"
                isVisible={showSuccessMessage}
              />
              <div className="flex flex-row justify-center items-center p-2 w-full">
                {" "}
                <button
                  className="bg-customBlue text-white w-full p-2 rounded-md hover:bg-black transition-colors duration-300 ease-in-out"
                  type="submit"
                  onClick={() => {
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                      setShowSuccessMessage(false);
                    }, 3000);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </ReusableCard>
        </div>

        {/* Right Panel */}
        <div className="w-full text-center bg-white rounded-lg shadow-md">
          <div className="p-5 text-left">
            <div className="flex gap-2.5 flex-wrap">
              {[
                { icon: "📅", text: "Appointments" },
                { icon: "👨‍⚕️", text: "Doctors" },
              ].map(({ icon, text }) => (
                <button
                  key={text}
                  onClick={() => setActiveTab(text)}
                  className="flex-1 bg-customBlue hover:bg-black text-white border-none rounded cursor-pointer px-4 py-2.5 flex items-center justify-center gap-1.5 transition-colors duration-300 ease-in-out"
                >
                  <span className="mr-1.5">{icon}</span> {text}
                </button>
              ))}
            </div>

            <div className="mt-5">
              {activeTab && (
                <div className="mt-2.5">
                  <h4 className="text-base font-bold text-[#3f4449] mb-2.5">
                    {activeTab} Table
                  </h4>
                  <table className="w-full border-collapse mt-2.5">
                    <thead>
                      <tr>
                        {activeTab === "Appointments" && (
                          <>
                            <th className="p-2.5 text-left border-b border-gray-200 bg-[#f5f7fa] font-bold text-[#3f4449]">
                              Doctor
                            </th>
                            <th className="p-2.5 text-left border-b border-gray-200 bg-[#f5f7fa] font-bold text-[#3f4449]">
                              Patient
                            </th>
                            <th className="p-2.5 text-left border-b border-gray-200 bg-[#f5f7fa] font-bold text-[#3f4449]">
                              Services
                            </th>
                            <th className="p-2.5 text-left border-b border-gray-200 bg-[#f5f7fa] font-bold text-[#3f4449]">
                              Time
                            </th>
                            <th className="p-2.5 text-left border-b border-gray-200 bg-[#f5f7fa] font-bold text-[#3f4449]">
                              Paid
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="even:bg-gray-50">
                        <td className="p-2.5 text-left border-b border-gray-200">
                          {"Dr. Ahmed"}
                        </td>
                        <td className="p-2.5 text-left border-b border-gray-200">
                          {"Omar Refaat"}
                        </td>
                        <td className="p-2.5 text-left border-b border-gray-200">
                          {services.map((service, index) => (
                            <span
                              key={service}
                              className={`block m-2 ${
                                index % 2 === 0 ? "bg-green-100" : "bg-blue-100"
                              } rounded-md text-center`}
                            >
                              {service}
                            </span>
                          ))}
                        </td>
                        <td className="p-2.5 text-left border-b border-gray-200">
                          {"16:00 PM"}
                        </td>
                        <td className="p-2.5 text-left border-b border-gray-200">
                          {"Yes"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReceptionistPage;
