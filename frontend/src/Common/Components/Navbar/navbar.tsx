// Import necessary components and hooks from react-router-dom and @headlessui/react
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Tab,
  TabGroup,
  TabList,
} from "@headlessui/react";

// Import custom hook for managing language dropdown state
import useLanguageDropdown from "./hooks";

// Import constants for languages and tabs
import { languages, tabs } from "./constants";

// Logo Image
import logo from "../../../assets/dentist-day.png";

// Define the Navbar component
const Navbar: React.FC = () => {
  // Destructure values from the custom hook
  const { language, isDropdownOpen, selectLanguage, toggleDropdown } =
    useLanguageDropdown();

  // Get the current location and navigate functions from react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // Return the JSX for the Navbar component
  return (
    // Navbar container
    <div className="flex justify-evenly items-center font-sans bg-custom-blue p-4">
      {/* Title */}
      <div className="w-80 space-x-4 items-center flex">
        <img src={logo} alt="Clinic Logo" className="h-16 w-16" />
        <h1 className="font-bold text-4xl text-white">Dentty Clinics</h1>
      </div>

      {/* Navigation tabs container*/}
      <div className="w-3/5 p-4">
        {/* Tab group with manual mode */}
        <TabGroup
          manual // Use manual mode to trigger navigation on click instead of hover
          defaultIndex={tabs.findIndex((tab) => tab.path === location.pathname)}
        >
          {/* Tab list with tabs */}
          <TabList className="flex justify-around w-full">
            {tabs.map((tab) => (
              // Tab component for each tab
              <Tab
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={({ selected }) =>
                  `cursor-pointer ${
                    selected
                      ? "font-bold text-white transition-colors duration-500 ease-in-out"
                      : "text-gray-300"
                  } hover:text-black transition-colors duration-500 ease-in-out`
                }
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>

      {/* Login link container */}
      <div className="w-28 flex items-center space-x-2 text-white hover:text-black transition-colors duration-500 ease-in-out">
        {/* Login icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        {/* Login link */}
        <Link to="/login" className="text-xl font-bold">
          Login
        </Link>
      </div>

      {/* Language dropdown menu */}
      <Menu
        as="div"
        className="relative inline-block text-left text-white  hover:text-black transition-colors duration-500 ease-in-out"
      >
        {/* Language & Chevron button */}
        <MenuButton
          className="flex justify-between items-center"
          onClick={toggleDropdown}
        >
          {/* Language */}
          <span>{language}</span>

          {/* Chevron icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ml-2 transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </MenuButton>
        {/* Dropdown menu items */}
        <MenuItems className="absolute left-0 mt-2 w-24 p-2 bg-custom-blue rounded-lg shadow-md">
          {languages.map((language) => (
            /* Menu item for each language */
            <MenuItem
              key={language.code}
              as="button"
              className="block px-4 py-2 w-full text-left cursor-pointer data-[focus]:bg-gray-50"
              onClick={() => selectLanguage(language.code)}
            >
              {language.label}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};

// Export the Navbar component
export { Navbar };
