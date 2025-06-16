require('dotenv').config(); // for loading environment variables
const jwt = require('jsonwebtoken');
const User = require('../db/models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const privateKey = process.env.JWT_PRIVATE_KEY;
const OAuth2Client = require('google-auth-library').OAuth2Client;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.checkLogin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) return res.send("User not found");
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.send("User not found");

  const result = await bcrypt.compare(password, user.password);
  if (!result) return res.send("Incorrect Email or Password");

  const token = jwt.sign({ id: user.id, username: user.username, email }, privateKey, { expiresIn: '1d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  res.json({ success: true });
};

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
    newUser.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/'
  });
  res.json({ success: true });
};

exports.protectedRoute = (req, res) => {
  res.send("Access granted to protected route!");
};

exports.googleOAuthLogin = async (req, res) => {
  try {
    const { id_token } = req.body;
    if (!id_token) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email: email,
        username: name,
        google_id: googleId,
        profile_picture: picture,
        auth_provider: 'google',
        password: null,
      });
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, privateKey, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email, profile_picture: user.profile_picture }
    });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(401).json({ error: 'Invalid Google credentials' });
  }
};