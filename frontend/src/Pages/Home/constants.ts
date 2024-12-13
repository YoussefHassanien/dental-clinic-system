import firstPatientImage from "../../assets/smile.jpg";
import secondPatientImage from "../../assets/smile2.jpg";
import thirdPatientImage from "../../assets/smile3.jpg";
import whoWeAreImage from "../../assets/dental-care.jpg";
import founderImage1 from "../../assets/founder1.jpg";
import founderImage2 from "../../assets/founder2.jpg";

export const infoCardsData = [
  {
    title: "Patients' Feedback",
    paragraph:
      "Hear from our satisfied patients about their experiences and the exceptional care they received at our clinic.",
    buttonText: "Learn More",
    icon: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z",
    buttonRedirectPath: "#patientsFeedback",
  },
  {
    title: "About Us",
    paragraph:
      "At clinic, we are dedicated to providing top-notch dental services with a focus on patient comfort and satisfaction.",
    buttonText: "Learn More",
    icon: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25",
    buttonRedirectPath: "#whoWeAre",
  },
  {
    title: "Opening Hours",
    paragraph: `Sunday - Thursday: 10:00 AM - 10:00 PM\nFriday: 2:00 PM - 8:00 PM\nSaturday: 11:00 AM - 9:00 PM`,
    buttonText: "Learn More",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    buttonRedirectPath: "",
  },
];

export const testimonialsData = [
  {
    headerText: "Elizabeth Smith",
    subText1:
      "I had an amazing experience at this dental clinic. The staff was incredibly friendly and professional.",
    subText2:
      "The dentist took the time to explain every procedure and made sure I was comfortable throughout the entire process.",
    subText3:
      "I highly recommend this clinic to anyone looking for top-notch dental care. My smile has never looked better!",
    imageSrc: firstPatientImage,
  },
  {
    headerText: "Jamie Antoine",
    subText1:
      "I had an amazing experience at this dental clinic. The staff was incredibly friendly and professional.",
    subText2:
      "The dentist took the time to explain every procedure and made sure I was comfortable throughout the entire process.",
    subText3:
      "I highly recommend this clinic to anyone looking for top-notch dental care. My smile has never looked better!",
    imageSrc: secondPatientImage,
  },
  {
    headerText: "Marcos Silva",
    subText1:
      "I had an amazing experience at this dental clinic. The staff was incredibly friendly and professional.",
    subText2:
      "The dentist took the time to explain every procedure and made sure I was comfortable throughout the entire process.",
    subText3:
      "I highly recommend this clinic to anyone looking for top-notch dental care. My smile has never looked better!",
    imageSrc: thirdPatientImage,
  },
];

export const statisticsData = [
  {
    number: 167,
    text: "Clinics World Wide",
    iconPath:
      "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  },
  {
    number: 960,
    text: "Qualified Doctors",
    iconPath:
      "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
  },
  {
    number: 6000,
    text: "Satisfied Patients",
    iconPath:
      "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
  },
  {
    number: 32,
    text: "Years of Experience",
    iconPath:
      "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5",
  },
];

export const sectionContentData = [
  {
    headerText: "Who Are We",
    subText1:
      "At our dental care clinic, we are committed to providing exceptional dental services with a focus on patient comfort and satisfaction. Our team of experienced professionals is dedicated to ensuring that every visit is a positive experience.",
    subText2:
      "We utilize the latest technology and techniques to offer a wide range of dental treatments, from routine cleanings and check-ups to advanced cosmetic and restorative procedures. Our goal is to help you achieve and maintain a healthy, beautiful smile.",
    subText3:
      "Our clinic is designed to create a welcoming and relaxing environment, where you can feel at ease during your dental visits. We believe in building long-term relationships with our patients, based on trust, transparency, and personalized care.",
    imageSrc: whoWeAreImage,
  },
];

export const coFoundersData = [
  {
    name: "Youssef Hassanien",
    title: "CEO",
    description:
      "Youssef is a highly skilled Biomedical Engineer with a passion for healthcare data analytics. He is committed to providing exceptional software solutions that enhance patient care and satisfaction.",
    imageSrc: founderImage1,
  },
  {
    name: "Sarah Johnson",
    title: "CTO",
    description:
      "Sarah is an experienced Software Engineer with expertise in developing innovative healthcare solutions. She is dedicated to improving patient outcomes through technology.",
    imageSrc: founderImage2,
  },
  {
    name: "Michael Brown",
    title: "CFO",
    description:
      "Michael is a financial expert with a strong background in healthcare finance. He ensures the financial stability and growth of DentiPlus Clinics.",
    imageSrc: founderImage1,
  },
  {
    name: "Emily Davis",
    title: "COO",
    description:
      "Emily is an operations specialist with extensive experience in healthcare management. She oversees the day-to-day operations of DentiPlus Clinics.",
    imageSrc: founderImage2,
  },
  {
    name: "David Wilson",
    title: "CMO",
    description:
      "David is a marketing professional with a focus on healthcare marketing strategies. He is responsible for promoting DentiPlus Clinics and attracting new patients.",
    imageSrc: founderImage1,
  },
  {
    name: "Jessica Lee",
    title: "CIO",
    description:
      "Jessica is an IT expert with a background in healthcare information systems. She manages the technology infrastructure of DentiPlus Clinics.",
    imageSrc: founderImage2,
  },
];
