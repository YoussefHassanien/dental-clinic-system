// @desc    This class is responsible about predictable errors

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
  }
}

module.exports = ApiError;