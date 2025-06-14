const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController')

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/protected', authController.authenticateToken, authController.protectedRoute);
router.get('/check', authController.authenticateToken, authController.checkLogin);
router.get('/logout', authController.logout);

module.exports = router;