import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from "../../Common/Components/Navbar/navbar";
import SubNavbar from "../../Common/Components/Sub-Navbar/subNavbar";
import styles from './Admin.module.css';
import { DollarSign, Users, Stethoscope, Calendar, ChevronRight, UserPlus, Trash2, User2, Phone, Mail, GraduationCap, Clock, Package2, Building, MapPin, Package, AlertCircle, CalendarClock } from 'lucide-react';


const AdminPage = () => {
  const mockVisitorData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
    { name: 'Thu', value: 400 },
    { name: 'Fri', value: 500 },
    { name: 'Sat', value: 350 },
    { name: 'Sun', value: 450 },
  ];

  const mockRecoveryData = [
    { name: 'Mon', value: 300 },
    { name: 'Tue', value: 400 },
    { name: 'Wed', value: 350 },
    { name: 'Thu', value: 500 },
    { name: 'Fri', value: 450 },
    { name: 'Sat', value: 400 },
    { name: 'Sun', value: 470 },
  ];

  const bestDoctors = [
    { name: 'Dr. Sarah', img: '/api/placeholder/64/64', specialty: 'Dentist' },
    { name: 'Dr. John', img: '/api/placeholder/64/64', specialty: 'Surgeon' },
    { name: 'Dr. Emily', img: '/api/placeholder/64/64', specialty: 'Orthodontist' },
    { name: 'Dr. Michael', img: '/api/placeholder/64/64', specialty: 'Periodontist' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      specialty: 'General Dentistry',
      phone: '+1 (555) 123-4567',
      email: 'dr.sarah@dentalclinic.com',
      experience: '8 years',
      availability: 'Mon-Fri',
      qualification: 'DDS, University of Michigan'
    },
    {
      id: 2,
      name: 'Dr. John Davis',
      specialty: 'Oral Surgery',
      phone: '+1 (555) 234-5678',
      email: 'dr.john@dentalclinic.com',
      experience: '12 years',
      availability: 'Mon-Thu',
      qualification: 'DMD, Harvard University'
    },
    {
      id: 3,
      name: 'Dr. Emily Wilson',
      specialty: 'Orthodontics',
      phone: '+1 (555) 345-6789',
      email: 'dr.emily@dentalclinic.com',
      experience: '10 years',
      availability: 'Tue-Sat',
      qualification: 'DDS, NYU'
    }
  ];

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

  const suppliers = [
    {
      id: 1,
      name: 'DentalTech Solutions',
      category: 'Dental Equipment',
      phone: '+1 (555) 123-4567',
      email: 'sales@dentaltech.com',
      location: 'New York, NY',
      lastOrderDate: '2024-12-15',
      totalSpend: 45000,
    },
    {
      id: 2,
      name: 'SmileCare Supplies',
      category: 'Orthodontic Supplies',
      phone: '+1 (555) 234-5678',
      email: 'orders@smilecare.com',
      location: 'Los Angeles, CA',
      lastOrderDate: '2024-11-20',
      totalSpend: 32000,
    },
    {
      id: 3,
      name: 'ProDental Innovations',
      category: 'Prosthetics & Crowns',
      phone: '+1 (555) 345-6789',
      email: 'contact@prodental.com',
      location: 'Chicago, IL',
      lastOrderDate: '2024-10-10',
      totalSpend: 27000,
    },
  ];

  const supplyRequests = [
    {
      id: 1,
      supplier: 'DentalTech Solutions',
      item: 'Dental Chairs',
      quantity: 5,
      requestDate: '2024-12-01',
      status: 'Pending',
    },
    {
      id: 2,
      supplier: 'SmileCare Supplies',
      item: 'Brackets and Wires',
      quantity: 100,
      requestDate: '2024-11-28',
      status: 'Approved',
    },
    {
      id: 3,
      supplier: 'ProDental Innovations',
      item: 'Crown Materials',
      quantity: 20,
      requestDate: '2024-11-25',
      status: 'Delivered',
    },
  ];
  
  
  

  const handleDelete = (id) => {
    console.log('Deleting doctor with id:', id);
  };

  const handleAdd = () => {
    console.log('Adding new doctor');
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
  };

  return (
    <div className={styles.container}>
      <SubNavbar />
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
          </div>
          <div className={styles.date}>December 2024</div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statsCardBlue}>
            <div className={styles.statsContent}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={24} className="opacity-90" />
                <div className={styles.statsLabel}>Financial Earnings</div>
              </div>
              <div className={styles.statsValue}>$ 800K - 500K</div>
            </div>
          </div>
          <div className={styles.statsCardYellow}>
            <div className={styles.statsContent}>
              <div className="flex items-center gap-2 mb-2">
                <Users size={24} className="opacity-90" />
                <div className={styles.statsLabel}>Total Patients</div>
              </div>
              <div className={styles.statsValue}>600</div>
            </div>
          </div>
          <div className={styles.statsCardRed}>
            <div className={styles.statsContent}>
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope size={24} className="opacity-90" />
                <div className={styles.statsLabel}>Operations</div>
              </div>
              <div className={styles.statsValue}>400</div>
            </div>
          </div>
          <div className={styles.statsCardGreen}>
            <div className={styles.statsContent}>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={24} className="opacity-90" />
                <div className={styles.statsLabel}>Appointments</div>
              </div>
              <div className={styles.statsValue}>80</div>
            </div>
          </div>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.column}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Our Doctors</h2>
                <button className={styles.viewAll}>View all</button>
              </div>
              <div className={styles.doctorsGrid}>
                {bestDoctors.map((doctor, index) => (
                  <div key={index} className={styles.doctorCard}>
                    <img src={doctor.img} alt={doctor.name} className={styles.doctorImage} />
                    <div className={styles.doctorName}>{doctor.name}</div>
                    <div className={styles.doctorSpecialty}>{doctor.specialty}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Patients</h2>
              </div>
              <div className={styles.patientsContent}>
                <div className={styles.patientCircleSection}>
                  <div className={styles.patientCircle}>
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="8"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        strokeDasharray="377"
                        strokeDashoffset="94.25"
                      />
                    </svg>
                    <div className={styles.circleText}>
                      <div className={styles.patientLabel}>Total Patients</div>
                      <div className={styles.patientCount}>784,670</div>
                    </div>
                  </div>
                </div>

                <div className={styles.patientInfoSection}>
                  <div className={styles.patientLegend}>
                    <div className={styles.legendItem}>
                      <div className={`${styles.legendDot} ${styles.legendDotBlue}`}></div>
                      <div className={styles.legendText}>New</div>
                    </div>
                    <div className={styles.legendItem}>
                      <div className={`${styles.legendDot} ${styles.legendDotRed}`}></div>
                      <div className={styles.legendText}>Treatment</div>
                    </div>
                  </div>

                  <div className={styles.navigationButtons}>
                    <button onClick={() => handleNavigation('/patients')} className={styles.navButton}>
                      View Patients
                      <ChevronRight size={16} />
                    </button>
                    <button onClick={() => handleNavigation('/suppliers')} className={styles.navButton}>
                      View Suppliers
                      <ChevronRight size={16} />
                    </button>
                    <button onClick={() => handleNavigation('/supply-requests')} className={styles.navButton}>
                      Supply Requests
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Visitors</h2>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockVisitorData}>
                    <XAxis dataKey="name" stroke="#374151" />
                    <YAxis stroke="#374151" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Recovered</h2>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockRecoveryData}>
                    <XAxis dataKey="name" stroke="#374151" />
                    <YAxis stroke="#374151" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Table */}
        <div className={styles.fullWidthCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleWithIcon}>
              <User2 className={styles.titleIcon} />
              <h2 className={styles.cardTitle}>Staff Directory</h2>
            </div>
            <button onClick={handleAdd} className={styles.addDoctorButton}>
              <UserPlus className={styles.addIcon} />
              Add Doctor
            </button>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.staffTable}>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Specialty</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Availability</th>
                  <th>Qualification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <User2 className={styles.doctorIcon} />
                        {doctor.name}
                      </div>
                    </td>
                    <td>{doctor.specialty}</td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Phone className={styles.contactIcon} />
                        {doctor.phone}
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Mail className={styles.emailIcon} />
                        {doctor.email}
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Clock className={styles.experienceIcon} />
                        {doctor.experience}
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Calendar className={styles.availabilityIcon} />
                        {doctor.availability}
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <GraduationCap className={styles.qualificationIcon} />
                        {doctor.qualification}
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className={styles.deleteButton}
                      >
                        <Trash2 className={styles.deleteIcon} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patients Table */}
        <div className={styles.patientsTableCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleWithIcon}>
              <Users className={styles.titleIcon} />
              <h2 className={styles.cardTitle}>Patients Directory</h2>
            </div>
          </div>
          <div className={styles.patientsTableWrapper}>
            <table className={styles.patientsTable}>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Appointment</th>
                  <th>Status</th>
                  <th>Condition</th>
                  <th>Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <User2 className={styles.doctorIcon} />
                        {patient.name}
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Mail className={styles.emailIcon} />
                        {patient.email}
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Phone className={styles.contactIcon} />
                        {patient.phone}
                      </div>
                    </td>
                    <td>{patient.doctor}</td>
                    <td>{patient.department}</td>
                    <td>{patient.appointment}</td>
                    <td>
                      <span 
                        className={`${styles.statusBadge} ${
                          patient.status === 'Scheduled' 
                            ? styles.statusScheduled 
                            : patient.status === 'Completed'
                            ? styles.statusCompleted
                            : styles.statusCancelled
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td>{patient.condition}</td>
                    <td>{patient.lastVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suppliers Table */}
        <div className={styles.suppliersTableCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleWithIcon}>
              <Building className={styles.titleIcon} />
              <h2 className={styles.cardTitle}>Dental Suppliers Directory</h2>
            </div>
          </div>
          <div className={styles.suppliersTableWrapper}>
            <table className={styles.suppliersTable}>
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Category</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Last Order</th>
                  <th>Total Spend</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Building className={styles.supplierIcon} />
                        {supplier.name}
                      </div>
                    </td>
                    <td>{supplier.category}</td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Phone className={styles.contactIcon} />
                        {supplier.phone}
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <Mail className={styles.emailIcon} />
                        {supplier.email}
                      </div>
                    </td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <MapPin className={styles.locationIcon} />
                        {supplier.location}
                      </div>
                    </td>
                    <td>{supplier.lastOrderDate}</td>
                    <td>
                      <div className={styles.cellWithIcon}>
                        <DollarSign className={styles.moneyIcon} />
                        ${supplier.totalSpend.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Supply Requests Table */}
        <div className={styles.supplyRequestsTableCard}>
          <div className={styles.cardHeader}>
            <div className={styles.titleWithIcon}>
              <Package className={styles.titleIcon} />
              <h2 className={styles.cardTitle}>Supply Requests</h2>
            </div>
          </div>
          <div className={styles.supplyRequestsTableWrapper}>
            <table className={styles.supplyRequestsTable}>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Request Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {supplyRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.supplier}</td>
                    <td>{request.item}</td>
                    <td>{request.quantity}</td>
                    <td>{request.requestDate}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          request.status === 'Pending'
                            ? styles.statusPending
                            : request.status === 'Approved'
                            ? styles.statusApproved
                            : styles.statusDelivered
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPage;