const colors = require('colors');

// Static Error Message
const error_message = "Internal Server Error";

// Success and error Location
const {
    errorResponse,
    successResponse,
  } = require("../helpers/success_and_error");


exports.getCompaniesController = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(
            colors.red({
                error_message: error.message,
                message: "Error in get company controller",
            })
        );
        res.status(500).json(errorResponse(500, error_message, error.message));
    }
};

exports.getCompanyByIdController = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(
            colors.red({
                error_message: error.message,
                message: "Error in get company by Id controller",
            })
        );
        res.status(500).json(errorResponse(500, error_message, error.message));
    }
};

exports.createcompany_controller = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(
            colors.red({
                error_message: error.message,
                message: "Error in create company controller",
            })
        );
        res.status(500).json(errorResponse(500, error_message, error.message));
    }
};

exports.updatecompany_controller = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(
            colors.red({
                error_message: error.message,
                message: "Error in update company controller",
            })
        );
        res.status(500).json(errorResponse(500, error_message, error.message));
    }
};

exports.deletecompany_controller = async (req,res) => {
    try {
        
    } catch (error) {
        console.log(
            colors.red({
                error_message: error.message,
                message: "Error in delete company controller ",
            })
        );
        res.status(500).json(errorResponse(500, error_message, error.message));
    }
};
