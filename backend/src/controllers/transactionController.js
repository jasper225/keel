const Transaction = require("../models/Transaction");
const TransactionTag = require("../models/TransactionTag");
const { DashboardService } = require('../services/dashboardService');

exports.createTransaction = async (req, res) => {

  try {
    const transaction = await Transaction.create({
      userId: req.user.id, ...req.body,
    });
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.getById(req.params.id);
    if (!transaction)
      return res.status(404).json({ error: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const { from, to, accountId, categoryId, tagId, type } = req.query;
    const transactions = await Transaction.getByUserId(userId, {
      from,
      to,
      accountId,
      categoryId,
      tagId,
      type,
    });
    if (!transactions)
      return res.status(404).json({ error: "No transactions found" });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getTransactionTags = async (req, res) => {
  try {
    const tags = await TransactionTag.getTagsForTransaction(req.params.id);
    if (!tags)
      return res.status(404).json({ error: "No tags for transaction found" });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRecentTransactions = async(req, res) => {
  try {
    const recentTransactions = await DashboardService.getRecentTransactions(req.user.id);
    res.json(recentTransactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

exports.updateTransaction = async (req, res) => {
  const { accountId, categoryId, type, amount, transferAccountId, occuredAt } = req.body;

  try {
    const updatedCategory = await Transaction.update(req.params.id, {
      accountId,
      categoryId,
      type,
      amount,
      transferAccountId,
      occuredAt,
    });
    res.status(201).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.delete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
