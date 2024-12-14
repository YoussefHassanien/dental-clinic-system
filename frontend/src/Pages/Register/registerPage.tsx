import Footer from "../../Common/Components/Footer/footer";
import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import clinicLogo from "../../assets/tooth.png";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Common/Components/Error-Message/errorMessage";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      <div className="flex flex-row items-center justify-start space-x-4 mt-20">
        <img src={clinicLogo} alt="clinic logo" className="size-20" />
        <div className="flex flex-col justify-center items-start">
          <p className="text-4xl text-black font-bold font-serif">
            <span className="text-customBlue">Denti</span>
            Plus
          </p>
          <p className="text-xl text-gray-400 font-bold font-serif">
            We are happy to see you again!
          </p>
        </div>

        <ReusableCard backgroundColor="white">
          <div className="shadow-lg w-[400px] flex space-y-4 felx-col items-center justify-start">
            <form
              className="w-full border-b-2 border-gray-200"
              action="http://localhost:8000/api/v1/auth/login"
              method="POST"
              id="loginForm"
            >
              <div className="flex flex-col space-y-4 p-4 font-serif items-center">
                <input
                  type="email"
                  id="loginEmail"
                  className="text-gray-400 rounded-md border-1 p-2 w-full"
                  placeholder="Email Address"
                />
                <input
                  type="password"
                  id="loginPassword"
                  className="text-gray-400 rounded-md border-1 p-2 w-full"
                  placeholder="Password"
                />
                <ErrorMessage text="Invalid email or password" />
                <button
                  className="bg-customBlue text-white w-full p-2 rounded-md hover:bg-black transition-colors duration-300 ease-in-out"
                  type="submit"
                >
                  Log in
                </button>
                <Link
                  to="/forgot-password"
                  className="text-sm text-customBlue hover:underline hover:underline-offset-2"
                >
                  Forgotten Password ?
                </Link>
                <hr className="bg-gray-500 my-4 w-full" />
                <button className="bg-gray-700 text-white w-2/3 p-2 rounded-md hover:bg-customBlue transition-colors duration-300 ease-in-out">
                  Register
                </button>
              </div>
            </form>
          </div>
        </ReusableCard>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
