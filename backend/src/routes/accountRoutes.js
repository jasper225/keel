const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createAccount, getAccountById, getAccountsByUserId, getBalance, updateAccount, deleteAccount } = require('../controllers/accountController');

router.post("/accounts", protect, createAccount);
router.get("/accounts", protect, getAccountById);
router.get("/accounts:userId", protect, getAccountsByUserId);
router.get("/accounts", protect, getBalance);
router.put("/accounts", protect, updateAccount);
router.delete("/accounts", protect, deleteAccount);

module.exports = router;