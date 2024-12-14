import { socialMediaLinks, navigationLinks } from "./constants";
import { Link, useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
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
    <footer className="bg-gray-800 text-white py-8 w-full font-serif">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 space-y-1">
          <h2 className="text-2xl font-bold">DentiPlus Clinics</h2>
          <p className="text-sm">
            Providing exceptional dental care since{" "}
            <span className="font-sans">1992</span>
          </p>
          <div className="mt-4 flex space-x-4">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
              >
                <img src={link.src} alt={link.alt} className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex space-x-4">
          {navigationLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`hover:underline underline-offset-8 decoration-customBlue hover:text-customBlue transition-colors ease-in-out duration-300 ${
                location.pathname === link.to
                  ? "text-customBlue underline underline-offset-8"
                  : ""
              }`}
            >
              {link.text}
            </Link>
          ))}
          <a
            className="hover:underline under underline-offset-8 decoration-customBlue hover:text-customBlue transition-colors ease-in-out duration-300"
            href=""
            onClick={(event) => handleSmoothScroll(event, "#aboutUs")}
          >
            About Us
          </a>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm">
            &copy; <span className="font-sans">2024</span> DentiPlus Clinics.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
