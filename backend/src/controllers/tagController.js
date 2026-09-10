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
    const { id } = req.params;
    try {
        await Tag.delete(id);
        res.status(204).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.attachTag = async(req, res) => {
    const { transactionId } = req.params;
    const { tagId } = req.body;
    if (!tagId || !transactionId) return res.status(400).json({ error: 'Tag ID and transaction ID are required' });

    try {
        await TransactionTag.attach({ tagId, transactionId });
        res.status(204).end();
    } catch (err) {
       console.error(err);
       res.status(500).json({ message: 'Server error' }); 
    }
}

exports.detachTag = async(req, res) => {    
    const { transactionId, tagId } = req.params;

    try {
        await TransactionTag.detach(transactionId, tagId);
        res.status(204).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}



