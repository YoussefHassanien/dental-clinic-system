import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import Footer from "../../Common/Components/Footer/footer";
import ReusableCard from "../../Common/Components/Reusable-Card/reusableCard";
import { dentalServices } from "./constants";
import Button from "../../Common/Components/Button/button";
import tooth from "../../assets/tooth-2.png";
import { useNavigate } from "react-router-dom";

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-start items-center relative max-w-full h-screen font-serif">
      <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24 mb-5">
        <Navbar />
      </div>
      <hr className="bg-gray-100 -translate-y-[14px] w-full mb-10" />
      <div className="flex flex-row justify-around items-start space-x-8">
        {/* Dental Services Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mb-5 grid-rows-2 shadow-lg">
          {dentalServices &&
            dentalServices.map((service, index) => (
              <div key={index} className="w-[450px] h-[300px] m-10">
                <ReusableCard backgroundColor="white">
                  <div className="p-4 w-full flex flex-col justify-center items-center space-y-4">
                    {/* Service Details */}
                    <img src={tooth} alt="tooth" className="size-14" />
                    {/* Service Name */}
                    <h2 className="text-xl font-bold text-customBlue mb-2">
                      {service.name}
                    </h2>
                    {/* Price Range */}
                    <p className="text-black text-md font-bold font-sans">
                      {service.priceRange}
                    </p>
                    <hr className="bg-gray-500 my-2 w-full" />
                    {/* Description */}
                    <p className="text-black text-md mb-2">
                      {service.description}
                    </p>

                    {/* Book Appointment Button */}
                    <Button
                      text="Book Now"
                      width="w-3/5"
                      onClick={() => {
                        navigate("/doctors");
                      }}
                    />
                  </div>
                </ReusableCard>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
