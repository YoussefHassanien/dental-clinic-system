const ApiError = require("../utils/apiError");

const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleSignatureError = () =>
  new ApiError("Invalid token, please login agian..", 401);
const handleExpirationError = () =>
  new ApiError("Expired token, please login agian..", 401);
const globalError = (err, req, res, next) => {
  // Ensure no multiple responses
  if (res.headersSent) {
    return next(err); // Pass to default error handler if headers are already sent
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") err = handleSignatureError();
    if (err.name === "TokenExpiredError") err = handleExpirationError();
    sendErrorForProd(err, res);
  }
};

module.exports = globalError;
