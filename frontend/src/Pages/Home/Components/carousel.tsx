import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardBookingImage from "../../../assets/dental-care.jpg";
import cardSmileImage from "../../../assets/smile.jpg";
import cardServicesImage from "../../../assets/dental_care.png";

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer text-black hover:text-white bg-white rounded-full p-2 shadow-lg hover:bg-custom-blue"
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
    className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer text-black hover:text-white bg-white rounded-full p-2 shadow-lg hover:bg-custom-blue"
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

  const cards = [
    {
      image: cardBookingImage,
      text: "The easiest way to book your dental appointment",
      buttonText: "Book",
      id: 1,
    },
    {
      image: cardSmileImage,
      text: "Get the smile you deserve",
      buttonText: "Learn more",
      id: 2,
    },
    {
      image: cardServicesImage,
      text: "Various dental services to meet your needs",
      buttonText: "Services",
      id: 3,
    },
  ];

  return (
    <div className="w-full">
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="h-[700px] relative" aria-hidden="false">
            <div
              className="h-full rounded-b-3xl"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              role="img"
            ></div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 justify-between flex-row items-center flex w-3/5 bg-gray-400 bg-opacity-50 rounded-full font-bold font-sans">
              <p className="text-white text-4xl mb-4">{card.text}</p>
              <button className="cursor-pointer text-white text-xl font-bold hover:text-black bg-custom-blue rounded-full p-2 shadow-lg hover:bg-white w-36 h-14">
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
