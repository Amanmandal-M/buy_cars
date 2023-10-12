// Success and Error Format

exports.errorResponse = (status_code, message, error) => {
  return {
    status_code,
    success: false,
    message,
    error,
  };
};

exports.successResponse = (status_code, message, data) => {
  return {
    status_code,
    success: true,
    message,
    data,
  };
};
