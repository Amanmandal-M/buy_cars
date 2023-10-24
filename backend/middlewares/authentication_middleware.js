const jwt = require("jsonwebtoken");
const colors = require("colors");

// Static Error Message
const error_message = "Internal Server Error";

// Token Key
const token_key = process.env.SECRET_KEY_NORMAL;

// Success and error Location
const { errorResponse } = require("../helpers/success_and_error");

exports.auth_middleware = async (req, res, next) => {
  try {
    const bearerToken = req.header("authorization");

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(401).json(errorResponse(401, "Unauthorized", "Bearer of the token is not defined"));
    }

    const token = bearerToken.split(" ")[1];

    jwt.verify(token, token_key, (err, decoded) => {
      if (err) {
        return res.status(401).json(errorResponse(401, "Invalid Token", err.message));
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error in authentication middleware",
      })
    );
    return res.status(500).json(errorResponse(500, error_message, error.message));
  }
};
