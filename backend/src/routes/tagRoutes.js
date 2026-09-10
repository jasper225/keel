const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createTag, getTagsByUserId, renameTag, deleteTag } = require('../controllers/tagController');

router.post("/tags", protect, createTag);
router.get("/tags", protect, getTagsByUserId);
router.put("/tags/:id/rename", protect, renameTag);
router.delete("/tags/:id/delete", protect, deleteTag);


module.exports = router;