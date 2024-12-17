import { subNavbarTabs } from "./constants";
import telephoneIcon from "../../../assets/phone-call.png";

// Define the Sub-Navbar component
const SubNavbar: React.FC = () => {
  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: string
  ) => {
    event.preventDefault();
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = path;
    }
  };

  return (
    // Sub-Navbar Container
    <div className="justify-between flex flex-row p-4 font-serif items-center border-b-2 border-gray-100 w-[1400px]">
      {/* Sub-Navbar Tabs Container */}
      <div className="flex flex-row items-center justify-start space-x-8">
        {subNavbarTabs.map((tab) => (
          // Link to the tab path
          <a
            key={tab.label}
            href={tab.path}
            className="text-sm hover:text-customBlue"
            onClick={(event) => handleSmoothScroll(event, tab.path)}
          >
            {tab.label}
          </a>
        ))}
      </div>
      {/* Languages, Email & Number Container */}
      <div className="flex flex-row items-center space-x-8">
        {/* Phone Number Container */}
        <div className="text-sm flex flex-row justify-start space-x-2 items-center">
          {/* Phone Icon */}
          <img src={telephoneIcon} alt="phone-icon" className="w-6 h-6" />
          {/* Phone Number */}
          <p className="font-sans">+880 1234 56789</p>
        </div>
        {/* Email Container */}
        <div className="text-sm flex flex-row justify-start space-x-2 items-center hover:text-customBlue">
          {/* Email Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>

          {/* Email */}
          <a href="mailto:info@dentiplus.com" className="cursor-pointer">
            info@dentiplus.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
