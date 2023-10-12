const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const colors = require("colors");
require("dotenv").config();

// Model Location
const { userModel } = require("../models/user_model");

// Success and error Location
const {
  errorResponse,
  successResponse,
} = require("../helpers/success_and_error");

// Static Error Message
const error_message = "Internal Server Error";

exports.createUserController = async (req, res) => {
  try {
    const { name, email, password, contactNumber, role } = req.body;

    if (!name || !email || !password || !role || !contactNumber) {
      return res.status(400).send(errorResponse(400, "Enter all Fields"));
    }
    
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error creating user",
      })
    );
    res.status(500).send(errorResponse(500, error.message, error.message));
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error login user",
      })
    );
    res.status(500).send(errorResponse(500, error_message, error.message));
  }
};
