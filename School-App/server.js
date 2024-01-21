const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'database-1.czcgsicqctqx.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  database: '', // Leave this empty for now
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL');

  // Create the database (replace 'your_database_name' with the desired name)
  db.query('CREATE DATABASE IF NOT EXISTS your_database_name', (createErr) => {
    if (createErr) {
      console.error('Error creating database:', createErr);
      db.end(); // Close the connection in case of an error
      return;
    }

    console.log('Database created successfully');
    db.end(); // Close the connection after creating the database
  });
});

app.post('/register', (req, res) => {
  // Handle registration logic here
  res.status(200).json({ message: 'Registration endpoint hit' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
