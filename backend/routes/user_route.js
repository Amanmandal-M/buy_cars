const user_router = require('express').Router();

// Require the user controller module
const user_controller = require('../controllers/user_controller');


// Route for user registration
user_router.post('/register', user_controller.createUserController);

// Route for user login
user_router.post('/login', user_controller.loginController);

// Route for forgot OTP
user_router.post('/forgot_otp', user_controller.forgotOtpController);

// Route for forgot password
user_router.post('/forgot_password', user_controller.forgotPasswordController);


// Export the user_router for use in other parts of the application
module.exports = user_router;