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

router.post("/", protect, createRecurring);
router.get("/:id", protect, getRecurringById);
router.get("/", protect, getRecurringByUserId);
router.get("/upcoming", protect, getUpcomingRecurring);
router.post("/run-due", protect, runRecurring);
router.post("/:id/resume", protect, resumeRecurring);
router.post("/:id/pause", protect, pauseRecurring);
router.put("/:id", protect, updateRecurring);
router.delete("/:id", protect, deleteRecurring);

module.exports = router;
