const { pool } = require('../config/db');

const Budget = {
    async create({ userId, categoryId, amountLimit, period, startDate, endDate }) {
        const res = await pool.query(
            `INSERT INTO budgets (user_id, category_id, amount_limit, period, start_date, end_date)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
             [userId, categoryId, amountLimit, period, startDate, endDate]
        );
        return res.rows[0];
    },
    async findById(budgetId) {
        const res = await pool.query(
            `SELECT * FROM budgets
             WHERE id = $1`,
             [budgetId]
        );
        return res.rows;
    },
    async listByUserId(userId, filters={}) {
        const conditions = ['b.user_id = $1'];
        const params = [userId];

        if (filters.startDate) {
            params.push(filters.startDate);
            conditions.push(`b.start_date = $${params.length}`);
        }
        if (filters.endDate) {
            params.push(filters.endDate);
            conditions.push(`b.end_date = $${params.length}`);
        }
        if (filters.categoryId) {
            params.push(filters.categoryId);
            conditions.push(`b.category_id = $${params.length}`);
        }


        const res = await pool.query(
            `SELECT * FROM transactions
             WHERE user_id = $1
             ORDER BY occured_at DESC`,
             [userId]
        );
        return res.rows;
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
        return res.rows[0];
    },
    async delete(budgetId) {
        const res = await pool.query('DELETE FROM budgets WHERE id = $1', [budgetId]);
        return res.rows > 0;
    }
}

module.exports = Budget;