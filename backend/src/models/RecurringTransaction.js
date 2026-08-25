const { pool } = require('../config/db');

const RecurringTransaction = {
    async create({ userId, categoryId, type, amount, period, intervalUnit, intervalCt, nextOccurence, endDate }) {
        const res = await pool.query(
            `INSERT INTO budgets (user_id, account_id, category_id, type, amount, period, interval_unit, interval_count, next_occurence, end_date)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING *`,
             [userId, categoryId, type, amount, period, intervalUnit, intervalCt, nextOccurence, endDate]
        );
        return res.rows[0];
    },
    async findById(recurringTxnId) {
        const res = await pool.query(
            `SELECT * FROM recurring_transactions
             WHERE id = $1`,
             [recurringTxnId]
        );
        return res.rows[0];
    },
    async listByUser(userId, activeOnly = true) {
        const res = await pool.query(
            `SELECT * FROM recurring_transactions
             WHERE user_id = $1 AND ($2 = false OR is_active = true)
             ORDER BY next_occurence`,
             [userId, activeOnly]
        );
        return res.rows;
    },
    async listDueTxn(asOfDate = new Date().toISOString().slice(0, 10)) {
        const res = await pool.query(
            `SELECT * FROM recurring_transactions
             WHERE is_active = true AND next_occurence <= $1
             AND (end_date IS NULL OR end_date >= next_occurence)`,
             [asOfDate]
        );
    },
    async setActive(recurringTxnId, isActive) {
        const res = await pool.query(
            `UPDATE recurring_transactions SET is_active = $1
             WHERE id = $2`,
             [isActive, recurringTxnId]
        );
    },
    async delete(recurringTxnId) {
        await pool.query(`DELETE FROM recurring_transactions WHERE id = $1`, [recurringTxnId]);
    }

}

module.exports = RecurringTransaction;