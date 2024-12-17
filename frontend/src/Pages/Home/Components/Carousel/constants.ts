import sliderImage1 from "../../../../Assets/slider.jpg";
import sliderImage2 from "../../../../Assets/slider2.jpg";
import sliderImage3 from "../../../../Assets/slider3.jpg";

export const cards = [
  {
    image: sliderImage1,
    text: "The <span class='text-customBlue'>Easiest</span> Way To Book Your <span class='text-customBlue'>Dental</span> Appointment",
    subText:
      "Experience hassle-free scheduling with our user-friendly platform. Your perfect smile is just a click away!",
    buttonText: "Book Now",
    id: 1,
    cardRedirectPath: "/book-appointment",
  },
  {
    image: sliderImage2,
    text: "Get The <span class='text-customBlue'>Smile</span> You Deserve With The Help Of Our <span class='text-customBlue'>Experts</span>",
    subText:
      "Trust our experienced dental professionals to provide personalized care and advanced treatments for a healthier, brighter smile.",
    buttonText: "Learn More",
    id: 2,
    cardRedirectPath: "#aboutUs",
  },
  {
    image: sliderImage3,
    text: "We <span class='text-customBlue'>Provide</span> Dental Services That You Can <span class='text-customBlue'>Trust!</span>",
    subText:
      "Rely on our dedicated team of professionals for comprehensive and compassionate care tailored to your needs.",
    buttonText: "Our Services",
    id: 3,
    cardRedirectPath: "/services",
  },
];
