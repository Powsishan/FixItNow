const express = require('express');
const mysql = require('mysql');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const timeSlots = ["09:00", "11:00", "14:00", "16:00"];


const app = express();
const port = 3001;
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/images', express.static(path.join(__dirname, '../images')));

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

app.use(session({
  secret: 'mySuperSecretKey',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000,
  },
}));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the directory to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

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
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Username or email already in use.' });
        } else {
          console.error('MySQL error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
      }

      // Registration successful
      return res.status(200).json({ message: 'User registered' });
    });
  } catch (error) {
    console.error('Error hashing the password:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/registerusr', async (req, res) => {
  const { u_username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = 'INSERT INTO users (u_username, email, password) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [u_username, email, hashedPassword], (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Username or email already in use.' });
        } else {
          console.error('MySQL error:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }
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
        // Set the session variable for the authenticated user
        req.session.username = user.username;
        console.log('login user:', username);

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


//user get data 
app.get('/user-profile-data', (req, res) => {
  const { u_username } = req.query;
  console.log('userdashboard server user:', u_username);

  const query = 'SELECT * FROM users WHERE u_username = ?';
  db.query(query, [u_username], (err, results) => {
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


//user login
app.post('/usrlogin', async (req, res) => {
  const { u_username, password } = req.body;

  // Validate that username and password are provided
  if (!u_username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Query the database to check if the user exists
  const query = 'SELECT * FROM users WHERE u_username = ?';
  db.query(query, [u_username], async (err, results) => {
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
        // Set the session variable for the authenticated user
        req.session.u_username = user.u_username;
        console.log('login user:', u_username);

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
  const { username } = req.query;

  const query = 'SELECT * FROM serviceproviderprofile WHERE Username = ?';
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

// Update user profile data
app.put('/update-profile', (req, res) => {
  const updatedUserData = req.body; // Data from the request body

  // Perform the update operation in the database
  const query = 'UPDATE approvedserviceprovider SET ? WHERE Username = ?';
  db.query(query, [updatedUserData, updatedUserData.username], (err, results) => {
    if (err) {
      console.error('Error updating profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Check if the update was successful
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    // Send a success response
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

app.put('/user-update-profile', (req, res) => {
  const updatedUserData = req.body; // Data from the request body

  // Perform the update operation in the database
  const query = 'UPDATE users SET ? WHERE u_username = ?';
  db.query(query, [updatedUserData, updatedUserData.u_username], (err, results) => {
    if (err) {
      console.error('Error updating profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Check if the update was successful
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    // Send a success response
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

app.get('/serviceproviderprofile', (req, res) => {
  const query = 'SELECT firstName, lastName, Description, img, JobTitle,username FROM serviceproviderprofile';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json(result);
  });
});




// Route for changing the user's password
app.post('/change-password', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  // Query the database to get the user's hashed password
  const getPasswordQuery = 'SELECT password FROM ServiceProviderProfile WHERE username = ?';
  db.query(getPasswordQuery, [username], async (err, results) => {
    if (err) {
      console.error('Error fetching password:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = results[0];
    const hashedPassword = user.password;
    console.log('Received request to change password:', username, oldPassword, newPassword);

    // Compare the old password with the stored hashed password
    try {
      const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);
      if (passwordMatch) {
        // Hash the new password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        const updatePasswordQuery = 'UPDATE ServiceProviderProfile SET password = ? WHERE username = ?';
        db.query(updatePasswordQuery, [newHashedPassword, username], (updateErr) => {
          if (updateErr) {
            console.error('Error updating password:', updateErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json({ message: 'Password changed successfully' });
        });
      } else {
        console.log('Password does not match.');

        res.status(401).json({ error: 'Invalid old password' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

//user change password 
app.post('/user-change-password', async (req, res) => {
  const { u_username, oldPassword, newPassword } = req.body;

  // Query the database to get the user's hashed password
  const getPasswordQuery = 'SELECT password FROM users WHERE u_username = ?';
  db.query(getPasswordQuery, [u_username], async (err, results) => {
    if (err) {
      console.error('Error fetching password:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = results[0];
    const hashedPassword = user.password;
    console.log('Received request to change password:', u_username, oldPassword, newPassword);

    // Compare the old password with the stored hashed password
    try {
      const passwordMatch = await bcrypt.compare(oldPassword, hashedPassword);
      if (passwordMatch) {
        // Hash the new password
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        const updatePasswordQuery = 'UPDATE ServiceProviderProfile SET password = ? WHERE u_username = ?';
        db.query(updatePasswordQuery, [newHashedPassword, u_username], (updateErr) => {
          if (updateErr) {
            console.error('Error updating password:', updateErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json({ message: 'Password changed successfully' });
        });
      } else {
        console.log('Password does not match.');

        res.status(401).json({ error: 'Invalid old password' });
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

// Route for deleting the user's account
app.delete('/delete-account', (req, res) => {
  const { username } = req.body;

  // Delete the user's account in the database
  const deleteAccountQuery = 'DELETE FROM ServiceProviderProfile WHERE username = ?';
  db.query(deleteAccountQuery, [username], (err) => {
    if (err) {
      console.error('Error deleting account:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Account deleted successfully' });
  });
});

//user delete account 
app.delete('/user-delete-account', (req, res) => {
  const { u_username } = req.body;

  // Delete the user's account in the database
  const deleteAccountQuery = 'DELETE FROM users WHERE u_username = ?';
  db.query(deleteAccountQuery, [u_username], (err) => {
    if (err) {
      console.error('Error deleting account:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Account deleted successfully' });
  });
});

app.get('/profile-completeness/:username', (req, res) => {
  const username = req.params.username;

  const query = 'SELECT * FROM serviceproviderprofile WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const profile = results[0];
    const completeness = calculateProfileCompleteness(profile);
    res.json({ completeness });
  });
});

//document upload 
// ...

app.post('/upload-documents', upload.array('documents', 3), (req, res) => {
  // Extract the uploaded files from the request
  const files = req.files;

  // Process and save the file details to the database
  files.forEach((file, index) => {
    const { filename, size, mimetype } = file;

    // Define the column to insert the file details based on the index
    let columnName;
    if (index === 0) {
      columnName = 'NICphoto';
    } else if (index === 1) {
      columnName = 'accreditation';
    } else if (index === 2) {
      columnName = 'policeclearence';
    }

    // Insert the file details into the database
    const sql = `INSERT INTO documents (${columnName}, size, mimetype) VALUES (?, ?, ?)`;
    const values = [filename, size, mimetype];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting file details into the database:', err);
        res.status(500).send('Error saving document to the database');
      } else {
        console.log('File details saved to the database');
      }
    });
  });

  res.status(200).send('Documents uploaded and saved successfully');
});

// ...

//book a servise privider
app.post('/book', async (req, res) => {
  const { u_username, username, booking_date, booking_time } = req.body; 

  // Validate time slot
  if (!timeSlots.includes(booking_time)) {
    return res.status(400).json({ message: 'Invalid time slot selected.' });
  }

  const checkQuery = 'SELECT * FROM bookings WHERE username = ? AND booking_date = ? AND booking_time = ?';
  db.query(checkQuery, [username, booking_date, booking_time], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error 1' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Service Provider is on another appointment' });
    }

    const bookQuery = 'INSERT INTO bookings (u_username, username, booking_date, booking_time) VALUES (?, ?, ?, ?)'; // Include u_username in the INSERT query
    db.query(bookQuery, [u_username, username, booking_date, booking_time], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error 2' });
      }
      res.status(200).json({ message: 'Booked successfully' });
    });
  });
});

//  fetch the booking data
app.get('/bookings', (req, res) => {
  
  const username = req.query.username;

  // Check if a username is provided in the query parameters
  if (!username) {
    return res.status(400).json({ error: 'Username parameter is missing' });
  }

  // Construct the SQL query to fetch data for the specified username
  const query = 'SELECT u_username, booking_date, booking_time, message, contactnumber FROM bookings WHERE username = ?';

  // Execute the SQL query with the specified username
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching booking data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if data for the specified username was found
    if (results.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified username' });
    }

    // Return the booking data as JSON
    res.status(200).json(results);
  });
});

//user booked table show 
app.get('/user-bookings', (req, res) => {
  
  const u_username = req.query.u_username;

  // Check if a username is provided in the query parameters
  if (!u_username) {
    return res.status(400).json({ error: 'Username parameter is missing' });
  }

  // Construct the SQL query to fetch data for the specified username
  const query = 'SELECT username, booking_date, booking_time, message FROM bookings WHERE u_username = ?';

  // Execute the SQL query with the specified username
  db.query(query, [u_username], (err, results) => {
    if (err) {
      console.error('Error fetching booking data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if data for the specified username was found
    if (results.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified username' });
    }

    // Return the booking data as JSON
    res.status(200).json(results);
  });
});

//forget password 
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  // Check if the user with the provided email exists in your database
  const query = 'SELECT username FROM serviceproviderprofile WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('MySQL error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique token for password reset
    const resetToken = generateResetToken();
    resetTokens[resetToken] = email;

    // Compose the email message with the reset link
    const resetLink = `http://your-app-url/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: 'your-email-username',
      to: email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    // Send the email with the reset link
    transporter.sendMail(mailOptions, (emailErr) => {
      if (emailErr) {
        console.error('Error sending email:', emailErr);
        return res.status(500).json({ message: 'Failed to send password reset email' });
      }
      res.status(200).json({ message: 'Password reset email sent successfully' });
    });
  });
});

// Create an endpoint for resetting the password using the provided token
app.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  // Verify if the token exists and get the associated email
  const email = resetTokens[token];
  if (!email) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  // Hash the new password
  bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing the password:', hashErr);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Update the user's password in the database
    const updatePasswordQuery = 'UPDATE serviceproviderprofile SET password = ? WHERE email = ?';
    db.query(updatePasswordQuery, [hashedPassword, email], (updateErr) => {
      if (updateErr) {
        console.error('MySQL error:', updateErr);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Password reset successful, remove the token
      delete resetTokens[token];
      res.status(200).json({ message: 'Password reset successful' });
    });
  });
});

//admin login 
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Replace 'admin' with your actual table name in the database
  const query = 'SELECT * FROM admin WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('MySQL error: ' + err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 1) {
      // Login successful
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // Login failed
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});



//admin panel start here 

// Create a new service provider
app.post('/api/serviceproviderprofile', (req, res) => {
  const newProvider = req.body;
  const query = 'INSERT INTO serviceproviderprofile SET ?';
  db.query(query, newProvider, (error, results) => {
    if (error) {
      console.error('Error creating a new provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(newProvider);
    }
  });
});

// Fetch all service providers
app.get('/api/serviceproviderprofile', (req, res) => {
  const query = 'SELECT * FROM serviceproviderprofile';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Create a new service provider
app.post('/api/serviceproviderprofile', (req, res) => {
  const newProvider = req.body;
  const query = 'INSERT INTO serviceproviderprofile SET ?';
  db.query(query, newProvider, (error, results) => {
    if (error) {
      console.error('Error creating a new provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(newProvider);
    }
  });
});

// Update an existing service provider
app.put('/api/serviceproviderprofile/:ID', (req, res) => {
  const ID = req.params.ID;
  const updatedProvider = req.body;
  const query = 'UPDATE serviceproviderprofile SET ? WHERE ID = ?';
  db.query(query, [updatedProvider, ID], (error, results) => {
    if (error) {
      console.error('Error updating provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 1) {
      console.log('Data updated successfully');
      res.json(updatedProvider);
    } else {
      console.error('Data not updated. Provider not found or no changes made.');
      res.status(404).json({ error: 'Provider not found or no changes made.' });
    }
  });
});

// API endpoint to delete a service provider
app.delete('/api/serviceproviderprofile/:ID', (req, res) => {
  const ID = req.params.ID;
  const query = 'DELETE FROM serviceproviderprofile WHERE ID = ?';
  db.query(query, ID, (error, results) => {
    if (error) {
      console.error('Error deleting provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Provider deleted' });
    }
  });
});

// Fetch all HOMEOWNERS 

app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Create a new home
app.post('/api/users', (req, res) => {
  const newProvider = req.body;
  const query = 'INSERT INTO users SET ?';
  db.query(query, newProvider, (error, results) => {
    if (error) {
      console.error('Error creating a new provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(newProvider);
    }
  });
});

// Update an existing home
app.put('/api/users/:ID', (req, res) => {
  const ID = req.params.ID;
  const updatedProvider = req.body;
  const query = 'UPDATE users SET ? WHERE ID = ?';
  db.query(query, [updatedProvider, ID], (error, results) => {
    if (error) {
      console.error('Error updating provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 1) {
      console.log('Data updated successfully');
      res.json(updatedProvider);
    } else {
      console.error('Data not updated. User not found or no changes made.');
      res.status(404).json({ error: 'User not found or no changes made.' });
    }
  });
});

// API endpoint to delete a home
app.delete('/api/users/:ID', (req, res) => {
  const ID = req.params.ID;
  const query = 'DELETE FROM users WHERE ID = ?';
  db.query(query, ID, (error, results) => {
    if (error) {
      console.error('Error deleting provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'User deleted' });
    }
  });
});
// Fetch all bookings

app.get('/api/bookings', (req, res) => {
  const query = 'SELECT * FROM bookings';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Create a new home
app.post('/api/bookings', (req, res) => {
  const newProvider = req.body;
  const query = 'INSERT INTO bookings SET ?';
  db.query(query, newProvider, (error, results) => {
    if (error) {
      console.error('Error creating a new provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(newProvider);
    }
  });
});

// Update an existing home
app.put('/api/bookings/:booking_id', (req, res) => {
  const ID = req.params.ID;
  const updatedProvider = req.body;
  const query = 'UPDATE bookings SET ? WHERE booking_id = ?';
  db.query(query, [updatedProvider, ID], (error, results) => {
    if (error) {
      console.error('Error updating provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.affectedRows === 1) {
      console.log('Data updated successfully');
      res.json(updatedProvider);
    } else {
      console.error('Data not updated. User not found or no changes made.');
      res.status(404).json({ error: 'User not found or no changes made.' });
    }
  });
});

// API endpoint to delete a home
app.delete('/api/bookings/:booking_id', (req, res) => {
  const booking_id = req.params.booking_id;
  const query = 'DELETE FROM bookings WHERE booking_id = ?';
  db.query(query, booking_id, (error, results) => {
    if (error) {
      console.error('Error deleting provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'User deleted' });
    }
  });
});






app.get('/api/approvedserviceprovider', (req, res) => {
  const query = 'SELECT * FROM approvedserviceprovider';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});



app.delete('/api/approvedserviceprovider/:ID', (req, res) => {
  const ID = req.params.ID;
  const query = 'DELETE FROM approvedserviceprovider WHERE ID = ?';
  db.query(query, ID, (error, results) => {
    if (error) {
      console.error('Error deleting provider: ', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Provider deleted' });
    }
  });
});

//saving approved service provider 
app.post('/api/saveAndDeleteData', (req, res) => {
  const dataToSave = req.body; // Assuming your data is sent as a JSON object

  // Begin a database transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting the transaction: ' + err.message);
      res.status(500).json({ error: 'Error starting the transaction' });
      return;
    }

    // Insert data into the new table (replace 'new_table' with your actual table name)
    const insertSql = 'INSERT INTO serviceproviderprofile SET ?';
    db.query(insertSql, dataToSave, (insertErr, insertResult) => {
      if (insertErr) {
        // Rollback the transaction in case of an error
        db.rollback(() => {
          console.error('Error saving data: ' + insertErr.message);
          res.status(500).json({ error: 'Error saving data' });
        });
      } else {
        // Delete the data from the original table (replace 'approvedserviceprovider' with your actual table name)
        const deleteSql = 'DELETE FROM approvedserviceprovider WHERE ID = ?';
        db.query(deleteSql, dataToSave.ID, (deleteErr, deleteResult) => {
          if (deleteErr) {
            // Rollback the transaction in case of an error
            db.rollback(() => {
              console.error('Error deleting data: ' + deleteErr.message);
              res.status(500).json({ error: 'Error deleting data' });
            });
          } else {
            // Commit the transaction if both operations are successful
            db.commit((commitErr) => {
              if (commitErr) {
                console.error('Error committing the transaction: ' + commitErr.message);
                res.status(500).json({ error: 'Error committing the transaction' });
              } else {
                console.log('Data saved and deleted successfully');
                res.json({ message: 'Data saved and deleted successfully' });
              }
            });
          }
        });
      }
    });
  });
});






app.listen(port, () => {
  console.log('Server running on http://localhost:3001');
});


function calculateProfileCompleteness(profile) {
  const fields = [
    profile.firstName, profile.lastName, profile.JobTitle, profile.mobileNumber,
    profile.email, profile.NICnumber, profile.address, profile.qualification, profile.Description,
  ];
  const totalFields = fields.length;
  const filledFields = fields.filter(field => field !== null).length;
  return Math.round((filledFields / totalFields) * 100);
}