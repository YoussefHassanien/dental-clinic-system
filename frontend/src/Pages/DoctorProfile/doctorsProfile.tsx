import React from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import styles from "./doctorProfilePage.module.css";
import doctorImage from "../../assets/doctor1.jpg";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLanguage } from "react-icons/fa";

const DoctorProfilePage: React.FC = () => {
  const doctor = {
    name: "Dr. Michel Jordan",
    specialization: "Dental Surgeon, Cardiologist",
    hospital: "Macy General Hospital",
    experience: "19 Years",
    languages: ["English", "Spanish"],
    types: "Surgeon",
    specialties: ["Dentistry", "Surgery", "Implantology", "Pediatric"],
    image: doctorImage,
    email: "macy@mail.com",
    phone: "0123 456 789",
    address: "35 Blue Area, NY",
  };

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
        <h2 className={styles.doctorName}>{doctor.name}</h2>
        <p className={styles.specialization}>{doctor.specialization}</p>
        <p className={styles.hospital}>{doctor.hospital}</p>
        <div className={styles.details}>
          <p>
            <strong>Experience:</strong> {doctor.experience}
          </p>
          <p>
            <strong>Specialties:</strong> {doctor.specialties.join(", ")}
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className={styles.contactCard}>
        <h3>Contact Info</h3>
        <div className={styles.contactItem}>
          <FaPhone />
          <p>{doctor.phone}</p>
        </div>
        <div className={styles.contactItem}>
          <FaEnvelope />
          <p>{doctor.email}</p>
        </div>
        <div className={styles.contactItem}>
          <FaMapMarkerAlt />
          <p>{doctor.address}</p>
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
