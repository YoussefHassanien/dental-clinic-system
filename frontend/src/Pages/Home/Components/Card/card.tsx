import { Link } from "react-router-dom";
import styles from "./card.module.css";

interface CardsProps {
  title: string;
  paragraph: string;
  buttonText: string;
  icon: string;
}

const Card: React.FC<CardsProps> = ({ title, paragraph, buttonText, icon }) => {
  return (
    // Cards Container
    <div className="relative flex flex-col justify-center items-start bg-custom-blue w-80 h-64 rounded-md p-4 space-y-8 hover:-translate-y-4 hover:shadow-xl hover:shadow-custom-blue ease-in-out duration-500">
      {/* Card Title */}
      <p className="text-white font-bold font-serif text-md">{title}</p>
      {/* Card Text */}
      <p className="text-white text-sm whitespace-pre-line font-sans">
        {paragraph}
      </p>
      {/*Card Link Container*/}
      <div
        className={`flex flex-row justify-between items-center w-28 text-white ${styles["tab"]}`}
      >
        {/* Card Redirect Link */}
        <Link to="" className="text-sm font-bold font-serif">
          {buttonText}
        </Link>
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
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="absolute bottom-2 right-2 size-24 text-gray-400 opacity-50"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
    </div>
  );
};

export default Card;
