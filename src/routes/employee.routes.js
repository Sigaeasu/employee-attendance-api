const express = require('express')
const router = express.Router()
const employeeController =   require('../controllers/employee.controller');

// Retrieve all employees
router.get('/', employeeController.findAll);
// Retrieve a single employee with id
router.get('/:id', employeeController.findById);
// Retrieve employees with name
router.post('/search', employeeController.findByName);
// Create a new employee
router.post('/', employeeController.create);
// Update a employee with id
router.put('/:id', employeeController.update);
// Delete a employee with id
router.delete('/:id', employeeController.delete);
// Login
router.post('/login', employeeController.login);

module.exports = router