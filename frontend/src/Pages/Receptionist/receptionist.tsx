import { useState } from "react";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Navbar from "../../Common/Components/Navbar/navbar";
import Footer from "../../Common/Components/Footer/footer";
import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";

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
        <div className="flex flex-col items-center justify-start space-y-8">
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
                <div className="flex flex-row justify-center items-center">
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
                <p className="text-gray-600 text-sm font-serif p-2">
                  Date of Birth
                </p>
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
              </form>
            </div>
          </ReusableCard>
        </div>

        {/* Right Panel */}
        <div className="w-full text-center bg-white rounded-lg shadow-md">
          <div className="p-5 text-left">
            <h3 className="text-[23px] font-bold text-[#3f4449] mb-4">
              Overview:
            </h3>
            <div className="flex flex-col gap-8 p-5">
              <div className="flex justify-between gap-5">
                <div className="flex-1 flex flex-col gap-2.5">
                  <span className="text-lg font-bold text-[#747373]">
                    Gender:
                  </span>
                  <span className="text-[23px] font-bold text-customBlue">
                    {patientData.gender}
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-2.5">
                  <span className="text-lg font-bold text-[#747373]">
                    Date of Birth:
                  </span>
                  <span className="text-[23px] font-bold text-customBlue">
                    {patientData.dateOfBirth}
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-2.5">
                  <span className="text-lg font-bold text-[#747373]">
                    Allergies:
                  </span>
                  <span className="text-[23px] font-bold text-customBlue">
                    {patientData.allergies}
                  </span>
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="flex-1 flex flex-col gap-2.5">
                  <span className="text-lg font-bold text-[#747373]">
                    Blood Type:
                  </span>
                  <span className="text-[23px] font-bold text-customBlue">
                    {patientData.bloodType}
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-2.5">
                  <span className="text-lg font-bold text-[#747373]">
                    Total Visits:
                  </span>
                  <span className="text-[23px] font-bold text-customBlue">
                    {patientData.totalVisits}
                  </span>
                </div>
                <div className="flex-1 flex flex-col gap-2.5">
                  <span className="text-lg font-bold text-[#747373]">
                    Next Visit:
                  </span>
                  <span className="text-[23px] font-bold text-customBlue">
                    09/12/2020
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 text-left">
            <div className="flex gap-2.5 flex-wrap">
              {[
                { icon: "📅", text: "Appointments" },
                { icon: "👨‍⚕️", text: "Doctors" },
                { icon: "💊", text: "Treatment" },
                { icon: "🧪", text: "Tests & Lab Results" },
                { icon: "📄", text: "Billing" },
              ].map(({ icon, text }) => (
                <button
                  key={text}
                  onClick={() => setActiveTab(text)}
                  className="flex-1 bg-[#3a8ddf] hover:bg-[#2a76b3] text-white border-none rounded cursor-pointer px-4 py-2.5 flex items-center justify-center gap-1.5"
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
                              Time
                            </th>
                            <th className="p-2.5 text-left border-b border-gray-200 bg-[#f5f7fa] font-bold text-[#3f4449]">
                              Doctor
                            </th>
                            <th className="p-2.5 text-left border-b border-gray-200 bg-[#f5f7fa] font-bold text-[#3f4449]">
                              Action
                            </th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="even:bg-gray-50">
                        <td className="p-2.5 text-left border-b border-gray-200">
                          09:00
                        </td>
                        <td className="p-2.5 text-left border-b border-gray-200">
                          Dr. Smith
                        </td>
                        <td className="p-2.5 text-left border-b border-gray-200">
                          Details
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
