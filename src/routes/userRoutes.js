const express = require('express');
const { signup, login } = require('../controller/authController.js');
const { getUserData } = require('../controller/userData.js');
const verifyToken = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/create',signup)
router.post('/login',login )
router.get('/userData', verifyToken, getUserData)

module.exports = { authRoutes: router };