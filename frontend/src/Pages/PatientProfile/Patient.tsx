import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import styles from "./Patient.module.css"; 
import {get_current_patient} from "./services";
import {get_current_patient_report} from "./services";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaProcedures,
  FaVial,
  FaFileInvoice,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";

const Patient = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Appointments");
  const [patientData, setpatientData] = useState({});
  const [patientReports, setPatientReports] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);

      // Fetch patient data
      get_current_patient(token)
        .then((data) => setpatientData(data.data.doctorProfile))
        .catch((e) => alert("Something went wrong while fetching patient data"));

      // Fetch patient reports
      get_current_patient_report(token)
      .then((reports) => setPatientReports(reports.data)) // Access the "data" array
      .catch((e) => alert("Something went wrong while fetching reports"));
    }
  }, []);

  const handleBookAppointmentClick = () => {
    navigate("/doctors"); // Redirect to /doctors
  };

  
  return (
    <div className={styles.patientContainer}>
      <SubNavbar />
      <Navbar />
      <div className={styles.header}>
        <button 
          className={styles.bookAppointmentBtn}
          onClick={handleBookAppointmentClick} // Add onClick event
        >
          Book Appointment
        </button>
      </div>

      <div className={styles.mainContent}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.profileCard}>
            <div className={styles.profileCardHeader}>
              <FaEdit className={styles.editIcon} />
            </div>
            <div className={styles.profileImageContainer}>
              <img src="https://via.placeholder.com/150" alt="Jane Moore" className={styles.profileImageLarge} />
              <h2 className={styles.profileName}>{patientData.title} {patientData.fName} {patientData.lName}</h2>
            </div>
            <div className={styles.contactDetails}>
              <p><FaPhoneAlt className={styles.icon} /> {patientData.phone} </p>
              <p><FaEnvelope className={styles.icon} /> {patientData.email} </p>
              <p><FaMapMarkerAlt className={styles.icon} /> {patientData.district}, {patientData.city}, {patientData.gov} </p>
            </div>
          </div>

          <div className={styles.labResultsCard}>
            
          <div>
            <h3>Patient Reports</h3>
            <ul>
              {patientReports.map((report) => (
                <li key={report._id}>
                  <strong>{report.name}</strong>: 
                  <a href={report.data} target="_blank" rel="noopener noreferrer">
                    View Report
                  </a>
                  {report.notes && (
                    <p className={styles.indentedNotes}>
                      Notes: {report.notes}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          {/* Overview Section */}
          <div className={styles.overviewCard}>
            <h3>Overview:</h3>
            <div className={styles.overviewDetails}>
              <div className={styles.overviewRow}>
                <div className={styles.overviewItem}>
                  <span className={styles.label}>Gender:</span>
                  <span className={styles.valueLarge}> {patientData.gender} </span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.label}>Date of Birth:</span>
                  <span className={styles.valueLarge}>{patientData.dateOfBirth}</span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.label}>Allergies:</span>
                  <span className={styles.valueLarge}> {patientData.allergies} </span>
                </div>
              </div>
              <div className={styles.overviewRow}>
                <div className={styles.overviewItem}>
                  <span className={styles.label}>Blood Type:</span>
                  <span className={styles.valueLarge}> {patientData.bloodType} </span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.label}>Total Visits:</span>
                  <span className={styles.valueLarge}>{patientData.totalVisits}</span>
                </div>
                <div className={styles.overviewItem}>
                  <span className={styles.label}>Next Visit:</span>
                  <span className={styles.valueLarge}>09/12/2020</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtonsCard}>
            <div className={styles.actionButtons}>
              <button onClick={() => setActiveTab('Appointments')}>
                <FaCalendarAlt className={styles.icon} /> Appointments
              </button>
              <button onClick={() => setActiveTab('Doctors')}>
                <FaUserMd className={styles.icon} /> Doctors
              </button>
              <button onClick={() => setActiveTab('Treatment')}>
                <FaProcedures className={styles.icon} /> Treatment
              </button>
              <button onClick={() => setActiveTab('Tests')}>
                <FaVial className={styles.icon} /> Tests & Lab Results
              </button>
              <button onClick={() => setActiveTab('Billing')}>
                <FaFileInvoice className={styles.icon} /> Billing
              </button>
            </div>

            {/* Conditional Tables */}
            <div className={styles.tabContent}>
              {activeTab === 'Appointments' && (
                <div className={styles.tableContainer}>
                  <h4>Appointments Table</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>09:00</td>
                        <td>Dr. Smith</td>
                        <td>Details</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'Doctors' && (
                <div className={styles.tableContainer}>
                  <h4>Doctors Table</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Specialty</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dr. John Doe</td>
                        <td>Cardiology</td>
                        <td>01980 123456</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'Treatment' && (
                <div className={styles.tableContainer}>
                  <h4>Treatment Table</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Treatment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Blood Test</td>
                        <td>Pending</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'Tests' && (
                <div className={styles.tableContainer}>
                  <h4>Tests & Lab Results Table</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Test</th>
                        <th>Results</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Blood Test</td>
                        <td>Normal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'Billing' && (
                <div className={styles.tableContainer}>
                  <h4>Billing Table</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Consultation</td>
                        <td>$100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
