root@ip-172-31-93-158:~/selfstartmern/my-node-app# cat server.js 
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(express.static(__dirname));

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'database-1.czcgsicqctqx.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  database: 'staff', // Make sure to replace with your actual database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to RDS MySQL:', err);
    return;
  }

  console.log('Connected to RDS MySQL');
});

// Create a 'users' table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    console.log('Users table created or already exists');
  }
});

// ... (Existing code for database connection and table creation)

// Serve the HTML pages at the root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle POST requests to /register
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Insert user data into the 'users' table
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into RDS MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('User registered successfully:', result);
    res.status(200).json({ message: 'Registration successful' });
  });
});

// Handle POST requests to /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the 'users' table
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      // User authenticated successfully
           res.redirect('/dashboard.html');
    } else {
      // Incorrect email or password
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});