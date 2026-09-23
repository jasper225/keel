const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createTag, getTagsByUserId, renameTag, deleteTag, getTagById, getTagTransactions, getTagCount } = require('../controllers/tagController');

router.post("/", protect, createTag);
router.get("/:id", protect, getTagById);
router.get("/", protect, getTagsByUserId);
router.get("/:id/transactions", protect, getTagTransactions);
router.get("/:id/count", protect, getTagCount);
router.put("/:id/rename", protect, renameTag);
router.delete("/:id", protect, deleteTag);


module.exports = router;