const colors = require("colors");

// Static Error Message
const error_message = "Internal Server Error";

// Success and error Location
const {
  errorResponse,
  successResponse,
} = require("../helpers/success_and_error");

//  Company Model Location
const { companyModel } = require("../models/company_model");

exports.getCompaniesController = async (req, res) => {
  try {
    const company_all_data = await companyModel.find();

    // Send success response with token
    return res.status(200).json(successResponse(200, "Company Data Retrieved Successfully", company_all_data));
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

exports.getCompanyByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const single_company_data = await companyModel.findById({ id: id });

    // Send success response with token
    return res.status(200).json(successResponse(200, "Company Data Retrieved Successfully", single_company_data));
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

exports.getCompanyByCompanyNameController = async (req, res) => {
  try {
    const { search } = req.query;

    const data = await companyModel.find({ company_name: search });

    if (data.length <= 0) {
      return res.status(409).json(errorResponse(409, "Company not found"));
    }

    // Send success response with token
    return res.status(200).json(successResponse(200, "Companuy Data", data));
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: "Error in get company by company name controller",
      })
    );
    res.status(500).json(errorResponse(500, error_message, error.message));
  }
};

exports.createCompanyController = async (req, res) => {
  try {
    const userId = req.userId;
    const { company_name, carList } = req.body;

    // Assuming that carList is an array of car IDs
    const carListExists = await companyModel.find({ carList: { $in: carList } });

    if (carListExists.length > 0) {
      return res.status(409).json(errorResponse(409, 'One or more cars in the list already associated with a company'));
    }

    const new_company = new companyModel({
      userId: userId,
      company_name,
      carList,
    });

    await new_company.save();

    return res.status(200).json(successResponse(200, 'Company created successfully', new_company));
  } catch (error) {
    console.log(
      colors.red({
        error_message: error.message,
        message: 'Error in create company controller',
      })
    );
    res.status(500).json(errorResponse(500, error_message, error.message));
  }
};

exports.updateCompanyController = async (req, res) => {
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

exports.deleteCompanyController = async (req, res) => {
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
