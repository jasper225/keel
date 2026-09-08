const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createBudget, getBudgetsByUser, updateBudget, deleteBudget } = require('../controllers/budgetController');

router.post('/budgets', protect, createBudget);
router.get("/budgets/:id", protect, getBudgetById);
router.get('/budgets', protect, getBudgetsByUser);
router.put('/budgets/:id/update', protect, updateBudget);
router.delete('/budgets/:id/delete', protect, deleteBudget);

module.exports = router;