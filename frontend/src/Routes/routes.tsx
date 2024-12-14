import HomePage from "../Pages/Home/homePage";
import ContactPage from "../Pages/Contact/contactPage";
import ServicesPage from "../Pages/Services/servicesPage";
import DoctorsPage from "../Pages/Doctors/doctorsPage";
import DoctorProfilePage from "../Pages/DoctorProfile/doctorsProfile";
import LoginPage from "../Pages/Login/loginPage";

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
    element: <DoctorProfilePage />,
    name: "Doctor Profile",
  },
  {
    path: "/login",
    element: <LoginPage />,
    name: "Login",
  },
];
