const user_router = require('express').Router();

// Require the user controller module
const user_controller = require('../controllers/user_controller');


// Route for user registration
user_router.post('/register', user_controller.createUserController);

// Route for user login
user_router.post('/login', user_controller.loginController);


// Export the user_router for use in other parts of the application
module.exports = user_router;