const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  designation: String,
  location: String,
  salary: Number,
  image: String
});

module.exports = mongoose.model('employees', employeeSchema);
