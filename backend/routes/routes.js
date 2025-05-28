const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const transactionRoutes = require('./transactionRoutes');
const analysisRoutes = require('./analysisRoutes');
const accountRoutes = require('./accountsRoutes');
const authenticateToken = require("../controllers/authController").authenticateToken;

router.get('/', (req, res) => {
  res.send('Welcome to money manager!');
});

router.use('/auth', authRoutes);
router.use('/category', authenticateToken, categoryRoutes);
router.use('/transactions', authenticateToken, transactionRoutes);
router.use('/analysis', authenticateToken, analysisRoutes);
router.use('/accounts', authenticateToken, accountRoutes);

module.exports = router;