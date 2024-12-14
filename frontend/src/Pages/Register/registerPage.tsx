import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import clinicLogo from "../../assets/tooth.png";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Common/Components/Error-Message/errorMessage";
import { useState } from "react";
import { days, months, years } from "./constants";

const RegisterPage: React.FC = () => {
  const [day, setDay] = useState("Day");
  const [month, setMonth] = useState("Month");
  const [year, setYear] = useState("Year");
  const [gender, setGender] = useState("");

  return (
    <div className="h-fit flex flex-col justify-between items-center">
      <div className="flex flex-row justify-start items-center space-x-4 my-8">
        <img src={clinicLogo} alt="clinic logo" className="size-20" />
        <p className="text-4xl text-black font-bold font-serif">
          <span className="text-customBlue">Denti</span>
          Plus
        </p>
      </div>

      <ReusableCard backgroundColor="white">
        <div className="flex flex-col items-center font-serif p-4">
          <p className="font-bold text-xl">
            Welcome to dentiplus clinics registeration form
          </p>
          <p className="text-gray-600 text-md">
            It's quick and easy to register with us
          </p>
        </div>
        <hr className="bg-gray-500 my-2 w-full" />
        <form
          className="w-full"
          action={import.meta.env.REGISTER_API}
          method="POST"
          id="loginForm"
        >
          <div className="flex flex-row space-x-4 p-2 font-serif items-center">
            <input
              type="text"
              id="firstName"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              placeholder="First Name"
              required={true}
            />
            <input
              type="text"
              id="lastName"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              placeholder="last Name"
              required={true}
            />
          </div>
          <p className="text-gray-600 text-sm font-serif p-2">Date of Birth</p>
          <div className="flex flex-row space-x-4 p-2 font-serif items-center">
            <select
              id="day"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required={true}
            >
              <option value="">Day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              id="month"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required={true}
            >
              <option value="">Month</option>
              {months.map((m, index) => (
                <option key={index} value={index + 1}>
                  {m}
                </option>
              ))}
            </select>
            <select
              id="year"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required={true}
            >
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <p className="text-gray-600 text-sm font-serif p-2">Gender</p>
          <div className="flex flex-row space-x-4 p-2 font-serif items-center">
            <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2">
              <p className="text-gray-400 text-md font-serif">Male</p>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex flex-row justify-between p-2 font-serif items-center w-full rounded-md border-2">
              <p className="text-gray-400 text-md font-serif">Female</p>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <div className="flex p-2">
            {" "}
            <input
              type="number"
              id="ssn"
              className="text-gray-400 rounded-md border-2 p-2 w-full font-serif"
              placeholder="Social Security Number"
              required={true}
            />
          </div>
          <div className="flex p-2">
            {" "}
            <input
              type="number"
              id="phone"
              className="text-gray-400 rounded-md border-2 p-2 w-full font-serif"
              placeholder="Phone Number"
              required={true}
            />
          </div>
          <div className="flex p-2">
            {" "}
            <input
              type="email"
              id="email"
              className="text-gray-400 rounded-md border-2 p-2 w-full font-serif"
              placeholder="Email Address"
              required={true}
            />
          </div>
          <div className="flex flex-row space-x-4 p-2 font-serif items-center">
            <input
              type="password"
              id="password"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              placeholder="Password"
              required={true}
            />
            <input
              type="password"
              id="confirmPassword"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              placeholder="Confirm Password"
              required={true}
            />
          </div>

          <hr className="bg-gray-500 my-2 w-full" />
          <ErrorMessage text="Invalid email or password" />
          <div className="flex flex-col justify-center items-center p-4 space-y-4">
            {" "}
            <button
              className="bg-customBlue text-white w-full p-2 rounded-md hover:bg-black transition-colors duration-300 ease-in-out"
              type="submit"
            >
              Register
            </button>
            <Link
              to="/login"
              className="text-sm text-customBlue hover:underline hover:underline-offset-2"
            >
              Already registered before ?
            </Link>
          </div>
        </form>
      </ReusableCard>
    </div>
  );
};

export default RegisterPage;
