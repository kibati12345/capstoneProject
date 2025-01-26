const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, location, businessInterests, skills } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      location,
      businessInterests,
      skills,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Get User Profiles (Mocked)
router.get('/', async (req, res) => {
  res.json([
    { name: 'John Doe', location: 'Toronto', businessInterests: ['Tech'], skills: ['Programming'] },
    { name: 'Jane Smith', location: 'Vancouver', businessInterests: ['Marketing'], skills: ['SEO'] },
  ]);
});

module.exports = router;
