'use strict';
const Employee = require('../models/employee.model');
var md5 = require('md5');

// GET
exports.findAll = function(request, result) {
    Employee.findAll(function(error, employee) {
        if (error) result.send(error);
        result.send(employee);
    });
};

// GET by ID
exports.findById = function(request, result) {
    Employee.findById(request.params.id, function(error, employee) {
        if (error) result.send(error);
        result.json(employee);
    });
};

// GET by Name
exports.findByName = function(request, result) {
    Employee.findByName(request.body.name, function(error, employee) {
        if (error) result.send(error);
        result.json(employee);
    });
};

// STORE
exports.create = function(request, result) {
    const new_employee = new Employee(request.body);

    if (request.body.constructor === Object && Object.keys(request.body).length === 0){
        result.status(400).send({ 
            error:true, 
            message: 'Please provide all required field' 
        });
    } else {
        Employee.findByUsername(request.body.username, function(error, employee) {
            if (error) result.send(error);
            if (Object.keys(employee).length === 0) {
                Employee.create(new_employee, function(err, employee) {
                    if (err) result.send(err);
                    result.json({error:false,message:"Employee added successfully!",data:employee});
                });
            } else {
                result.send({
                    error: true,
                    message: 'Username is taken, please use another username !'
                })
            }
        });
    }
};

// UPDATE
exports.update = function(request, result) {
    if (request.body.constructor === Object && Object.keys(request.body).length === 0){
        result.status(400).send({ 
            error:true, 
            message: 'Please provide all required field' 
        });
    } else {
        Employee.update(request.params.id, new Employee(request.body), function(err, employee) {
            if (err) result.send(err);
            result.json({ 
                error:false, 
                message: 'Employee successfully updated' 
            });
        });
    }
};

// DELETE
exports.delete = function(request, result) {
    Employee.delete( request.params.id, function(err, employee) {
        if (err) result.send(err);
        result.json({ error:false, message: 'Employee successfully deleted' });
    });
};

// LOGIN
exports.login = function(request, result) {
    if (request.body.constructor === Object && Object.keys(request.body).length === 0){
        result.status(400).send({ 
            error:true, 
            message: 'Please provide all required field' 
        });
    } else {
        Employee.findByUsername(request.body.username, function(error, employee) {
            if (error) result.send(error);
            if (Object.keys(employee).length === 0) {
                result.send({
                    error: true,
                    message: 'Employee not found'
                })
            } else {
                if (employee[0].password !== md5(request.body.password)) {
                    result.send({
                        error: true,
                        message: 'Wrong password !'
                    })
                } else {
                    result.json({
                        error: false,
                        data: employee[0]
                    })
                }
            }
        });
    }
};