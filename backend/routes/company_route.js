const company_router = require("express").Router();

// Require the user controller module
const company_controller = require("../controllers/company_controller");

// Middlewares Location
const {
  authorization_middleware,
} = require("../middlewares/authorization_middleware");
const { auth_middleware } = require("../middlewares/authentication_middleware");

// Get all companies
company_router.get("/", company_controller.getCompaniesController);

// Get a company by ID
company_router.get(
  "/single_company/:id",
  company_controller.getCompanyByIdController
);

// Get a company by Company Name
company_router.get(
  "/company_name",
  company_controller.getCompanyByCompanyNameController
);
 
// Create a new company
company_router.post(
  "/create_company",
  auth_middleware,
  authorization_middleware(["dealer", "admin"]),
  company_controller.createCompanyController
);

// Update a company
company_router.put(
  "/update_company/:id",
  auth_middleware,
  authorization_middleware(["dealer", "admin"]),
  company_controller.updateCompanyController
);

// Delete a company
company_router.delete(
  "/delete_company/:id",
  auth_middleware,
  authorization_middleware(["dealer", "admin"]),
  company_controller.deleteCompanyController
);

module.exports = company_router;
