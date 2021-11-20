const express = require('express')
const multer = require('multer')
const router = express.Router()
const attendanceController =   require('../controllers/attendance.controller');

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, 'images');
    },
    filename: function (request, file, callback) {
      callback(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});

const upload = multer({ storage: storage });

// Retrieve all attendances
router.get('/', attendanceController.findAll);
// Retrieve a single attendance with id
router.get('/:id', attendanceController.findById);
// Retrieve a attendances with employee id
router.get('/employee/:id', attendanceController.findByEmployeeId);
// Create a new attendance
router.post('/employee/:id', upload.single('image'), attendanceController.create);

module.exports = router