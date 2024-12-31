import React, { useEffect, useState } from "react";
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import styles from "./doctorProfilePage.module.css";
import doctorImage from "../../assets/doctor1.jpg";
import { get_current_doctor, fetch_requests, create_request } from "./services";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLanguage,
} from "react-icons/fa";
import { data } from "react-router-dom";
import { json } from "body-parser";

const DoctorProfilePage: React.FC = () => {
  const [doctorData, setDoctorData] = useState<any>({});
  const [requests, setRequests] = useState<any[]>([]);
  const [materialId, setMaterialId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please log in again.");
    }
    if (token) {
      const parsedToken = JSON.parse(token);

      // Fetch doctor profile
      get_current_doctor(parsedToken)
        .then((data) => setDoctorData(data.data.doctorProfile))
        .catch(() => alert("Something went wrong"));

      // Fetch existing requests
      fetch_requests(parsedToken)
        .then((data) => setRequests(data.data))
        .catch(() => alert("Failed to fetch requests"));
    }
  }, []);

  const handleRequestSubmit = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = JSON.parse(token);

      create_request(parsedToken, materialId)
        .then((newRequest) => {
          setRequests([...requests, newRequest.data]);
          setMaterialId(""); // Clear the input
        })
        .catch(() => alert("Failed to create request"));
    }
  };

  return (
    <div className={styles.pageContainer}>
  <SubNavbar />
  <Navbar />
  <div className={styles.content}>
    {/* Main Content Row */}
    <div className={styles.mainContent}>
      {/* Left Column: Doctor Info and Contact Info */}
      <div className={styles.leftColumn}>
        <div className={styles.doctorCard}>
          <img
            src={doctorData.profileImg}
            alt="Doctor"
            className={styles.doctorImage}
          />
          <h2 className={styles.doctorName}>
            {doctorData.title} {doctorData.fName} {doctorData.lName}
          </h2>
          <p className={styles.specialization}>{doctorData.specialization}</p>
          <p className={styles.hospital}>{doctorData.hospital}</p>
          <div className={styles.details}>
            <p>
              <strong>Specialties:</strong> {doctorData.specialities}
            </p>
            <p>
              <strong>SSN:</strong> {doctorData.ssn}
            </p>
          </div>
        </div>
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
            <p>
              {doctorData.district}, {doctorData.city}, {doctorData.gov}
            </p>
          </div>
          <div className={styles.contactItem}>
            <FaLanguage />
            <p>{doctorData.languages}</p>
          </div>
        </div>
      </div>

      {/* Right Column: Request Table */}
      <div className={styles.rightColumn}>
        <h2>Supply Requests</h2>
        <table className={styles.requestTable}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Material ID</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request._id}</td>
                <td>{request.materialId}</td>
                <td>{request.status}</td>
                <td>{new Date(request.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.newRequestForm}>
          <input
            type="text"
            placeholder="Enter Material ID"
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
          />
          <button onClick={handleRequestSubmit}>Request Supply</button>
        </div>
      </div>
    </div>

    {/* DICOM Viewer */}
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
