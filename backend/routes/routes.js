const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const categoryRoutes = require('./categoryRoutes');
const transactionRoutes = require('./transactionRoutes');
const analysisRoutes = require('./analysisRoutes');
const accountRoutes = require('./accountsRoutes');
const authMiddleware = require("../middlewares/auth/authMiddleware");
const userRoutes = require('./userRoutes');

router.get('/', (req, res) => {
  res.send('Welcome to money manager!');
});

router.use('/auth', authRoutes);
router.use('/category', authMiddleware, categoryRoutes);
router.use('/transactions', authMiddleware, transactionRoutes);
router.use('/analysis', authMiddleware, analysisRoutes);
router.use('/accounts', authMiddleware, accountRoutes);
router.use('/user', authMiddleware, userRoutes);

module.exports = router;