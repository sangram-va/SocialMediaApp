const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const upload = require('../middleware/upload.js');

router.post('/register',upload.single('profilePhoto'), register);
router.post('/login', login);

module.exports = router;
