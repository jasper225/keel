const { pool } = require("../config/db");

const DashboardService = {
  async getNetWorth(userId) {
    const res = await pool.query(
      `
      SELECT
      (SELECT COALESCE(SUM(opening_balance), 0) FROM accounts WHERE user_id = $1) 
      + COALESCE(SUM(
                CASE
                    WHEN type = 'income' THEN amount
                    WHEN type = 'expense' THEN -amount
                    ELSE 0
                END
             ), 0) AS net_worth
             FROM transactions
             WHERE user_id = $1`,
      [userId],
    );
    return Number(res.rows[0].net_worth);
  },

  async getRecentTransactions(userId) {
    const res = await pool.query(
      `SELECT * FROM transactions
       WHERE user_id = $1 
       ORDER BY occured_at DESC
       LIMIT 3`,
      [userId],
    );
    return res.rows;
  },

  async getUpcomingRecurringTxn(userId) {
    const res = await pool.query(
      `SELECT * FROM recurring_transactions
       WHERE user_id = $1
       ORDER BY next_occurence ASC
       LIMIT 3`,
      [userId],
    );
    return res.rows;
  },
};

module.exports = { DashboardService };
