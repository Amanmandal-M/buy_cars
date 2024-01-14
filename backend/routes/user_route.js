const user_router = require('express').Router();

// Require the user controller module
const user_controller = require('../controllers/user_controller');

// Route for Get all user with the help of access key
user_router.get('/:accesskey', user_controller.getAllUserController); 

// Route for user registration
user_router.post('/register', user_controller.createUserController); 

// Route for user login
user_router.post('/login', user_controller.loginController);

// Route for Verify Main (First) Otp
user_router.post('/verify-main-otp', user_controller.verifyMainOtpController);  

// Route for Resend OTP
user_router.get('/resend-otp', user_controller.resendOtpController);

// Route for Verify Resent OTP
user_router.get('/verify-otp', user_controller.resendOtpVerifyController);  

// Route for forgot password send otp 
user_router.post('/forgot-password/send-otp', user_controller.forgotPasswordSendOTPController);  

// Route for forgot password and verify otp
user_router.patch('/forgot-password/verify-otp', user_controller.forgotPasswordVerifyOTPController);  

module.exports = user_router;