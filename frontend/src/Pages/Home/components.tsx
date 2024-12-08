import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cardBookingImage from "../../assets/dental-care.jpg";
import cardSmileImage from "../../assets/smile.jpg";
import cardServicesImage from "../../assets/dental_care.png";

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8 text-white hover:text-custom-blue"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8 text-white hover:text-custom-blue"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
    </svg>
  </div>
);

const Carousel: React.FC = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const cards = [
    {
      image: cardBookingImage,
      text: "Card 1 Text",
      id: 1,
    },
    {
      image: cardSmileImage,
      text: "Card 2 Text",
      id: 2,
    },
    {
      image: cardServicesImage,
      text: "Card 3 Text",
      id: 3,
    },
  ];

  return (
    <div className="w-full m-auto">
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="h-[650px]">
            <div
              className="h-full bg-custom-blue text-white text-4xl flex justify-start items-end"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
