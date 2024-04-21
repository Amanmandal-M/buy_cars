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

// OTP Location
const { generateOTPforMail } = require("../helpers/mail_otp_helper");
const {
  generateOTPforMailforForgotPassword,
} = require("../helpers/mail_otp_helper_2");

// Mail Location
const { sendEmail } = require("../helpers/sending_emails");

// Email Template Location
const {
  registerMail,
  loginMail,
  resendOTPMail,
  resendOTPVerifiedMail,
  sendOTPforChangePasswordMail,
  passwordChangedMail,
} = require("../layouts/email_template");

// Static Error Message
const error_message = "Internal Server Error";

// Variables for OTP and for checking purposes 
var verifyMainOtp, mainDataOfUser, verify_otp, verify_otp_for_password_change, current_user, existing_user;

// Create User Controller
exports.createUserController = async (req, res) => {
  try {
    const { name, email, password, contactNumber, role } = req.body;

    if (!name || !email || !password || !role || !contactNumber) {
      return res.status(400).json(errorResponse(400, "Enter all Fields First"));
    }

    const ifExist = await userModel.findOne({ email });

    if (ifExist) {
      return res.status(409).json(errorResponse(409, "User already exists"));
    }

    const hashing_password = await bcrypt.hash(password, 10);

    const user_creating = new userModel({
      name,
      email,
      password: hashing_password,
      role,
      contactNumber,
    });

    await user_creating.save();

    // Sending Email
    sendEmail(registerMail(user_creating));

    return res
      .status(200)
      .json(
        successResponse(200, "User Registered Successfully", user_creating)
      );
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error creating user",
      })
    );
    res.status(500).json(errorResponse(500, error_message, error.message));
  }
};

// Login Controller
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    current_user = user;

    if (!user) {
      return res.status(409).json(errorResponse(409, "User not found"));
    }

    // Check if the provided password matches the stored password hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json(errorResponse(401, "Invalid credentials"));
    }

    // Generate a JWT token for authentication
    const normal_Token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY_NORMAL,
      { expiresIn: process.env.SECRET_KEY_NORMAL_EXPIRATION }
    );

    const refresh_Token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY_REFRESH_KEY,
      { expiresIn: process.env.SECRET_KEY_REFRESH_KEY_EXPIRATION }
    );

    const data = {
      user: user,
      normal_token: normal_Token,
      refresh_Token: refresh_Token,
    };

    // OTP Generator
    const otpMail = generateOTPforMail();
    verifyMainOtp = otpMail;
    mainDataOfUser = data;

    // Send Email
    sendEmail(loginMail(user, otpMail));

    // Send success response with token
    return res.status(200).json(successResponse(200, "Login successful", 'Now Please Verify OTP.'));
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error login user",
      })
    );
    res.status(500).json(errorResponse(500, error_message, error.message));
  }
};

// Verify OTP When User Login
exports.verifyMainOtpController = async (req,res) => {
  try {
    // OTP Verification Main
    const { otp } = req.body;
  
    if (otp != verifyMainOtp) {
      return res.status(409).json(errorResponse(409, "Wrong OTP Entered"));
    }

    // Send Email
    sendEmail(resendOTPVerifiedMail(current_user));

    // Send success response with token
    return res
      .status(200)
      .json(successResponse(200, "OTP Verified Successfully", mainDataOfUser));
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error in verifyMainOtpController",
      })
    );
    res.status(500).json(errorResponse(500, error_message, error.message));
  }  
}

// Resend OTP Controller
exports.resendOtpController = async (req, res) => {
  try {
    // OTP Generator
    const otpMail = generateOTPforMail();
    verify_otp = otpMail;

    const data = {
      resend_otp: otpMail,
    };

    // Send Email
    sendEmail(resendOTPMail(current_user, otpMail));

    // Send success response with token
    return res
      .status(200)
      .json(successResponse(200, "OTP Resend Successfully", data));
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error Forgot OTP",
      })
    );
    res.status(500).json(errorResponse(500, error_message, error.message));
  }
};

// Verify Resend OTP
exports.resendOtpVerifyController = async (req, res) => {
  try {
    const { otp } = req.body;

    if (otp !== verify_otp) {
      return res.status(409).json(errorResponse(409, "Wrong OTP Entered"));
    }

    // Send Email
    sendEmail(resendOTPVerifiedMail(current_user));

    // Send success response with token
    return res
      .status(200)
      .json(successResponse(200, "OTP Verified Successfully", current_user));
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error Forgot OTP",
      })
    );
    res.status(500).json(errorResponse(500, error_message, error.message));
  }
};

// Forgot Password Controller
exports.forgotPasswordSendOTPController = async (req, res) => {
  try {
    const { email } = req.body;

    // Check user
    const user = await userModel.findOne({ email });
    existing_user = user;

    if (!user) {
      return res.status(409).json(errorResponse(409, "User not found"));
    }

    // OTP Generator
    const otpMail = generateOTPforMailforForgotPassword();
    verify_otp_for_password_change = otpMail;

    // Send Email
    sendEmail(sendOTPforChangePasswordMail(user, otpMail));

    // Send success response with token
    return res
      .status(200)
      .json(
        successResponse(200, "OTP Sent Successfully For Changing Password")
      );
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error Forgot Password",
      })
    );
    res.status(500).send(errorResponse(500, error_message, error.message));
  }
};

// Forgot Password and Verify OTP Controller
exports.forgotPasswordVerifyOTPController = async (req, res) => {
  try {
    const { otp, new_password } = req.body;

    if (otp !== verify_otp_for_password_change) {
      return res.status(409).json(errorResponse(409, "Wrong OTP Entered"));
    }

    if (!existing_user) {
      return res.status(409).json(errorResponse(409, "User not found"));
    }

    // Change Password
    const newHashedPassword = await bcrypt.hash(new_password, 10);
    existing_user.password = newHashedPassword;
    await existing_user.save();

    // Send Email
    sendEmail(passwordChangedMail(existing_user));

    // Send success response with token
    return res
      .status(200)
      .json(successResponse(200, "Password Changed Successfully"));
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error Forgot Password",
      })
    );
    res.status(500).send(errorResponse(500, error_message, error.message));
  }
};

// Restricted Routes With access key for getting all datas of user
exports.getAllUserController = async (req, res) => {
  const  accesskey = req.header('ACCESS-KEY');
  const ACCESS_KEY = process.env.ACCESS_KEY;
  try {
    if (accesskey !== ACCESS_KEY) {
      return res
        .status(409)
        .json(errorResponse(409, "Access Key Validation Failed"));
    }
    const allUserData = await userModel.find();
    return res
      .status(200)
      .json(successResponse(200, "Retrieved Successfully", allUserData));
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error Get All User",
      })
    );
    res.status(500).send(errorResponse(500, error_message, error.message));
  }
};
