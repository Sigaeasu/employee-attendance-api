const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to Employee Attendance API");
});

// Employee route
const employeeRoutes = require('./src/routes/employee.routes')
app.use('/api/employees', employeeRoutes)

// Attendance route
const attendanceRoutes = require('./src/routes/attendance.routes')
app.use('/api/attendances', attendanceRoutes)












const multer = require('multer')

// handle storage using multer
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'images');
  },
  filename: function (request, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}.jpg`);
  }
});

const upload = multer({ storage: storage });
// handle single file upload
app.post('/upload-file', upload.single('image'), (req, res, next) => {
   const file = req.file;
   if (!file) {
      return res.status(400).send({ message: 'Please upload a file.' });
   }
   return res.send({ message: 'File uploaded successfully.', file });
});






// listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});