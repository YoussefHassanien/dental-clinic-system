import { useState } from "react";
import styles from "./Patient.module.css"; // Import the CSS module
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
  const [activeTab, setActiveTab] = useState("Appointments");

  return (
    <div className={styles.patientContainer}>
      {" "}
      {/* Apply CSS module class */}
      <div className={styles.header}>
        <FaArrowLeft className={styles.backIcon} />
        <h1 className={styles.patientProfileHeading}>Patient Profile</h1>
        <button className={styles.bookAppointmentBtn}>Book Appointment</button>
      </div>
      <div className={styles.mainContent}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.profileCard}>
            <div className={styles.profileCardHeader}>
              <FaEdit className={styles.editIcon} />
            </div>
            <div className={styles.profileImageContainer}>
              <img
                src="https://via.placeholder.com/150"
                alt="Jane Moore"
                className={styles.profileImageLarge}
              />
              <h2 className={styles.profileName}>Ms. Jane Moore</h2>
            </div>
            <div className={styles.contactDetails}>
              <p>
                <FaPhoneAlt className={styles.icon} /> 07123 456789
              </p>
              <p>
                <FaEnvelope className={styles.icon} /> jane.moore@hello.com
              </p>
              <p>
                <FaMapMarkerAlt className={styles.icon} /> 15 Trevelyan Avenue,
                London
              </p>
            </div>
          </div>

          {/* Latest Lab Results */}
          <div className={styles.labResultsCard}>
            <h3>Latest Lab Results:</h3>
            <ul>
              <li>📄 XYV Blood Tests</li>
              <li>📄 Blood Tests XYZ</li>
            </ul>
            <button className={styles.uploadFilesBtn}>Upload Files</button>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          {/* Overview Section */}
          <div className={styles.overviewCard}>
            <h3>Overview:</h3>
            <div className={styles.overviewDetails}>
              <div className={styles.overviewRowWrapper}>
                <div className={styles.overviewRow}>
                  <div>
                    <span className={styles.label}>Gender:</span>
                  </div>
                  <div>
                    <span className={styles.valueLarge}>Female</span>
                  </div>
                </div>
                <div className={styles.overviewRow}>
                  <div>
                    <span className={styles.label}>Date of Birth:</span>
                  </div>
                  <div>
                    <span className={styles.valueLarge}>10/03/1987</span>
                  </div>
                </div>
                <div className={styles.overviewRow}>
                  <div>
                    <span className={styles.label}>Allergies:</span>
                  </div>
                  <div>
                    <span className={styles.valueLarge}>
                      Hayfever, crayfish
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.overviewRowWrapper}>
                <div className={styles.overviewRow}>
                  <div>
                    <span className={styles.label}>Blood Type:</span>
                  </div>
                  <div>
                    <span className={styles.valueLarge}>B+</span>
                  </div>
                </div>
                <div className={styles.overviewRow}>
                  <div>
                    <span className={styles.label}>Previous Visit:</span>
                  </div>
                  <div>
                    <span className={styles.valueLarge}>25/11/2020</span>
                  </div>
                </div>
                <div className={styles.overviewRow}>
                  <div>
                    <span className={styles.label}>Next Visit:</span>
                  </div>
                  <div>
                    <span className={styles.valueLarge}>09/12/2020</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtonsCard}>
            <div className={styles.actionButtons}>
              <button onClick={() => setActiveTab("Appointments")}>
                <FaCalendarAlt className={styles.icon} /> Appointments
              </button>
              <button onClick={() => setActiveTab("Doctors")}>
                <FaUserMd className={styles.icon} /> Doctors
              </button>
              <button onClick={() => setActiveTab("Treatment")}>
                <FaProcedures className={styles.icon} /> Treatment
              </button>
              <button onClick={() => setActiveTab("Tests")}>
                <FaVial className={styles.icon} /> Tests & Lab Results
              </button>
              <button onClick={() => setActiveTab("Billing")}>
                <FaFileInvoice className={styles.icon} /> Billing
              </button>
            </div>

            {/* Conditional Tables */}
            <div className={styles.tabContent}>
              {activeTab === "Appointments" && (
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
              {activeTab === "Doctors" && (
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
              {activeTab === "Treatment" && (
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
              {activeTab === "Tests" && (
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
              {activeTab === "Billing" && (
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
