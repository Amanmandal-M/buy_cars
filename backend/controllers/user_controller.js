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
      return res.status(400).send(errorResponse(400, "Enter all Fields First"));
    };
    
    const ifExist = await userModel.findOne({email});

    if (ifExist) {
      return res.status(409).send(errorResponse(409, "User already exists"));
    };

    const hashing_password = await bcrypt.hash(password, 10);

    const user_creating = new userModel ({
      name,
      email,
      password: hashing_password,
      role,
      contactNumber
    });

    await user_creating.save();

    return res.status(200).json(successResponse(200, 'User Registered Successfully' ,user_creating));

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

exports.forgotOtpController = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error Forgot OTP",
      })
    );
    res.status(500).send(errorResponse(500, error_message, error.message));
  }
}

exports.forgotPasswordController = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error Forgot Password",
      })
    );
    res.status(500).send(errorResponse(500, error_message, error.message));
  }
}
