const { pool } = require("../config/db");

const ReportService = {
  async getIncomeVsExpense(userId, startDate, endDate) {
    const res = await pool.query(
      `SELECT
         COALESCE(SUM(CASE WHEN type = "income" THEN amount ELSE 0 END), 0) AS total_income,
         COALESCE(SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END), 0) AS total_expense
         FROM transactions
         WHERE user_id = $1 
         AND occured_at >= $2 
         AND occured_at <= $3`,
      [userId, startDate, endDate],
    );
    return {
      income: Number(res.rows[0].total_income),
      expense: Number(res.rows[0].total_expense),
    };
  },
  async getSpendingByCategory(userId) {
    const res = await pool.query(
      `SELECT category_id, SUM(amount) AS total_spent
             FROM transactions
             WHERE user_id = $1 AND type = 'expense'
             GROUP BY category_id`,
      [userId],
    );
    return res.rows.map((row) => ({
      categoryId: row.category_id,
      total_spent: Number(row.total_spent),
    }));
  },
};

module.exports = { ReportService };
