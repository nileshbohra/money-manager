require('dotenv').config(); // for loading environment variables
const jwt = require('jsonwebtoken');
const User = require('../db/models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const privateKey = process.env.JWT_PRIVATE_KEY;

// Authenticate Token Middleware
exports.authenticateToken = (req, res, next) => {
  console.log(req.headers);
  let token;
  if (!!req.headers.cookie)
    token = req.headers.cookie.split("=")[1];

  if (!token) return res.sendStatus(401); // Unauthorized if no token is found

  jwt.verify(token, privateKey, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user;
    next();
  });
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.send("User not found");

  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.send("Incorrect password");

  const token = jwt.sign({ username: user.username, email }, privateKey, { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  res.json({ success: true });
};

// Register Controller
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.send("All credentials are required");

  const userExists = await User.findOne({ where: { email } });
  if (userExists) return res.send("User already exists");

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }

};

// Protected Route
exports.protectedRoute = (req, res) => {
  res.send("Access granted to protected route!");
};
