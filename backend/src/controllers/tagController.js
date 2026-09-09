const Tag = require('../models/Tag');
const TransactionTag = require('../models/TransactionTag');

exports.createTag = async(req, res) => {
    const { userId, name } = req.body;
    
    if (!userId || !name) return res.status(400).json({ error: 'User ID and name are required' });

    try {
        const tag  = await Tag.create({ userId, name });
        res.status(201).json(tag);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.getTagsByUserId = async(req, res) => {
    try {
        const tags = await Tag.listByUserId(req.params.userId);
        if (!tags) return res.status(404).json({ error: 'No tags found' });
        res.json(tags);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.renameTag = async(req, res) => {
    const { tagId, name } = req.body;

    if (!tagId || !name) return res.status(400).json({ error: 'Tag ID and name are required' });

    try {
        const renamedTag = await Tag.renameTag({ tagId, name });
        res.status(201).json(renamedTag);
    } catch (err) {
       console.error(err);
       res.status(500).json({ error: 'Server error'}); 
    }
}

exports.deleteTag = async(req, res) => {    
    try {
        await Tag.delete(req.params.id);
        res.json({ message: 'Tag deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.attachTag = async(req, res) => {
    const { tagId, transactionId } = req.body;
    if (!tagId || !transactionId) return res.status(400).json({ error: 'Tag ID and transaction ID are required' });

    try {
        const attachedTag = await TransactionTag.attach({ tagId, transactionId });
        res.status(201).json(attachedTag);
    } catch (err) {
       console.error(err);
       res.status(500).json({ message: 'Server error' }); 
    }
}

exports.detachTag = async(req, res) => {    
    try {
        await TransactionTag.detach(req.params.id);
        res.json({ message: 'Tag from transaction removed' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getTransactionTags = async(req, res) => {
    try {
      const tags = await TransactionTag.getTagsForTransaction(req.params.transactionId);
      if (!tags) return res.status(404).json({ error: 'No tags found' });
      res.json(tags);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}



