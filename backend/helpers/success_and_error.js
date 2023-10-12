// Success and Error Format

exports.errorResponse = (status, message) => {
  return {
    status,
    success: false,
    message,
  };
};

exports.successResponse = (statusCode, message, data) => {
  return {
    statusCode,
    success: true,
    message,
    data,
  };
};
