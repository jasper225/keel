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
    const { userId } = req.body;
    try {
        const tags = await Tag.getByUserId(userId);
        if (!tags) return res.status(404).json({ error: 'No tags found' });
        res.json(tags);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

exports.renameTag = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) return res.status(400).json({ error: 'Tag ID and name are required' });

    try {
        const renamedTag = await Tag.renameTag({ id, name });
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
    const { id } = req.params;
    const { tagId } = req.body;
    if (!tagId || !id) return res.status(400).json({ error: 'Tag ID and transaction ID are required' });

    try {
        await TransactionTag.attach({ tagId, id });
        res.status(204).end();
    } 
    catch (err) {
       console.error(err);
       res.status(500).json({ message: 'Server error' }); 
    }
}

exports.detachTag = async(req, res) => {    
    const { id, tagId } = req.params;

    try {
        await TransactionTag.detach(id, tagId);
        res.status(204).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}



