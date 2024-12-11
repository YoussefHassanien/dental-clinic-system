import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/tooth.png";
import { navbarTabs } from "./constants";
import styles from "./navbar.module.css";
import Button from "../Button/button";

// Define the Navbar component
const Navbar: React.FC = () => {
  // Get the current location
  const location = useLocation();

  return (
    //Navbar Container
    <div className="flex flex-row justify-start items-center my-8 space-x-32 font-serif p-4">
      {/* Title and Logo Container */}
      <div className="flex flex-row items-center space-x-4">
        {/*Logo Image*/}
        <img src={logo} alt="logo" className="w-16 h-16" />
        {/*Title*/}
        <h1 className="text-4xl font-bold text-custom-blue">
          Denti
          <span className="text-black">Plus</span>
        </h1>
      </div>
      {/* Navbar Links Container*/}
      <div className="flex flex-row items-center space-x-8">
        {navbarTabs.map((tab) => (
          //Link to the tab path
          <Link key={tab.label} to={tab.path}>
            <button
              className={`${styles.tab} text-xl ${
                location.pathname === tab.path ? styles["tab-selected"] : ""
              }`}
            >
              {tab.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Login & Register Buttons Container*/}
      <div className="flex flex-row justify-evenly items-center space-x-4">
        {/*Login & Register Buttons*/}
        <Button text="Login" bgColor="" hoverBgColor="" />
        <Button text="Register" bgColor="#2c2d3f" hoverBgColor="#1a76d1" />
      </div>
    </div>
  );
};

// Export the Navbar component
export default Navbar;
