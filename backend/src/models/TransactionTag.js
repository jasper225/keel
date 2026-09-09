const { pool } = require('../config/db');

const TransactionTag = {
    async attach({ tagId, transactionId }) {
        const res = await pool.query(
            `INSERT into transaction_tags (tag_id, transaction_id)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
             [tagId, transactionId]
        );
        return res.rows[0];
    },
    async detach({ tagId, transactionId }) {
        const res = await pool.query(
            `DELETE FROM transaction_tags
             WHERE tag_id = $1 AND transaction_id = $2`,
             [tagId, transactionId]
        );
        return res.rowCount > 0;
    },
    async getTagsForTransaction(transactionId) {
        const res = await pool.query(
            `SELECT t.* FROM tags t
             JOIN transaction_tags tt
             ON tt.tag_id = t.id
             WHERE tt.transaction_id = $1
             ORDER BY t.name`,
             [transactionId]
        );
        return res.rows;
    }
};

module.exports = TransactionTag;