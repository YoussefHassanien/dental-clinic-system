const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const dbconnection = require("./config/database");
const globalError = require("./middlewares/errorMiddleware");

//routes
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoute");
const serviceRoute = require("./routes/serviceRoutes");
const supplierRoute = require("./routes/supplierRoute");
const walletRoute = require("./routes/walletRoute");
const patientRoute = require("./routes/patientRoute");

// database configuration
dbconnection();

//express app
const app = express();

//middleware
app.use(express.json());

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
app.use("/api/v1/patient", patientRoute);

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
