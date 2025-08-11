const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const connectDB = require('./connection');
const employeeRoutes = require('./routes/employeeRoutes');

// Use hardcoded port for debugging
const PORT = 4550;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
connectDB();

// Routes (mount at /basic so your EJS links work)
app.use('/basic', employeeRoutes);

// Add a simple test route
app.get('/', (req, res) => {
  res.send('Server is running! Try accessing http://localhost:4550/basic');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  http://localhost:4550/basic');
});