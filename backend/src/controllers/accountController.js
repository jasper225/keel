const Account = require("../models/Account");

exports.createAccount = async (req, res) => {
  try {
    const account = await Account.create({ userId: req.user.id, ...req.body });
    res.status(201).json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) return res.status(404).json({ error: "Account not found" });
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAccountsByUserId = async (req, res) => {
  try {
    const user = await Account.getByUserId(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const account = await Account.getBalance(req.params.id);
    if (!account) return res.status(404).json({ error: "Account not found" });
    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateAccount = async (req, res) => {
  const { name, type, currency } = req.body;

  if (!name || !type || !currency) {
    return res
      .status(400)
      .json({ error: "At least one field must be selected" });
  }

  try {
    const updatedAccount = await Account.update(req.params.id, {
      name,
      type,
      currency,
    });
    res.status(201).json(updatedAccount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await Account.delete(req.params.id);
    res.json({ message: "Account deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
