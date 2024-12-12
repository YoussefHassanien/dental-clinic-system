import HomePage from "../Pages/Home/homePage";
import AboutPage from "../Pages/About/aboutPage";
import ContactPage from "../Pages/Contact/contactPage";
import ServicesPage from "../Pages/Services/servicesPage";
import DoctorsPage from "../Pages/Doctors/doctorsPage";
import DoctorProfilePage from "../Pages/DoctorProfile/doctorsProfile"; // Import the doctor profile page

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    name: "Home",
  },
  {
    path: "/about",
    element: <AboutPage />,
    name: "About",
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
    path: "/doctor", 
    element: <DoctorProfilePage />,
    name: "Doctor Profile",
  },
];
