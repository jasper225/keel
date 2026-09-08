const Budget = require("../models/Budget");

exports.createBudget = async (req, res) => {
  const { userId, categoryId, amountLimit, period, startDate, endDate } =
    req.body;
  if (
    !userId ||
    !categoryId ||
    !amountLimit ||
    !period ||
    !startDate ||
    !endDate
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const budget = await Budget.create({
      userId,
      categoryId,
      amountLimit,
      period,
      startDate,
      endDate,
    });
    res.status(201).json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.budgetId);
    if (!budget) return res.status(404).json({ error: "Budget not found" });
    res.json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBudgetsByUser = async (req, res) => {
  try {
    const { startDate, endDate, categoryId } = req.query;
    const budgets = await Budget.listByUserId(req.userId, {
      startDate,
      endDate,
      categoryId,
    });
    if (!budgets) return res.status(404).json({ error: "No budgets found" });
    res.json(budgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateBudget = async (req, res) => {
  const { categoryId, amountLimit, period, startDate, endDate } = req.body;
  if (!categoryId || !amountLimit || !period || !startDate || !endDate) {
    return res.status(400).json({ error: "At least one field is required" });
  }
  try {
    const updatedBudget = await Budget.update({
      categoryId,
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
    Budget.delete(req.params.budgetId, req.params.userId);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
