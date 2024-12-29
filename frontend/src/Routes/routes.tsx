import HomePage from "../Pages/Home/homePage";
import ContactPage from "../Pages/Contact/contactPage";
import ServicesPage from "../Pages/Services/servicesPage";
import DoctorsPage from "../Pages/Doctors/doctorsPage";
import DoctorProfilePage from "../Pages/DoctorProfile/doctorsProfile";
import LoginPage from "../Pages/Login/loginPage";
import RegisterPage from "../Pages/Register/registerPage";
import ProtectedRoute from "./routeProtection";
import Patient from "../Pages/PatientProfile/Patient";
import Admin from "../Pages/Admin/Admin";
import PatientsTable from "../Pages/Admin/PatientsTable";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    name: "Home",
  },
  {
    path: "/contact",
    element: <ContactPage />,
    name: "Contact",
  },
  {
    path: "/services",
    element: <ServicesPage />,
    name: "Services",
  },
  {
    path: "/doctors",
    element: <DoctorsPage />,
    name: "Doctors",
  },
  {
    path: "/doctor-profile",
    element: (
      <ProtectedRoute requiredRole="doctor">
        <DoctorProfilePage />
      </ProtectedRoute>
    ),
    name: "Doctor Profile",
  },
  {
    path: "/login",
    element: <LoginPage />,
    name: "Login",
  },
  {
    path: "/register",
    element: <RegisterPage />,
    name: "Register",
  },
  {
    path: "/patient-profile",
    element: (
      <ProtectedRoute requiredRole="patient">
        <Patient />
      </ProtectedRoute>
    ),
    name: "Patient Profile",
  },
  {
    path: "/admin",
    element: <Admin />,
    name: "Admin",
  },

  {
    path: "/patientsTable",
    element: <PatientsTable />,
    name: "PatientsTable",
  },
];
