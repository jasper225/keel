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
} = require("../controllers/budgetController");

router.post("/budgets", protect, createBudget);
router.get("/budgets/:id", protect, getBudgetById);
router.get("/budgets", protect, getBudgetsByUser);
router.get("/budgets/:id/progress", protect, getBudgetProgressById);
router.get("/budgets/progress", protect, getBudgetProgressByUserId);
router.put("/budgets/:id/update", protect, updateBudget);
router.delete("/budgets/:id/delete", protect, deleteBudget);

module.exports = router;
