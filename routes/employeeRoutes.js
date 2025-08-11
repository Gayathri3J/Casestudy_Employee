const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModels'); // Make sure file name matches exactly

const nav = [
  { name: "Home", link: "/basic" },
  { name: "Add Employee", link: "/basic/add" }
];

const imageIcon = "https://static.vecteezy.com/system/resources/thumbnails/008/442/036/small_2x/an-inclusive-workplace-employees-protection-filled-outline-icon-illustration-color-editable-eps-10-free-vector.jpg";

// Home page - render all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('home', { employees, nav, imageIcon });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Error loading employees');
  }
});

// Add Employee Form
router.get('/add', (req, res) => {
  res.render('add', { nav, imageIcon });
});

// Add Employee POST
router.post('/add', async (req, res) => {
  await Employee.create(req.body);
  res.redirect('/basic');
});

// Edit Employee Form
router.get('/edit/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render('edit', { employee, nav, imageIcon });
});

// Edit Employee POST
router.post('/edit/:id', async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/basic');
});

// Delete Employee
router.get('/delete/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/basic');
});

module.exports = router;
