require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define routes for login and signup
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received email:", email);  // Debugging statement

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);  // Debugging statement
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for email:", email);  // Debugging statement
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID',
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];

    // Check if user exists in the database
    let user = await User.findOne({ googleId: userId });
    if (!user) {
      // Create a new user if not found
      user = new User({
        googleId: userId,
        name: payload['name'],
        email: payload['email'],
        // You might want to handle passwords differently for Google users
      });
      await user.save();
    }

    // Create a session or token as needed
    const jwtToken = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token: jwtToken });
  } catch (error) {
    res.status(400).send('Invalid Google token');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
