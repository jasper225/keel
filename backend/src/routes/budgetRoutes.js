const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { setBudget, getBudgetsByUser, getBudgetsByCategory, editBudget, deleteBudget } = require('../controllers/budgetController');

router.post('/budgets', protect, setBudget);
router.get("/budgets/:id", protect, getBudgetById);
router.get('/budgets', protect, getBudgetsByUser);
router.get('/budgets/:categoryId', protect, getBudgetsByCategory);
router.put('/budgets', protect, editBudget);
router.delete('/budgets', protect, deleteBudget);

module.exports = router;