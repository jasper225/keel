const Recurring = require("../models/Recurring");
const { RecurringTransactionService } = require("../services/recurringTxnService");
const { DashboardService } = require("../services/dashboardService");

exports.createRecurring = async (req, res) => {
  try {
    const recurring = await Recurring.create({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json(recurring);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRecurringById = async (req, res) => {
  try {
    const recurring = await Recurring.getById(req.params.id);
    if (!recurring)
      return res.status(404).json({ error: "Recurring transaction not found" });
    res.json(recurring);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRecurringByUserId = async (req, res) => {
  try {
    const { before, after, accountId, categoryId } = req.body;
    const recurrings = await Recurring.getByUserId(req.user.id, {
      before,
      after,
      accountId,
      categoryId,
    });
    if (!recurrings)
      return res.status(404).json({ error: "No recurring transactions found" });
    res.json(recurrings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUpcomingRecurring = async (req, res) => {
  try {
    const upcomingRecurring = await DashboardService.getUpcomingRecurring(req.user.id);
    res.json(upcomingRecurring);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.runRecurring = async (req, res) => {
  try {
    const running = await RecurringTransactionService.runDue(req.params.id);
    res.json(running);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.resumeRecurring = async (req, res) => {
  try {
    await Recurring.setActive(req.params.id, true);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.pauseRecurring = async (req, res) => {
  try {
    await Recurring.setActive(req.params.id, false);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateRecurring = async (req, res) => {
  const {
    amount,
    intervalUnit,
    intervalCt,
    nextOccurence,
    endDate,
  } = req.body;

  try {
    const updatedRecurring = await Recurring.update(req.params.id, {
      amount,
      intervalUnit,
      intervalCt,
      nextOccurence,
      endDate,
    });
    res.status(201).json(updatedRecurring);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteRecurringTxn = async (req, res) => {
  try {
    await Recurring.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
