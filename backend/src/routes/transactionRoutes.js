const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createTransaction,
  getTransactionById,
  getTransactionsByUserId,
  getTransactionTags,
  deleteTransaction,
  updateTransaction,
  getRecentTransactions,
  getSpendingByCategory,
  getIncomeVsExpense,
} = require("../controllers/transactionController");

const { attachTag, detachTag } = require('../controllers/tagController');

router.post("/transactions", protect, createTransaction);
router.get("/transactions/:id", protect, getTransactionById);
router.get("/transactions", protect, getTransactionsByUserId);
router.get("/transactions/recent", protect, getRecentTransactions);
router.get("/transactions/:id/tags", protect, getTransactionTags);
router.get("/transactions/spendingByCategory", protect, getSpendingByCategory);
router.get("/transactions/incomeVsExpense", protect, getIncomeVsExpense);
router.post("/transactions/:id/tags", protect, attachTag);
router.delete("/transactions/:id/tags/:tagId", protect, detachTag);
router.put("/transactions/:id/update", protect, updateTransaction);
router.delete("/transactions/:id/delete", protect, deleteTransaction);

module.exports = router;
