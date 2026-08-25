const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createTag, getTagsByUserId, renameTag, deleteTag, attachTag, detachTag, getTransactionTags, getTagTransactions } = require('../controllers/tagController');

router.post("/tags", protect, createTag);
router.get("/tags:userId", protect, getTagsByUserId);
router.put("/tags", protect, renameTag);
router.delete("/tags", protect, deleteTag);
router.post("/tags", protect, attachTag);
router.delete("/tags", protect, detachTag);
router.get("/tags:transactionId", protect, getTransactionTags);
router.get("/tags", protect, getTagTransactions);

module.exports = router;