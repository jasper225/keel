const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createCategory, getCategoryById, getCategoriesByUserId, getChildrenCategories, updateCategory, deleteCategory, getCategoryBudgets } = require('../controllers/categoryController');

router.post("/", protect, createCategory);
router.get("/:id", protect, getCategoryById);
router.get("/", protect, getCategoriesByUserId);
router.get("/:id/children", protect, getChildrenCategories);
router.get("/:id/budgets", protect, getCategoryBudgets);
router.put("/:id/update", protect, updateCategory);
router.delete("/:id/delete", protect, deleteCategory);

module.exports = router;