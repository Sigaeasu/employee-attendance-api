'use strict';
const dbConn = require('./../../config/db.config');

var Attendance = function(picture, id){
    this.picture = picture;
    this.employee_id = id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

// GET ALL
Attendance.findAll = function (result) {
    dbConn.query("SELECT * FROM attendances", function (err, res) {
        if(err) {
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

// GET BY ID
Attendance.findById = function (id, result) {
    dbConn.query("SELECT * FROM attendances WHERE id = ? ", id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

// GET BY EMPLOYEE ID
Attendance.findByEmployeeId = function (id, result) {
    dbConn.query("SELECT * FROM attendances WHERE employee_id = ? ", id, function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Attendance.create = function (request, result) {
    dbConn.query("INSERT INTO attendances SET ?", request, function (err, res) {
        if (err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= Attendance;