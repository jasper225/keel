const { pool } = require("../config/db");
const { BUDGET_SORTABLE_COLUMNS, } = require("../utils/constants/sortableColumns");

const Budget = {
  async create({
    userId,
    categoryId,
    amountLimit,
    period,
    startDate,
    endDate,
  }) {
    const res = await pool.query(
      `INSERT INTO budgets (user_id, category_id, amount_limit, period, start_date, end_date)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
      [userId, categoryId, amountLimit, period, startDate, endDate],
    );
    return res.rows[0];
  },
  async getById(id) {
    const res = await pool.query(
      `SELECT * FROM budgets
             WHERE id = $1`,
      [id],
    );
    return res.rows[0];
  },
  async getByUserId(userId, sortBy = "b.amount_limit", sortDir = "asc") {
    const sortColumn = BUDGET_SORTABLE_COLUMNS[filters.sortBy] || sortBy.amountLimit;
    const sortDirection = sortDir === "desc" ? "DESC" : "ASC";

    const res = await pool.query(
      `SELECT * FROM budgets
       WHERE user_id = $1
       ORDER BY ${sortColumn} ${sortDirection}`,
      [userId],
    );
    return res.rows;
  },
  async getBudgetsByCategory(id) {
    const res = await pool.query(
      `SELECT * FROM budgets
       WHERE category_id = $1`,
      [id],
    );
    return res.rows;
  },
  async update(id, { amountLimit, period, startDate, endDate }) {
    const res = await pool.query(
      `UPDATE budgets SET amount_limit = COALESCE($1, amount_limit),
             period = COALESCE($2, period),
             start_date = COALESCE($3, start_date),
             end_date = COALESCE($4, end_date),
             WHERE id = $5
             RETURNING *`,
      [amountLimit, period, startDate, endDate, id],
    );
    return res.rows[0];
  },
  async delete(id) {
    const res = await pool.query("DELETE FROM budgets WHERE id = $1", [id]);
    return res.rows > 0;
  },
};

module.exports = Budget;
