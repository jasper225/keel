const Account = require('../models/Account');

exports.createAccount = async(req, res) => {
    const { userId, name, type, currency, openingBalance } = req.body;

    if (!userId || !name || !type || !currency || !openingBalance) {
        return res.status(400).json({ error: 'One or more fields are empty' });
    }

    try {
        const account = await Account.create({ userId, name, type, currency, openingBalance });
        res.status(201).json(account);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }

}

exports.getAccountById = async(req, res) => {
    const accountId = req.body;
    
    try {
        const account = await Account.getById(req.params.accountId);
        if (!account) return res.status(404).json({ error: 'Account not found' });
        res.json(account);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.getAccountsByUserId = async(req, res) => {
    const userId = req.body;
    
    try {
        const user = await Account.getByUserId(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.getBalance = async(req, res) => {
    const accountId = req.body;

    try {
        const account = await Account.getBalance(req.params.accountId);
        if (!account) return res.status(404).json({ error: 'Account not found' });
        res.json(account);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.updateAccount = async(req, res) => {
    const { name, type, currency } = req.body;

    if (!name || !type || !currency) {
        return res.status(400).json({ error: 'At least one field must be selected' });
    }

    try {
        const updatedAccount = await Account.update({ name, type, currency });
        res.status(201).json(updatedAccount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.deleteAccount= async (req, res) => {
    try {
        await Account.delete(req.params.accountId, req.params.userId);
        res.json({ message: 'Account deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
