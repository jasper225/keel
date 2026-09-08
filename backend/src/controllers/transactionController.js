const Transaction = require('../models/Transaction');

exports.createTransaction = async(req, res) => {
    const {
        userId, accountId,
        categoryId, type,
        amount, transferAccountId,
        occuredAt
    } = req.body;

    if (!userId || !accountId || !categoryId || !type ||
        !amount || !transferAccountId || !occuredAt
    ) {
        return res.status(400).json({ error: 'One or more fields are empty' });
    }
    
    try {
        const transaction = await Transaction.createTransaction({ userId,
        accountId, categoryId,
        type, amount,
        transferAccountId,
        occuredAt });
        res.status(201).json(transaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.getTransactionById = async(req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.transactionId);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.json(transaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.getTransactionsByUserId = async(req, res) => {
    try {
        const { from, to, accountId, categoryId, tagId, type } = req.query;
        const transactions = await Transaction.listByUserId(req.userId, { from, to, accountId, categoryId, tagId, type });
        if (!transactions) return res.status(404).json({ error: 'No transactions found' });
        res.json(transactions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.updateTransaction = async(req, res) => {
    const { accountId,
        categoryId, type,
        amount, transferAccountId,
        occuredAt } = req.body;

    try {
        const updatedCategory = await Transaction.update({ accountId,
        categoryId, type,
        amount, transferAccountId,
        occuredAt });
        res.status(201).json(updatedCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.deleteTransaction= async (req, res) => {
    try {
        await Transaction.delete(req.params.categoryId, req.params.userId);
        res.json({ message: 'Transaction deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}