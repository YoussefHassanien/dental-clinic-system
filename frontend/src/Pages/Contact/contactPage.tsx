import React from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-center relative max-w-full h-screen font-serif">
      <SubNavbar />
      {/* Navbar Container*/}
      <div className="translate-x-24 mb-5">
        <Navbar />
      </div>
    </div>
  );
};

export default ContactPage;
