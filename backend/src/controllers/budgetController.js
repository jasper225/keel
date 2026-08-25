const Budget = require('../models/Budget');

exports.setBudget = async(req, res) => {
    const { userId, categoryId, amountLimit, period, startDate, endDate } = req.body;
    if (!userId || !categoryId || !amountLimit || !period || !startDate || !endDate) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    try {
        const budget  = await Budget.create({ userId, categoryId, amountLimit, period, startDate, endDate });
        res.status(201).json(budget);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.getBudgetsByUser = async(req, res) => {
    const userId = req.body;
    try {
        const budgets = await Budget.listByUserId(req.params.userId);
        if (!budgets) return res.status(404).json({ error: 'No budgets found' });
        res.json(budgets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.getBudgetsByCategory = async(req, res) => {
    const categoryId = req.body;
    try {
        const budgets = await Budget.listByCategoryId(req.params.categoryId);
        if (!budgets) return res.status(404).json({ error: 'No budgets found' });
        res.json(budgets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.editBudget = async(req, res) => {
    const { categoryId, amountLimit, period, startDate, endDate } = req.body;
    if (!categoryId || !amountLimit || !period || !startDate || !endDate) {
        return res.status(400).json({ error: 'At least one field is required' });
    }
    try {
        const updatedBudget = await Budget.update({ parentId, name, type });
        res.status(201).json(updatedCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.deleteBudget = async(req, res) => {
    try {
       Budget.delete(req.params.budgetId, req.params.userId);
       res.json({ message: 'Budget deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}


