const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createBudget,
  getBudgetsByUser,
  updateBudget,
  deleteBudget,
  getBudgetProgressById,
  getBudgetProgressByUserId,
  getBudgetsByCategory,
} = require("../controllers/budgetController");

router.post("/", protect, createBudget);
router.get("/:id", protect, getBudgetById);
router.get("/", protect, getBudgetsByUser);
router.get("/:id/progress", protect, getBudgetProgressById);
router.get("/progress", protect, getBudgetProgressByUserId);
router.put("/:id/update", protect, updateBudget);
router.delete("/:id/delete", protect, deleteBudget);

module.exports = router;
