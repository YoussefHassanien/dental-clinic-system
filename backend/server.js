const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const dbconnection = require("./config/database");
const globalError = require("./middlewares/errorMiddleware");
const cors = require("cors");

//routes
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoute");
const serviceRoute = require("./routes/serviceRoutes");
const supplierRoute = require("./routes/supplierRoute");
const walletRoute = require("./routes/walletRoute");
const patientRoute = require("./routes/patientRoute");
const feedbackRoute = require("./routes/feedbackRoute");
const materialRoute = require("./routes/materialRoute");
const doctorRoute = require("./routes/doctorRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const documentRoute = require("./routes/documnetRoute");
const requestRoute = require("./routes/requestRoute");
const statisticsRoute = require("./routes/statisticsRoute");
const chatbotRoute = require("./routes/chatbotRoute");
const contactusRoute = require("./routes/contactusRoute");
const treatmentplanRoute = require("./routes/treatmentplanRoute");
const reseptionistRoute = require("./routes/reseptionistRoute");
// database configuration
dbconnection();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// mount routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/wallet", walletRoute);
app.use("/api/v1/patients", patientRoute);
app.use("/api/v1/feedback", feedbackRoute);
app.use("/api/v1/material", materialRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/appointments", appointmentRoute);
app.use("/api/v1/documents", documentRoute);
app.use("/api/v1/requests", requestRoute);
app.use("/api/v1/statistics", statisticsRoute);
app.use("/api/v1/chatbot", chatbotRoute);
app.use("/api/v1/contactus", contactusRoute);
app.use("/api/v1/treatmentplans", treatmentplanRoute);
app.use("/api/v1/reseptionist", reseptionistRoute);

// handle unvalid routes
app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Handle rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(
    ` unhandled Error: ${err.name} | ${err.message} | ${err.stack}`
  );
  server.close(() => {
    console.error("shutting down..... ");
    process.exit(1);
  });
});
