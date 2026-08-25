const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createRecurringTxn, findTxnById, findTxnByUserId, runRecurringTxn, deleteRecurringTxn, resumeTransaction, pauseTransaction } = require('../controllers/recurringTransactionController');

router.post('recurringTransactions', protect, createRecurringTxn);
router.get('recurringTransactions', protect, findTxnById);
router.get('recurringTransactions/:userId', protect, findTxnByUserId);
router.post('recurringTransactions/run-due', protect, runRecurringTxn);
router.post('recurringTransactions/:id/resume', protect, resumeTransaction);
router.post('recurringTransactions/:id/pause', protect, pauseTransaction);
router.delete('recurringTransactions/:id', protect, deleteRecurringTxn);

module.exports = router;