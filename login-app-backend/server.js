const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

app.use(session({
  secret: 'mySuperSecretKey',
  cookie: { maxAge: 60000 },
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9r46#u@fb4K',
  database: 'bookings',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO serviceproviderprofile (username, email, password) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [username, email, hashedPassword], (err) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Registration successful
      return res.status(200).json({ message: 'User registered' });
    });
  } catch (error) {
    console.error('Error hashing the password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate that username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Query the database to check if the user exists
  const query = 'SELECT * FROM serviceproviderprofile WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Check if a user with the provided username exists
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Check if the provided password matches the stored password
    try {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.username = user.username;
        console.log('Logged in user:', req.session.username);
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
});

// Get user profile data
app.get('/profile-data', (req, res) => {
  const username = req.session.username;
  console.log('Dashboard user:', req.session.username);
  if (!username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const query = 'SELECT * FROM ServiceProviderProfile WHERE Username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    // Return the profile data as JSON
    res.status(200).json(results[0]); // Assuming the query returns only one row
  });
});

app.get('/serviceproviderprofile', (req, res) => {
  const query = 'SELECT firstName, lastName, Description, img, JobTitle FROM serviceproviderprofile';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json(result);
  });
});

app.listen(port, () => {
  console.log('Server running on http://localhost:3001');
});
