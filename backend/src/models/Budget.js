const { pool } = require('../config/db');

const Budget = {
    async create({ userId, categoryId, amountLimit, period, startDate, endDate }) {
        const res = await pool.query(
            `INSERT INTO budgets (user_id, category_id, amount_limit, period, start_date, end_date)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
             [userId, categoryId, amountLimit, period, startDate, endDate]
        );
    },
    async listByUserId(userId) {
        const res = await pool.query(
            `SELECT * FROM budgets
             WHERE user_id = $1
             ORDER BY created_at DESC`,
             [userId]
        );
    },
    async listByCategoryId(categoryId) {
        const res = await pool.query(
            `SELECT * FROM budgets
             WHERE category_id = $1
             ORDER BY created_at DESC`,
             [categoryId]
        );
    },
    async update(budgetId, { categoryId, amountLimit, period, startDate, endDate }) {
        const res = await pool.query(
             `UPDATE budgets SET category_id = COALESCE($1, category_id),
             amount_limit = COALESCE($2, amount_limit),
             period = COALESCE($3, period),
             start_date = COALESCE($4, start_date),
             end_date = COALESCE($5, end_date),
             WHERE id = $6
             RETURNING *`,
             [categoryId, amountLimit, period, startDate, endDate, budgetId] 
        );
    },
    async delete(budgetId) {
        await pool.query('DELETE FROM budgets WHERE id = $1', [budgetId]);
    }
}

module.exports = Budget;