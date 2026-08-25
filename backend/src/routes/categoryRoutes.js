const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createCategory, getCategoryById, getCategoriesByUserId, getChildrenCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.post("/categories", protect, createCategory);
router.get("/categories", protect, getCategoryById);
router.get("/categories:userId", protect, getCategoriesByUserId);
router.get("/categories", protect, getChildrenCategories);
router.put("/categories", protect, updateCategory);
router.delete("/categories", protect, deleteCategory);

module.exports = router;