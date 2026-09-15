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
  async getSpendingByCategory(userId, startDate, endDate) {
    const res = await pool.query(
      `SELECT c.name AS category_name, SUM(t.amount) AS total_spent, 
             FROM transactions t
             JOIN categories c
             ON c.id = t.category_id
             WHERE t.user_id = $1 
             AND t.type = 'expense'
             AND t.occured_at >= $2
             AND t.occured_at <= $3
             GROUP BY c.name`,
      [userId, startDate, endDate],
    );
    return res.rows.map((row) => ({
      categoryName: row.category_name,
      total_spent: Number(row.total_spent),
    }));
  },
};

module.exports = { ReportService };
