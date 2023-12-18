// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://abhishekprasad:abhiprasad@cluster0.ygncry8.mongodb.net/venkat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Create a schema for the user
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age:Number,
  phoneno:Number,
  email:String,
  address:String,
  
});

// Create a model for the user
const User = mongoose.model('apis', userSchema);

// Middleware to parse JSON
app.use(express.json());

// Route to register a user
app.post('/register', async (req, res) => {
  const { username, password ,age } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to generate JWT token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, '2542'); // Change 'secret_key' to a secure key in production
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/update', async (req, res) => {
  try {
   const username =req.params.username;
    const userDetailsToUpdate = req.body; // New details to be added

    const user = await User.findOneAndUpdate(username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add new details to the existing user
    Object.keys(userDetailsToUpdate).forEach((key) => {
      user[key] = userDetailsToUpdate[key];
    });

    await user.save();
    res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user details', error: error.message });
  }
});


// Middleware to verify JWT token

// Replace these with your actual secret and token
const secret = '2542';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlIiwiaWF0IjoxNzAyNTMxMDk4fQ.8cSXThZVJpSUjsMfsdwfSYjsZUDnz0OMVsvtL4WKJtE';

jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    // Token verification failed
    console.error('Token verification failed:', err);
  } else {
    // Token is valid
    console.log('Decoded token:', decoded);
    // Use decoded data as needed
  }
});
// Route to retrieve data (protected route)
app.get('/data',  (req, res) => {
  // This route is protected and can only be accessed with a valid token
  res.json({ message: 'Protected data retrieved successfully', user: req.user });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  username:"teja",
  console.log(`Server is running on port ${PORT}`);
});
