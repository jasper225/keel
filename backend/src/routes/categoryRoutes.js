const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createCategory, getCategoryById, getCategoriesByUserId, getChildrenCategories, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.post("/categories", protect, createCategory);
router.get("/categories/:id", protect, getCategoryById);
router.get("/categories", protect, getCategoriesByUserId);
router.get("/categories/:id/children", protect, getChildrenCategories);
router.put("/categories/:id/update", protect, updateCategory);
router.delete("/categories/:id/delete", protect, deleteCategory);

module.exports = router;