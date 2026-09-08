const RecurringTransaction = require('../models/RecurringTransaction');
const { RecurringTransactionService } = require('../services/recurringTxnService');

exports.createRecurringTxn = async(req, res) => {
    try {
        const recurringTxn = await RecurringTransaction.create({ userId: req.user.id, ...req});
        res.status(201).json(recurringTxn);   
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.getRecurringTxnById = async(req, res) => {
    try {
        const recurringTxn = await RecurringTransaction.findById(req.params.id);
        if (!recurringTxn) return res.status(404).json({ error: 'Recurring transaction not found' });
        res.json(recurringTxn);
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Server error'}); 
    }
}

exports.getRecurringTxnByUserId = async(req, res) => {
    try {
        const recurringTxns = await RecurringTransaction.findById(req.user.id);
        res.json(recurringTxns);
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Server error'}); 
    }
}

exports.runRecurringTxn = async(req, res) => {
     try { 
        const runningTxn = await RecurringTransactionService.runDue(req.params.id);
        res.json(runningTxn);
     } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'}); 
     }
}

exports.resumeTransaction = async(req, res) => {
    try {
        await RecurringTransaction.setActive(req.params.id, true);
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'}); 
    }
}

exports.pauseTransaction = async(req, res) => {
    try {
        await RecurringTransaction.setActive(req.params.id, false);
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'}); 
    }
}

exports.deleteRecurringTxn = async(req, res) => {
    try {
        await RecurringTransaction.delete(req.params.id);
        res.status(204).end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'}); 
    }
}

