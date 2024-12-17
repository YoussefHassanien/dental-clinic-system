import React, { useEffect, useState } from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import styles from "./doctorProfilePage.module.css";
import doctorImage from "../../assets/doctor1.jpg";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLanguage,
} from "react-icons/fa";

const DoctorProfilePage: React.FC = () => {
  const doctor = {
    specialization: "Dental Surgeon",
    hospital: "DentiPlus clinic",
    experience: "19 Years",
    languages: ["English", "Spanish"],
    types: "Surgeon",
    specialties: ["Dentistry", "Surgery", "Implantology"],
    image: doctorImage,
  };

  const[doctorData,setdoctorData]=useState({})
  useEffect(()=>{
   let data= localStorage.getItem("DoctorData")
   if (data){
   console.log(JSON.parse(data).fName)

   setdoctorData(JSON.parse(data))
   }
  }, [] )

  return (
    <div className={styles.pageContainer}>
      <SubNavbar />
      <Navbar />
      <div className={styles.content}>
        <div className={styles.profileContainer}>
          {/* Doctor Info */}
          <div className={styles.doctorCard}>
            <img
              src={doctor.image}
              alt={doctor.name}
              className={styles.doctorImage}
            />
            <h2 className={styles.doctorName}>{doctorData.fName} {doctorData.lName}</h2>
            <p className={styles.specialization}>{doctor.specialization}</p>
            <p className={styles.hospital}>{doctor.hospital}</p>
            <div className={styles.details}>
              
              <p>
                <strong>Specialties:</strong> {doctor.specialties.join(", ")}
              </p>
              <p>
                <strong>ssn:</strong> {doctorData.ssn}
              </p> 
              
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.contactCard}>
            <h3>Contact Info</h3>
            <div className={styles.contactItem}>
              <FaPhone />
              <p>{doctorData.phone}</p>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope />
              <p>{doctorData.email}</p>
            </div>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt />
              <p>{doctorData.district}, {doctorData.gov}, {doctorData.city}</p>
            </div>
            <div className={styles.contactItem}>
              <FaLanguage />
              <p>{doctor.languages.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* DICOM Viewer Panel */}
        <div className={styles.viewerPanel}>
          <h2>Patient DICOM Viewer</h2>
          <iframe
            src="http://127.0.0.1:7860"
            width="100%"
            height="600px"
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;