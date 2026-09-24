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

router.post("/", protect, createTransaction);
router.get("/:id", protect, getTransactionById);
router.get("/", protect, getTransactionsByUserId);
router.get("/recent", protect, getRecentTransactions);
router.get("/:id/tags", protect, getTransactionTags);
router.get("/spendingByCategory", protect, getSpendingByCategory);
router.get("/incomeVsExpense", protect, getIncomeVsExpense);
router.post("/:id/tags", protect, attachTag);
router.delete("/:id/tags/:tagId", protect, detachTag);
router.put("/:id/update", protect, updateTransaction);
router.delete("/:id/delete", protect, deleteTransaction);

module.exports = router;
