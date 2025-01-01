# Dental Clinic System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contribution Guidelines](#contribution-guidelines)

## Introduction

The Dental Clinic System is a comprehensive web application designed to manage the operations of a dental clinic. It offers features like secure patient and staff authentication, appointment booking, patient record management, and real-time doctor availability. The goal is to streamline clinic workflows while enhancing the patient experience.

## Features

- **User Authentication**: Secure login and registration for patients and staff, with password protection.
- **Chat Bot**: Provides concise answers to user inquiries.
- **Contact Us**: Users can send messages through a contact form, receiving confirmation emails in response.
- **Appointment Management**:
  - Patients can book, view, and cancel appointments.
  - Payments can be made using cash or wallet credits.
  - Receptionists can assist with offline bookings.
- **Doctor Management**:
  - View doctor profiles, availability, and specialties.
  - Doctors can manage patient records and upload/view DICOM files.
  - Request missing materials directly from the admin.
- **Admin Dashboard**:
  - Track website statistics and user activity.
  - Manage system users and clinic resources.
- **Notifications**: Receive alerts for upcoming appointments and system updates.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: Context API, useReducer
- **Additional Tools**:
  - **Nodemailer**: For email notifications.
  - **Multer**: For file uploads (e.g., DICOM files).
  - **Payment Integration**: Wallet-based or cash payments.

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Clone the Repository

```bash
git clone https://github.com/omarrrefaatt/dental-clinic-system.git
cd dental-clinic-system
```

### Configure Environment Variables

Create a `.env` file in the `backend` directory and define the following variables:

```env
PORT=3000
NODE_ENV=development

# database
DB_PASS=<Your MongoDB Password>
DB_USER=<Your MongoDB Username>
DB_NAME=<Your MongoDB Database Name>

DB_URI=<Your MongoDB URI>


#jwt
JWT_SECRET_KEY = <Your JWT Secret Key>
JWT_EXPIRE_TIME = <Your JWT Expiration Date>
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Run the Backend Server

```bash
npm run start:dev
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Run the Frontend Server

```bash
npm run dev
```

### Notes

- Ensure both the backend and frontend servers are running simultaneously.
- The default ports are `5000` for the backend and `3000` for the frontend (configurable in `.env` and `vite.config.ts`).

## Usage

### Booking an Appointment

1. Register or log in to your account.
2. Navigate to the "Doctors" page.
3. Select a doctor and view their availability.
4. Choose your payment method (Cash or Wallet).
5. Book an appointment by selecting a date and time.

### Managing Patient Records

1. Log in as a Doctor.
2. View and manage patient records and history.
3. Upload and view DICOM files if necessary.

### Managing Today's Appointments

1. Log in as a Receptionist.
2. View and manage today's appointments.
3. Book an offline appointment by taking the patient's email and selecting an available doctor.

### Admin Dashboard

1. Log in as an Admin.
2. View comprehensive statistics, including appointment trends and user activity.
3. Manage system resources and users.

## Project Structure

### backend

```bash
├── config/
│   ├── database.js
├── data/
│   ├── document.json
├── middlewares/
│   ├── errorMiddleware.js
│   ├── uploadImageMiddleware.js
│   └── ...
├── models/
│   ├── appointmentModel.js
│   ├── doctorModel.js
│   ├── patientModel.js
│   ├── userModel.js
│   └── ...
├── routes/
│   ├── appointmentRoutes.js
│   ├── authRoutes.js
│   ├── doctorRoutes.js
│   ├── patientRoutes.js
│   └── ...
├── services/
│   ├── appointmentService.js
│   ├── authService.js
│   └── ...
├── utils/
│   └── validators/
│       ├── appointmentValidator.js
│       ├── authValidator.js
│       └── ...
│   ├── apiError.js
│   ├── apiFeatures.js
│   └── ...
├── .gitignore
├── config.env
├── package-lock.json
├── package.json
├── server.js
└── ...
```

### frontend

```bash
├── public/
│   ├── uploads/
│       ├── doctors/
│       ├── documents/
│       └── users/
├── src/
│   ├── assets/
│   ├── Common/
│   │   ├── Components/
│   │   │   ├── Button/
│   │   │       ├── button.module.css
│   │   │       └── button.tsx
│   │   │   ├── Error-Message/
│   │   │       └── errorMessage.tsx
│   │   │   ├── Footer/
│   │   │       ├── constants.ts
│   │   │       └── footer.tsx
│   │   │   └── ...
│   │   ├── Contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── AuthHook.tsx
│   │   │   └── AuthProvider.tsx
│   ├── Pages/
│   │   ├── Home/
│   │       └── Components/
│   │           ├── Carousel/
│   │               ├── carousel.tsx
│   │               └── constants.ts
│   │           ├── Section-Background/
│   │               └── sectionBackground.tsx
│   │           └── ...
│   │   │   ├── HomePage.tsx
│   │   │   └── constants.ts
│   │   ├── Doctors/
│   │   │   ├── doctorsPage.tsx
│   │   │   ├── constants.ts
│   │   │   └── services.ts
│   │   ├── Contact/
│   │   │   ├── ContactPage.tsx
│   │   │   └── services.ts
│   │   └── ...
│   ├── Routes/
│   │   ├── routeProtection.tsx
│   │   └── routes.tsx
│   ├── Utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── ...
```

## Contribution Guidelines

We welcome contributions to the Dental Clinic System! To contribute:

1. Fork the repository and create your feature branch.
2. Make your changes and ensure the code follows the project's style guidelines.
3. Test your changes thoroughly.
4. Submit a pull request with a clear description of your changes.
