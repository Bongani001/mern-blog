exports.invalidPathHandler = (req, res, next) => {
  const error = new Error("Invalid Path.");
  error.status = 404;
  next(error);
};

exports.errorResponseHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    message: err.message,
  });
};
