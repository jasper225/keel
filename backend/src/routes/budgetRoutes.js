const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { setBudget, getBudgetsByUser, editBudget, deleteBudget } = require('../controllers/budgetController');

router.post('/budgets', protect, setBudget);
router.get("/budgets/:id", protect, getBudgetById);
router.get('/budgets', protect, getBudgetsByUser);
router.put('/budgets', protect, editBudget);
router.delete('/budgets', protect, deleteBudget);

module.exports = router;