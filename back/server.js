// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mongoose = require('mongoose');
const UserModel = require('./userModel'); // Adjust the path to your UserModel
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/SocialScrap')
  .then(() => {
    console.log('Connected to MongoDB');
    
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received:', username, password); // Debugging output

  try {
    // Find the user by username and include the password field
    const user = await UserModel.findOne({ username: username }).select('+password');

    if (user) {
      // Compare the entered password with the hashed password in the database
      console.log("yes");
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      console.log(user.password);
      const dummy=crypto.createHash('sha256').update(hashedPassword).digest('hex');
      console.log(dummy);
      const isMatch = (dummy === user.password);
      if (isMatch) {
        // Generate JWT token (optional, for authentication)
        const token = jwt.sign({ username: user.username, id: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ message: 'Login successful!', token }); // Send token for client-side storage
      } else {
        res.status(401).json({ message: 'Invalid pass. Please try again.' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
});
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received signup request:', username, password); // Debugging output

  try {
    // Find if the username already exists (optional)
    const existingUser = await UserModel.findOne({ username });
    console.log(existingUser)
    if (existingUser) {
      
      return res.status(400).json({ message: 'Username already exists.' });
    }


    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Create a new user document
    const newUser = new UserModel({
      username : username,
      password: hashedPassword
      // Add other required fields if needed (e.g., email, age)
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
});

app.post('/api/instagram-login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received:', username, password); // Debugging output

  // Directly respond with a success message without validation
  res.json({ message: 'Login successful!', username });
});

// Start the server after a successful connection
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
