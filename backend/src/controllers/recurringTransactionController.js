const RecurringTransaction = require('../models/RecurringTransaction');
const { RecurringTransactionService } = require('../services/recurringTxnService');

exports.createRecurringTxn = async(req, res) => {
    const { userId, categoryId, type, amount, period, intervalUnit, intervalCt, nextOccurence, endDate } = req.body;
    try {
        const recurringTxn = await RecurringTransaction.create({ userId, categoryId, type, amount, period, intervalUnit, intervalCt, nextOccurence, endDate });
        res.status(201).json(recurringTxn);   
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.findTxnById = async(req, res) => {
    
    try {
        const recurringTxn = await RecurringTransaction.findById(req.params.id);
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Server error'}); 
    }
}

exports.findTxnByUserId = async(req, res) => {
    try {
        const recurringTxns = await RecurringTransaction.findById(req.params.id);
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Server error'}); 
    }
}

exports.runRecurringTxn = async(req, res) => {
     try { 
        const runningTxn = await RecurringTransactionService.runDue();
        res.json({ created: created.length });
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

