const company_router = require("express").Router();

// Require the user controller module
const company_controller = require('../controllers/company_controller');

// Get all companies
company_router.get('/', company_controller.getCompaniesController);

// Get a company by ID
company_router.get('/single_company/:id', company_controller.getCompanyByIdController);

// Create a new company
company_router.post('/create_company', company_controller.createcompany_controller);

// Update a company
company_router.put('/update_company/:id', company_controller.updatecompany_controller);
// Delete a company
company_router.delete('/delete_company/:id', company_controller.deletecompany_controller);

module.exports = company_router;