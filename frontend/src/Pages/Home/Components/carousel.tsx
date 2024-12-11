import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cards } from "./constants";
import Button from "../../../Common/Components/Button/button";

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer  text-white bg-custom-blue rounded-full p-2 shadow-lg hover:bg-black"
    onClick={onClick}
    aria-label="Next slide"
    tabIndex={-1}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8"
      focusable="false"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-custom-blue rounded-full p-2 shadow-lg hover:bg-black"
    onClick={onClick}
    aria-label="Previous slide"
    tabIndex={-1}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8"
      focusable="false"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
    </svg>
  </button>
);

const Carousel: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    accessibility: true,
  };

  return (
    // Carousel Container
    <div className="w-full">
      {/* Carousel Slider object*/}
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id}>
            {/* Carousel Image Container */}
            <div
              className="h-[600px] relative"
              aria-hidden="false"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              role="img"
            ></div>
            {/* Carousel Text Container */}
            <div className="absolute top-28 translate-x-1/3 flex flex-col justify-center items-start font-serif w-3/5 space-y-8">
              {/* Carousel Text */}
              <div className="flex flex-col justify-center items-start space-y-4 text-black w-3/5">
                {/* Carousel Title Text */}
                <p className="font-bold text-4xl">{card.text}</p>
                {/* Carousel Sub-Text */}
                <p className="text-lg">{card.subText}</p>
              </div>
              {/* Carousel Buttons Container */}
              <div className="flex flex-row justify-start items-center space-x-4">
                {/* Card Button */}
                <Button text={card.buttonText} bgColor="" hoverBgColor="" />
                {/* Contact Button */}
                <Button
                  text="Contact"
                  bgColor="#2c2d3f"
                  hoverBgColor="#1a76d1"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
