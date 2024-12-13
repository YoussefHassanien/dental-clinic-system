import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Carousel from "./Components/Carousel/carousel";
import Card from "./Components/Card/card";
import aboutUsImage from "../../assets/blockqoute-bg.jpg";
import StatisticCard from "../../Common/Components/Statistics-Card/statisticsCard";
import whoWeAreImage from "../../assets/dental-care.jpg";
import SectionHeader from "./Components/Section-Header/sectionHeader";
import SectionBackground from "./Components/Section-Background/sectionBackground";
import SectionContent from "./Components/Section-Content/sectionContent";
import firstPatientImage from "../../assets/smile.jpg";
import secondPatientImage from "../../assets/smile2.jpg";
import thirdPatientImage from "../../assets/smile3.jpg";
import ReusableCarousel from "../../Common/Components/Reusable-Carousel/resusableCarousel";
import handshakeImage from "../../assets/client-bg.jpg";
import Button from "../../Common/Components/Button/button";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };
  return (
    // HomePage Container
    <div className="flex flex-col justify-center items-center relative max-w-full scroll-smooth">
      <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24">
        <Navbar />
      </div>
      {/* Carousel Container*/}
      <div className="w-full translate-y-[6.6px]">
        <Carousel />
      </div>
      {/* Cards Container */}
      <div className="-translate-y-32 flex flex-row justify-start items-center space-x-10">
        <Card
          title="Patients' Feedback"
          paragraph="Hear from our satisfied patients about their experiences and the exceptional care they received at our clinic."
          buttonText="Learn More"
          icon="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          buttonRedirectPath="#patientsFeedback"
        />
        <Card
          title="About Us"
          paragraph="At clinic, we are dedicated to providing top-notch dental services with a focus on patient comfort and satisfaction."
          buttonText="Learn More"
          icon="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          buttonRedirectPath="#whoWeAre"
        />
        <Card
          title="Opening Hours"
          paragraph={`Sunday - Thursday: 10:00 AM - 10:00 PM\nFriday: 2:00 PM - 8:00 PM\nSaturday: 11:00 AM - 9:00 PM`}
          buttonText="Learn More"
          icon="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          buttonRedirectPath=""
        />
      </div>
      {/* About Us Section */}
      {/* Section Header Container*/}
      <div className="-translate-y-14 scroll-smooth" id="aboutUs">
        {" "}
        {/* Section Header */}
        <SectionHeader
          headerText="We Are Always Ready To Help You Get the Best Smile"
          subText="Our dedicated team of dental professionals is committed to providing you with personalized care and the latest treatments to ensure your smile is healthy and beautiful. Trust us to be your partner in achieving optimal dental health."
        />
      </div>

      {/* Section Content */}
      <SectionContent
        headerText="Who Are We"
        subText1="          At our dental care clinic, we are committed to providing
          exceptional dental services with a focus on patient comfort and
          satisfaction. Our team of experienced professionals is dedicated
          to ensuring that every visit is a positive experience."
        subText2="          We utilize the latest technology and techniques to offer a wide
          range of dental treatments, from routine cleanings and check-ups
          to advanced cosmetic and restorative procedures. Our goal is to
          help you achieve and maintain a healthy, beautiful smile."
        subText3="          Our clinic is designed to create a welcoming and relaxing
          environment, where you can feel at ease during your dental visits.
          We believe in building long-term relationships with our patients,
          based on trust, transparency, and personalized care."
        imageSrc={whoWeAreImage}
      ></SectionContent>
      {/* Section Background */}
      <SectionBackground backgroundImage={aboutUsImage}>
        {/* Clinics Number */}
        <StatisticCard
          number={167}
          text="Clinics World Wide"
          iconPath="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
        {/* Doctors Number */}
        <StatisticCard
          number={960}
          text="Qualified Doctors"
          iconPath="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
        {/* Patients Number */}
        <StatisticCard
          number={6000}
          text="Satisfied Patients"
          iconPath="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
        {/* Years of Experience */}
        <StatisticCard
          number={32}
          text="Years of Experience"
          iconPath="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
        />
      </SectionBackground>
      {/* Patients' Feedback Section */}
      <div id="patientsFeedback" className="scroll-smooth">
        {" "}
        <SectionHeader
          headerText="We Always Strive To Provide The Best Dental Care For Our Patients"
          subText="Hear from our satisfied patients about their experiences and the exceptional care they received at our clinics as We are dedicated to providing top-notch dental services with a focus on patient comfort and satisfaction."
        />
      </div>
      {/* Patients' Feedback Carousel */}
      <ReusableCarousel>
        {/* Patient 1 */}
        <SectionContent
          headerText="Elizabeth Smith"
          subText1="I had an amazing experience at this dental clinic. The staff was incredibly friendly and professional."
          subText2="The dentist took the time to explain every procedure and made sure I was comfortable throughout the entire process."
          subText3="I highly recommend this clinic to anyone looking for top-notch dental care. My smile has never looked better!"
          imageSrc={firstPatientImage}
        />
        {/* Patient 2 */}
        <SectionContent
          headerText="Jamie Antoine"
          subText1="I had an amazing experience at this dental clinic. The staff was incredibly friendly and professional."
          subText2="The dentist took the time to explain every procedure and made sure I was comfortable throughout the entire process."
          subText3="I highly recommend this clinic to anyone looking for top-notch dental care. My smile has never looked better!"
          imageSrc={secondPatientImage}
        />
        {/* Patient 3 */}
        <SectionContent
          headerText="Marcos Silva"
          subText1="I had an amazing experience at this dental clinic. The staff was incredibly friendly and professional."
          subText2="The dentist took the time to explain every procedure and made sure I was comfortable throughout the entire process."
          subText3="I highly recommend this clinic to anyone looking for top-notch dental care. My smile has never looked better!"
          imageSrc={thirdPatientImage}
        />
      </ReusableCarousel>
      <SectionBackground backgroundImage={handshakeImage}>
        <div className="flex flex-col justify-center items-center space-y-4 font-serif">
          <p className="text-white font-bold text-3xl">
            We Believe That Staff Diversity Makes The Difference
          </p>
          <p className="text-white text-lg w-3/5">
            Our diverse team brings a wealth of knowledge, experience, and
            perspectives to our clinic, enhancing the quality of care we
            provide. We are committed to fostering an inclusive environment
            where everyone feels valued and respected.
          </p>
          <div className="flex flex-row justify-start items-center space-x-10">
            <Button
              text="Meet Our Doctors"
              bgColor="white"
              hoverBgColor="black"
              textColor="black"
              hoverTextColor="white"
              onClick={() => handleNavigation("/doctors")}
            />
            <Button
              text="Contact Us"
              bgColor="black"
              hoverBgColor="white"
              textColor="white"
              hoverTextColor="black"
              onClick={() => handleNavigation("/contact")}
            />
          </div>
        </div>
      </SectionBackground>
    </div>
  );
};

export default HomePage;
