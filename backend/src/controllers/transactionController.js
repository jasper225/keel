const Transaction = require("../models/Transaction");
const TransactionTag = require("../models/TransactionTag");
const { DashboardService } = require("../services/dashboardService");
const { ReportService } = require("../services/reportService");

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      userId: req.user.id,
      ...req.body,
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
    const { from, to, accountId, categoryId, tagId, type, sortBy, sortDir } = req.query;
    const transactions = await Transaction.getByUserId(
      req.userId,
      from,
      to,
      accountId,
      categoryId,
      tagId,
      type,
      sortBy,
      sortDir
    );
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
    const transaction = await Transaction.getById(req.params.id);
    if (!transaction)
      return res.status(404).json({ error: "Transaction not found" });
    const tags = await TransactionTag.getTagsForTransaction(req.params.id);
    if (!tags)
      return res.status(404).json({ error: "No tags for transaction found" });
    res.json({ transaction, tags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRecentTransactions = async (req, res) => {
  try {
    const recentTransactions = await DashboardService.getRecentTransactions(
      req.user.id,
    );
    res.json(recentTransactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getIncomeVsExpense = async (req, res) => {
  try {
    const incomeVsExpense = await ReportService.getIncomeVsExpense(req.user.id);
    res.json(incomeVsExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSpendingByCategory = async (req, res) => {
  try {
    const spendingByCategory = await ReportService.getSpendingByCategory(
      req.user.id,
    );
    res.json(spendingByCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTransaction = async (req, res) => {
  const { accountId, categoryId, type, amount, transferAccountId, occuredAt } =
    req.body;

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
