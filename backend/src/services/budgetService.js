const { pool } = require("../config/db");

function getPeriodRange(period, referenceDate = new Date()) {
  const start = new Date(referenceDate);
  const end = new Date(referenceDate);

  if (period === "weekly") {
    const day = start.getDay();
    start.setDate(start.getDate() - day); // start of week (Sunday)
    end.setDate(start.getDate() + 6);
  } else if (period === "monthly") {
    start.setDate(1);
    end.setMonth(end.getMonth() + 1, 0); // last day of current month
  } else if (period === "yearly") {
    start.setMonth(0, 1);
    end.setMonth(11, 31);
  }

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

const BudgetService = {
  // spend vs. limit for a single budget's current period
  async getProgress(id) {
    const { rows: budgetRows } = await pool.query(
      `SELECT * FROM budgets WHERE id = $1`,
      [id],
    );
    const budget = budgetRows[0];
    if (!budget) return null;

    const { start, end } = getPeriodRange(budget.period);

    const { rows } = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS spent
       FROM transactions
       WHERE user_id = $1
         AND category_id = $2
         AND type = 'expense'
         AND occurred_at >= $3
         AND occurred_at <= $4`,
      [userId, budget.category_id, start, end],
    );

    const spent = Number(rows[0].spent);
    return {
      budget,
      spent,
      remaining: Number(budget.amount_limit) - spent,
      percentUsed:
        budget.amount_limit > 0 ? (spent / budget.amount_limit) * 100 : 0,
      periodStart: start,
      periodEnd: end,
    };
  },

  // progress for every one of a user's budgets — powers the /budgets list page
  async getAllProgress(userId) {
    const { rows: budgets } = await pool.query(
      `SELECT * FROM budgets WHERE user_id = $1`,
      [userId],
    );

    return Promise.all(
      budgets.map((budget) => this.getProgress(budget.id, userId)),
    );
  },
};

module.exports = { BudgetService };
