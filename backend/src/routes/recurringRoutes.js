const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createRecurring,
  getRecurringById,
  getRecurringByUserId,
  runRecurring,
  deleteRecurring,
  resumeRecurring,
  pauseRecurring,
  updateRecurring,
  getUpcomingRecurring,
} = require("../controllers/recurringController");

router.post("recurringTransactions", protect, createRecurring);
router.get("recurringTransactions/:id", protect, getRecurringById);
router.get("recurringTransactions", protect, getRecurringByUserId);
router.get("recurringTransactions/upcoming", protect, getUpcomingRecurring);
router.post("recurringTransactions/run-due", protect, runRecurring);
router.post("recurringTransactions/:id/resume", protect, resumeRecurring);
router.post("recurringTransactions/:id/pause", protect, pauseRecurring);
router.put("recurringTransactions/:id", protect, updateRecurring);
router.delete("recurringTransactions/:id", protect, deleteRecurring);

module.exports = router;
