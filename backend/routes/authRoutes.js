const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const authMiddleware = require('../middlewares/auth/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/protected', authMiddleware, authController.protectedRoute);
router.get('/check', authMiddleware, authController.checkLogin);
router.get('/logout', authController.logout);
router.post('/google', authController.googleOAuthLogin);

module.exports = router;