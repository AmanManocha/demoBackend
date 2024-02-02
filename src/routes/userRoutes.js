const express = require('express');
const { signup, login } = require('../controller/authController.js');
const { getUserData } = require('../controller/userData.js');
const verifyToken = require('../middleware/authMiddleware.js');
const {userFormData,handleFileUpload, uploadMultipleFiles} = require('../controller/userFormData.js');
const router = express.Router();

router.post('/create',signup)
router.post('/login',login )
router.get('/userData', verifyToken, getUserData)
router.put('/userFormData',verifyToken, userFormData)
router.post('/upload/:userId',verifyToken, handleFileUpload);
router.post('/documents/:userId',verifyToken, uploadMultipleFiles)

module.exports = { authRoutes: router };