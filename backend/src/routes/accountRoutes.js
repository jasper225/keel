const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createAccount,
  getAccountById,
  getAccountsByUserId,
  getBalance,
  updateAccount,
  deleteAccount,
  getNetWorth,
} = require("../controllers/accountController");

router.post("/", protect, createAccount);
router.get("/:id", protect, getAccountById);
router.get("/", protect, getAccountsByUserId);
router.get("/netWorth", protect, getNetWorth);
router.get("/:id/balance", protect, getBalance);
router.put("/:id/update", protect, updateAccount);
router.delete("/:id/delete", protect, deleteAccount);

module.exports = router;
