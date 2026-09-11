const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createRecurringTxn,
  getRecurringTxnById,
  getRecurringTxnByUserId,
  runRecurringTxn,
  deleteRecurringTxn,
  resumeTransaction,
  pauseTransaction,
  updateRecurringTxn,
  getUpcomingRecurringTxn,
} = require("../controllers/recurringTransactionController");

router.post("recurringTransactions", protect, createRecurringTxn);
router.get("recurringTransactions/:id", protect, getRecurringTxnById);
router.get("recurringTransactions", protect, getRecurringTxnByUserId);
router.get("recurringTransactions", protect, getUpcomingRecurringTxn);
router.post("recurringTransactions/run-due", protect, runRecurringTxn);
router.post("recurringTransactions/:id/resume", protect, resumeTransaction);
router.post("recurringTransactions/:id/pause", protect, pauseTransaction);
router.put("recurringTransactions/:id", protect, updateRecurringTxn);
router.delete("recurringTransactions/:id", protect, deleteRecurringTxn);

module.exports = router;
