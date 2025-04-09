const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔐 Signup attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("✅ Signup successful:", email);
    res.status(201).json({ token });

  } catch (err) {
    console.error("❌ Signup failed:", err.message);
    res.status(500).json({ message: 'Something went wrong on the server.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔐 Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("⚠️ User not found:", email);
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid credentials:", email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("✅ Login successful:", email);
    res.status(200).json({ token });

  } catch (err) {
    console.error("❌ Login failed:", err.message);
    res.status(500).json({ message: 'Something went wrong on the server.' });
  }
};

module.exports = { signup, login };
