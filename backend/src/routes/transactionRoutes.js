const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createTransaction, getTransactionById, getTransactionsByUserId, getTransactionsByAccountId, deleteTransaction, updateTransaction } = require('../controllers/transactionController');

router.post("/transactions", protect, createTransaction);
router.get("/transactions/:id", protect, getTransactionById);
router.get("/transactions", protect, getTransactionsByUserId);
router.get("/transactions:accountId", protect, getTransactionsByAccountId);
router.put("/transactions/:id", protect, updateTransaction)
router.delete('/transactions/:id', protect, deleteTransaction);


module.exports = router;