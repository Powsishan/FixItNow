const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors'); // Import the 'cors' middleware.

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',  // replace with the domain of your frontend
  credentials: true,
}));
app.use(session({ secret: 'mySuperSecretKey', cookie: { maxAge: 60000 }}));
// Use the 'cors' middleware to enable cross-origin requests.
// MySQL connection setup
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





// Route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate that username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Query the database to check if the user exists
  const query = 'SELECT * FROM serviceproviderprofile WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Check if a user with the provided username exists
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Check if the provided password matches the stored password (in a real app, you should hash and compare passwords)
    if (password === user.password) {
      req.session.username = user.username;
      console.log('Logged in user: ', req.session.username);
      return res.status(200).json({ message: 'Login successful' });
    }
  
    // If the password doesn't match, send an error response
    return res.status(401).json({ message: 'Invalid credentials' });
  });
});




//get the userdata 
app.get('/profile-data', (req, res) => {
  
  const username = req.session.username;
  console.log('Requesting profile data for user: ', req.session.username);
  if (!username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  console.log('Requesting profile data for user: ', req.session.username);

  const query = 'SELECT * FROM ServiceProviderProfile WHERE Username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching profile data: ', err);
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


// Route for registration
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Validate that all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if a user with the same username already exists
  const checkUsernameQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUsernameQuery, [username], (err, usernameResults) => {
    if (err) {
      console.error('MySQL error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (usernameResults.length > 0) {
      return res.status(409).json({ message: 'Username is already in use.' });
    }

    // Check if a user with the same email already exists
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, emailResults) => {
      if (err) {
        console.error('MySQL error:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (emailResults.length > 0) {
        return res.status(409).json({ message: 'Email is already in use. Please log in.' });
      }

      // Insert the new user into the database (in a real app, you should hash the password)
      const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [username, email, password], (err) => {
        if (err) {
          console.error('MySQL error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        // Registration successful
        return res.status(200).json({ message: 'User registered' });
      });
    });
  });
});



app.get('/serviceproviderprofile', (req, res) => {
  const query = 'SELECT firstName, lastName,Description, img, JobTitle FROM serviceproviderprofile';
  db.query(query, (err, result) => {
    if (err) { return res.status(500).json({ message: 'Internal Server Error' });}
    res.status(200).json(result);
  });
});

app.listen(port, () => {
  console.log('Server running on http://localhost:3001');
});
