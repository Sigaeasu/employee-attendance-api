'use strict';
const Attendance = require('../models/attendance.model');
const Employee = require('../models/employee.model');

// GET
exports.findAll = function(request, result) {
    Attendance.findAll(function(error, attendance) {
        if (error) result.send(error);
        result.send(attendance);
    });
};

// GET by ID
exports.findById = function(request, result) {
    Attendance.findById(request.params.id, function(error, attendance) {
        if (error) result.send(error);
        result.json(attendance);
    });
};

// GET by Employee ID
exports.findByEmployeeId = function(request, result) {
    Attendance.findByEmployeeId(request.params.id, function(error, attendance) {
        if (error) result.send(error);
        result.json(attendance);
    });
};

// POST Attendance
exports.create = function(request, result) {
    Employee.findById(request.params.id, function(error, employee) {
        if (error) {
            result.send(error);
        } else {
            if (Object.keys(employee).length <= 0) {
                result.send({
                    error: true,
                    message: 'Employee not found'
                })
            } else {
                const file = request.file;
                if (!file) {
                    return result.status(400).send({ message: 'Please upload a file.' });
                 } else {
                    const new_attendance = new Attendance(request.file.filename, parseInt(request.params.id));
                    Attendance.create(new_attendance, function(err, attendance) {
                        if (err) result.send(err);
                        result.json({
                            error: false,
                            message: "Attendance added successfully!"
                        });
                    });
                 }
            }
        }
    });
}