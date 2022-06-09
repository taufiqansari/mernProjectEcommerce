const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mogodb Id Error
  if (err.name === "CastError") {
    const message = `Resource not found.Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //  Mongoose duplicate key error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.key(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonwebTokenError") {
    const message = `Json Web Token is invalid ,try again`;
    err = new ErrorHandler(message, 400);
  }
  // JWT Expire error
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token is Expire ,try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
