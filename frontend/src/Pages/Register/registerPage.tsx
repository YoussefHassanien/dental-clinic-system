import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import clinicLogo from "../../assets/tooth.png";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Common/Components/Error-Message/errorMessage";
import { useState } from "react";
import { days, months, years, countryCodes } from "./constants";
import { handleRegister } from "./services";
import { useAuthContext } from "../../Common/Contexts/Auth/AuthHook";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState("Day");
  const [month, setMonth] = useState("Month");
  const [year, setYear] = useState("Year");
  const [gender, setGender] = useState("male");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [countryCode, setCountryCode] = useState("+20");
  const [password, setPassword] = useState("");
  const [isConfirmPasswordVisible, setIsConfrimPasswordVisible] =
    useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [ssn, setSsn] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { dispatch } = useAuthContext();

  return (
    <div className="h-fit flex flex-col justify-between items-center">
      <div className="flex flex-row justify-start items-center space-x-4 my-4">
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
          onSubmit={(e) =>
            handleRegister(
              e,
              email,
              password,
              confirmPassword,
              ssn,
              phoneNumber,
              countryCode,
              day,
              month,
              year,
              firstName,
              lastName,
              gender,
              setIsErrorVisible,
              setErrorText,
              navigate,
              dispatch
            )
          }
          id="loginForm"
          encType="application/x-www-form-urlencoded"
        >
          <div className="flex flex-row space-x-4 p-2 font-serif items-center">
            <input
              type="text"
              id="firstName"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              placeholder="First Name"
              required={true}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              id="lastName"
              className="text-gray-400 rounded-md border-2 p-2 w-full"
              placeholder="last Name"
              required={true}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <p className="text-gray-600 text-sm font-serif p-2">Date of Birth</p>
          <div className="flex flex-row space-x-4 p-2 font-serif items-center">
            <select
              id="day"
              className="text-gray-400 rounded-md border-2 p-2 w-full font-sans"
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
              className="text-gray-400 rounded-md border-2 p-2 w-full font-sans"
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
              className="text-gray-400 rounded-md border-2 p-2 w-full font-sans"
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
              className="text-gray-400 rounded-md border-2 p-2 w-full font-sans"
              placeholder="Social Security Number"
              required={true}
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
            />
          </div>
          <div className="flex flex-row space-x-4 p-2 font-serif items-center">
            <select
              id="countryCode"
              className="text-gray-400 rounded-md border-2 p-2 w-2/5 font-sans"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              required={true}
            >
              <option value="">Country Codes</option>
              {countryCodes.map((c) => (
                <option key={c.country} value={c.code}>
                  {c.code} - {c.country}
                </option>
              ))}
            </select>{" "}
            <input
              type="number"
              id="phone"
              className="text-gray-400 rounded-md border-2 p-2 w-full font-sans"
              placeholder="Phone Number"
              required={true}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-row space-x-4 p-2 font-serif items-center">
            <div className="flex flex-row justify-between py-2 font-serif items-center text-gray-400 w-full space-x-2">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="registerPassword"
                placeholder="Password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border-2 p-2"
                pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
                title="Password must be at least 8 characters long and include at least one number, one capital letter, and one special character."
              />
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
            <div className="flex flex-row justify-between py-2 font-serif items-center text-gray-400 w-full space-x-2">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="regterConfirmPassword"
                placeholder="Confirm Password"
                required={true}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border-2 p-2"
                pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
                title="Password must be at least 8 characters long and include at least one number, one capital letter, and one special character."
              />
              {isConfirmPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() =>
                    setIsConfrimPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 cursor-pointer"
                  onClick={() =>
                    setIsConfrimPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>

          <hr className="bg-gray-500 my-2 w-full" />
          <div className="flex flex-col justify-center items-center p-4 space-y-2">
            <ErrorMessage text={errorText} isVisible={isErrorVisible} />
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
