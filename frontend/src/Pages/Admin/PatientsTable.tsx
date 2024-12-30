import React, { useState } from 'react';
import styles from './PatientsTable.module.css';
import {
  Search,
  UserPlus,
  Calendar,
  Mail,
  Phone,
  Clock,
  Activity,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PatientsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const patients = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      doctor: 'Dr. Sarah Johnson',
      department: 'Orthodontics',
      appointment: '2024-07-15 10:00 AM',
      status: 'Scheduled',
      condition: 'Braces Consultation',
      lastVisit: '2024-06-01',
      age: 45,
      gender: 'Male'
    },
    {
      id: 2,
      name: 'Emily Brown',
      email: 'emily.b@email.com',
      phone: '+1 (555) 234-5678',
      doctor: 'Dr. Michael Chen',
      department: 'Endodontics',
      appointment: '2024-07-16 2:30 PM',
      status: 'Completed',
      condition: 'Root Canal Treatment',
      lastVisit: '2024-05-15',
      age: 32,
      gender: 'Female'
    },
    {
      id: 3,
      name: 'Robert Davis',
      email: 'robert.d@email.com',
      phone: '+1 (555) 345-6789',
      doctor: 'Dr. Lisa Wong',
      department: 'Prosthodontics',
      appointment: '2024-07-17 11:15 AM',
      status: 'Cancelled',
      condition: 'Dental Crown Fitting',
      lastVisit: '2024-06-10',
      age: 58,
      gender: 'Male'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      phone: '+1 (555) 456-7890',
      doctor: 'Dr. James Miller',
      department: 'Periodontics',
      appointment: '2024-07-18 9:45 AM',
      status: 'Scheduled',
      condition: 'Gum Disease Treatment',
      lastVisit: '2024-06-05',
      age: 29,
      gender: 'Female'
    },
    {
      id: 5,
      name: 'Alice Carter',
      email: 'alice.c@email.com',
      phone: '+1 (555) 567-8901',
      doctor: 'Dr. Sarah Johnson',
      department: 'General Dentistry',
      appointment: '2024-07-19 1:30 PM',
      status: 'Scheduled',
      condition: 'Teeth Cleaning',
      lastVisit: '2024-05-30',
      age: 37,
      gender: 'Female'
    },
    {
      id: 6,
      name: 'James Taylor',
      email: 'james.t@email.com',
      phone: '+1 (555) 678-9012',
      doctor: 'Dr. Michael Chen',
      department: 'Oral Surgery',
      appointment: '2024-07-20 11:00 AM',
      status: 'Completed',
      condition: 'Wisdom Tooth Extraction',
      lastVisit: '2024-05-20',
      age: 50,
      gender: 'Male'
    },
    {
      id: 7,
      name: 'Laura Martinez',
      email: 'laura.m@email.com',
      phone: '+1 (555) 789-0123',
      doctor: 'Dr. Lisa Wong',
      department: 'Cosmetic Dentistry',
      appointment: '2024-07-21 3:00 PM',
      status: 'Scheduled',
      condition: 'Teeth Whitening',
      lastVisit: '2024-06-12',
      age: 40,
      gender: 'Female'
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1>Patients Management</h1>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search patients..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className={styles.addButton}>
            <UserPlus className="h-4 w-4" />
            Add Patient
          </button>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.idColumn}>ID</th>
              <th className={styles.nameColumn}>Patient Info</th>
              <th className={styles.contactColumn}>Contact</th>
              <th className={styles.doctorColumn}>Doctor</th>
              <th className={styles.appointmentColumn}>Appointment</th>
              <th className={styles.statusColumn}>Status</th>
              <th className={styles.conditionColumn}>Condition</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className={styles.idColumn}>
                  #{patient.id.toString().padStart(4, '0')}
                </td>
                <td className={styles.nameColumn}>
                  <div className={styles.patientInfo}>
                    <span className={styles.patientName}>{patient.name}</span>
                    <span className={styles.patientMeta}>
                      {patient.age} yrs • {patient.gender}
                    </span>
                  </div>
                </td>
                <td className={styles.contactColumn}>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                      <Mail className="h-3 w-3" />
                      {patient.email}
                    </div>
                    <div className={styles.contactItem}>
                      <Phone className="h-3 w-3" />
                      {patient.phone}
                    </div>
                  </div>
                </td>
                <td className={styles.doctorColumn}>
                  <div className={styles.doctorInfo}>
                    <span className={styles.doctorName}>{patient.doctor}</span>
                    <span className={styles.department}>{patient.department}</span>
                  </div>
                </td>
                <td className={styles.appointmentColumn}>
                  <div className={styles.appointmentInfo}>
                    <div className={styles.appointmentDate}>
                      <Calendar className="h-3 w-3" />
                      <span>{patient.appointment}</span>
                    </div>
                    <div className={styles.lastVisit}>
                      <Clock className="h-3 w-3" />
                      Last visit: {patient.lastVisit}
                    </div>
                  </div>
                </td>
                <td className={styles.statusColumn}>
                  <span className={`${styles.status} ${styles[patient.status.toLowerCase()]}`}>
                    {patient.status}
                  </span>
                </td>
                <td className={styles.conditionColumn}>
                  <div className={styles.condition}>
                    <Activity className="h-4 w-4" />
                    {patient.condition}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsTable;
