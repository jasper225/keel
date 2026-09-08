const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createAccount, getAccountById, getAccountsByUserId, getBalance, updateAccount, deleteAccount } = require('../controllers/accountController');

router.post("/accounts", protect, createAccount);
router.get("/accounts:id", protect, getAccountById);
router.get("/accounts", protect, getAccountsByUserId);
router.get("/accounts:id", protect, getBalance);
router.put("/accounts:id/update", protect, updateAccount);
router.delete("/accounts:id/delete", protect, deleteAccount);

module.exports = router;