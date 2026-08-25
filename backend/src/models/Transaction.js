const { pool } = require('../config/db');

const Transaction = {
    async create({ userId, accountId, categoryId, type, amount, transferAccountId, occuredAt }) {
        const res = await pool.query(
            `INSERT INTO transactions (
             user_id, account_id, category_id, transaction_type, amount, transfer_account_id, occured_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [userId, accountId, categoryId, type, amount, transferAccountId, occuredAt]
        );

        return res.rows[0];
    },

    async findById(transactionId) {
        const res = await pool.query(
            `SELECT * FROM transactions
             WHERE id = $1`,
             [transactionId]
        );
        return res.rows[0];
    },

    async listByUserId(userId) {
        const res = await pool.query(
            `SELECT * FROM transactions
             WHERE user_id = $1
             ORDER BY occured_at DESC`,
             [userId]
        );
        return res.rows;
    },
    async listByAccountId(userId) {
        const res = await pool.query(
            `SELECT * FROM transactions
             WHERE account_id = $1
             ORDER BY occured_at DESC`,
             [userId]
        );
        return res.rows;
    },
    async update(transactionId, { accountId, categoryId, type, amount, transferAccountId, occuredAt }) {
        const res = await pool.query(
            `UPDATE transactions SET account_id = COALESCE($1, account_id),
             category_id = COALESCE($2, category_id),
             type = COALESCE($3, type)
             amount = COALESCE($4, amount)
             transfer_account_id = COALESCE($5, transferAccountId)
             occured_at = COALESCE($6, occured_at)
             WHERE id = $7
             RETURNING *`,
             [accountId, categoryId, type, amount, transferAccountId, occuredAt, transactionId]  
        );
        return res.rows[0];
    },

    async delete(transactionId) {
        const res = await pool.query('DELETE FROM transactions WHERE id = $1', [transactionId]);
        return res.rowCount > 0;
    }


}

module.exports = Transaction;