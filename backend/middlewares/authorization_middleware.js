const colors = require("colors");
const { userModel } = require("../models/user_model");

// Static Error Message
const error_message = "Internal Server Error";

// Success and error Location
const {
  errorResponse
} = require("../helpers/success_and_error");

exports.authorization_middleware = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Fetch user details based on userId from request
      const user = await userModel.findById(req.userId);

      if (!user) {
        return res
          .status(401)
          .json(
            errorResponse(
              401,
              "User not found",
              "User not found with the provided userId."
            )
          );
      }

      // Check if the user's role is allowed
      if (!allowedRoles.includes(user.role) && user.role !== "admin" && user.role !== "dealer") {
        return res
          .status(403)
          .json(
            errorResponse(
              403,
              "Forbidden",
              "You do not have permission to access this resource."
            )
          );
      }

      // Attach user details to the request object
      req.user = user;
      next();
    } catch (error) {
      console.log(
        colors.red({
          error_message: error.message,
          message: "Error in authorization middleware",
        })
      );
      res.status(500).json(errorResponse(500, error_message, error.message));
    }
  };
};
