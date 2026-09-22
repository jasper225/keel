const Budget = require("../models/Budget");
const { BudgetService } = require("../services/budgetService");

exports.createBudget = async (req, res) => {
  try {
    const budget = await Budget.create({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.getById(req.params.id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });
    res.json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBudgetsByUser = async (req, res) => {
  try {
    const { sortBy, sortDir } = req.query;
    const budgets = await Budget.getByUserId(
      req.userId,
      sortBy,
      sortDir
    );
    if (!budgets) return res.status(404).json({ error: "No budgets found" });
    res.json(budgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBudgetProgressById = async (req, res) => {
  try {
    const progress = await BudgetService.getProgress(req.params.id);
    if (!progress)
      return res.status(404).json({ error: "Budget progress not found" });
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBudgetProgressByUserId = async (req, res) => {
  try {
    const progress = await BudgetService.getAllProgress(req.userId);
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateBudget = async (req, res) => {
  const { amountLimit, period, startDate, endDate } = req.body;
  if (!amountLimit || !period || !startDate || !endDate) {
    return res.status(400).json({ error: "At least one field is required" });
  }
  try {
    const updatedBudget = await Budget.update(req.params.id, {
      amountLimit,
      period,
      startDate,
      endDate,
    });
    res.status(201).json(updatedBudget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    Budget.delete(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
