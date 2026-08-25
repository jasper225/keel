const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { register, login, logout, getProfile } = require('../controllers/authController');

router.post("/", register);
router.post("/", login);
router.post("/", protect, logout);
router.get("/profile", protect, getProfile);

module.exports = router;