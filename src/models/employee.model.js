'use strict';
var dbConn = require('./../../config/db.config');
var md5 = require('md5');

var Employee = function(employee){
    this.name = employee.name;
    this.username = employee.username;
    this.password = md5(employee.password);
    this.email = employee.email;
    this.phone = employee.phone;
    this.role_id = employee.role_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Employee.create = function (request, result) {
    dbConn.query("INSERT INTO employees SET ?", request, function (err, res) {
        if (err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Employee.findAll = function (result) {
    dbConn.query("SELECT * FROM employees", function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

Employee.findById = function (id, result) {
    dbConn.query("SELECT * FROM employees WHERE id = ? ", id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Employee.findByName = function (id, result) {
    dbConn.query("SELECT * FROM employees WHERE name REGEXP ? ", id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Employee.findByUsername = function (request, result) {
    dbConn.query("SELECT * FROM employees WHERE username = ? ", request, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Employee.update = function(id, employee, result){
    dbConn.query("UPDATE employees\
                    SET name=?,\
                    username=?,\
                    password=?,\
                    email=?,\
                    phone=?,\
                    role_id=?\
                    WHERE id = ?", 
                [
                    employee.name,
                    employee.username,
                    employee.password,
                    employee.email,
                    employee.phone,
                    employee.role_id,
                    id
                ], function (err, res) {
        if(err) {
            result(null, err);
        }else{
            result(null, res);
        }
    });
};

Employee.delete = function(id, result){
    dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= Employee;