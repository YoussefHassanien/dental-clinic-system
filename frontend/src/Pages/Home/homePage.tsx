import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Carousel from "./Components/Carousel/carousel";
import InfoCard from "./Components/Info-Card/infoCard";
import aboutUsImage from "../../assets/blockqoute-bg.jpg";
import StatisticCard from "../../Common/Components/Statistics-Card/statisticsCard";
import SectionHeader from "./Components/Section-Header/sectionHeader";
import SectionBackground from "./Components/Section-Background/sectionBackground";
import SectionContent from "./Components/Section-Content/sectionContent";
import ReusableCarousel from "../../Common/Components/Reusable-Carousel/resusableCarousel";
import handshakeImage from "../../assets/client-bg.jpg";
import Button from "../../Common/Components/Button/button";
import { useNavigate } from "react-router-dom";
import {
  infoCardsData,
  testimonialsData,
  statisticsData,
  sectionContentData,
  coFoundersData,
} from "./constants";
import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import Footer from "../../Common/Components/Footer/footer";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

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
        {infoCardsData.map((card) => (
          <InfoCard
            key={card.title}
            title={card.title}
            paragraph={card.paragraph}
            icon={card.icon}
            buttonText={card.buttonText}
            buttonRedirectPath={card.buttonRedirectPath}
          />
        ))}
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
        headerText={sectionContentData[0].headerText}
        subText1={sectionContentData[0].subText1}
        subText2={sectionContentData[0].subText2}
        subText3={sectionContentData[0].subText3}
        imageSrc={sectionContentData[0].imageSrc}
      ></SectionContent>
      {/* Section Background */}
      <SectionBackground backgroundImage={aboutUsImage} bgColor="gray-800">
        {statisticsData.map((stat, index) => (
          <StatisticCard
            key={index}
            number={stat.number}
            text={stat.text}
            iconPath={stat.iconPath}
          />
        ))}
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
        {testimonialsData.map((testimonial, index) => (
          <SectionContent
            key={index}
            headerText={testimonial.headerText}
            subText1={testimonial.subText1}
            subText2={testimonial.subText2}
            subText3={testimonial.subText3}
            imageSrc={testimonial.imageSrc}
          />
        ))}
      </ReusableCarousel>
      <SectionBackground backgroundImage={handshakeImage} bgColor="gray-800">
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
              onClick={() => navigate("/doctors")}
            />
            <Button
              text="Contact Us"
              bgColor="#1a76d1"
              hoverBgColor="white"
              textColor="white"
              hoverTextColor="black"
              onClick={() => navigate("/contact")}
            />
          </div>
        </div>
      </SectionBackground>

      {/* Team Container */}
      <div id="team" className="scroll-smooth">
        <SectionHeader
          headerText="Meet Our Experienced Co-Founders of DentiPlus Clinics"
          subText="Our co-founders are highly skilled Biomedical and Healthcare Data Engineers dedicated to providing exceptional software solutions. They are committed to ensuring your comfort and satisfaction during every visit to DentiPlus Clinics."
        />
      </div>
      <ReusableCarousel content={2}>
        {coFoundersData.map((founder, index) => (
          <div key={index}>
            <ReusableCard>
              <div className="bg-white text-black w-[600px] h-[400px] rounded-xl shadow-lg overflow-hidden">
                {/* Team Members Image */}
                <img
                  className="w-full h-2/5 object-cover"
                  src={founder.imageSrc}
                  alt="Founder Image"
                />
                {/* Team Members Text Container */}
                <div className="p-6">
                  <p className="text-2xl font-bold mb-2">
                    {founder.title}: {founder.name}
                  </p>
                  <p className="text-lg mb-4">{founder.description}</p>
                  <div className="flex items-center space-x-4">
                    <Button
                      text="Contact"
                      bgColor="customBlue"
                      hoverBgColor="black"
                      textColor="white"
                      hoverTextColor="white"
                    />
                    <Button
                      text="Learn More"
                      bgColor="black"
                      hoverBgColor="#1a76d1"
                      textColor="white"
                      hoverTextColor="white"
                    />
                  </div>
                </div>
              </div>
            </ReusableCard>
          </div>
        ))}
      </ReusableCarousel>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
