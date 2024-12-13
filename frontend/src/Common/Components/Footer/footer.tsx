import facebookIcon from "../../../assets/Facebook.svg";
import linkedinIcon from "../../../assets/LinkedIn.svg";
import twitterIcon from "../../../assets/Twitter.svg";
import instagramIcon from "../../../assets/Instagram.svg";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
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
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <img src={facebookIcon} alt="facebook-icon" className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <img src={linkedinIcon} alt="linkedin-icon" className="w-6 h-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <img src={twitterIcon} alt="twitter-icon" className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <img
                src={instagramIcon}
                alt="instagram-icon"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
        <div className="flex space-x-4">
          <a
            className="hover:underline under underline-offset-8 decoration-customBlue hover:text-customBlue transition-colors ease-in-out duration-300"
            href=""
            onClick={(event) => handleSmoothScroll(event, "#aboutUs")}
          >
            About Us
          </a>
          <Link
            to="/services"
            className="hover:underline under underline-offset-8 decoration-customBlue hover:text-customBlue transition-colors ease-in-out duration-300"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="hover:underline under underline-offset-8 decoration-customBlue hover:text-customBlue transition-colors ease-in-out duration-300"
          >
            Contact
          </Link>
          <Link
            to="/doctors"
            className="hover:underline under underline-offset-8 decoration-customBlue hover:text-customBlue transition-colors ease-in-out duration-300"
          >
            Doctors
          </Link>
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
