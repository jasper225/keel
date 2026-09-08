const { pool } = require("../config/db");

const RecurringTransaction = {
  async create({
    userId,
    categoryId,
    type,
    amount,
    period,
    intervalUnit,
    intervalCt,
    nextOccurence,
    endDate,
  }) {
    const res = await pool.query(
      `INSERT INTO budgets (user_id, account_id, category_id, type, amount, period, interval_unit, interval_count, next_occurence, end_date)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING *`,
      [
        userId,
        categoryId,
        type,
        amount,
        period,
        intervalUnit,
        intervalCt,
        nextOccurence,
        endDate,
      ],
    );
    return res.rows[0];
  },
  async getById(id) {
    const res = await pool.query(
      `SELECT * FROM recurring_transactions
             WHERE id = $1`,
      [id],
    );
    return res.rows[0];
  },
  async getByUserId(userId, /*activeOnly = true*/ filters = {}) {
    const conditions = ["rt.user_id = $1"];
    const params = [userId];

    if (filters.before) {
      params.push(filters.before);
      conditions.push(`rt.next_occurence <= $${params.length}`);
    }
    if (filters.after) {
      params.push(filters.after);
      conditions.push(`rt.next_occurence >= $${params.length}`);
    }
    if (filters.accountId) {
      params.push(filters.accountId);
      conditions.push(`rt.account_id = $${params.length}`);
    }
    if (filters.categoryId) {
      params.push(filters.categoryId);
      conditions.push(`rt.category_id = $${params.length}`);
    }
    const res = await pool.query(
      `SELECT * FROM recurring_transactions
             WHERE user_id = $1  /* AND ($2 = false OR is_active = true) */
             ORDER BY next_occurence`,
      [userId],
    );
    return res.rows;
  },
  async getDueTxn(asOfDate = new Date().toISOString().slice(0, 10)) {
    const res = await pool.query(
      `SELECT * FROM recurring_transactions
             WHERE is_active = true AND next_occurence <= $1
             AND (end_date IS NULL OR end_date >= next_occurence)`,
      [asOfDate],
    );
    return res.rows;
  },
  async setActive(id, isActive) {
    const res = await pool.query(
      `UPDATE recurring_transactions SET is_active = $1
             WHERE id = $2`,
      [isActive, id],
    );
    return res.rows[0];
  },
  async update(
    id,
    {
      accountId,
      categoryId,
      type,
      amount,
      period,
      intervalUnit,
      intervalCt,
      nextOccurence,
      endDate,
      id,
    },
  ) {
    const res = await pool.query(
      `UPDATE transactions SET account_id = COALESCE($1, account_id),
             category_id = COALESCE($2, category_id),
             type = COALESCE($3, type)
             amount = COALESCE($4, amount)
             period = COALESCE($5, period)
             interval_unit = COALESCE($6, interval_unit)
             interval_count = COALESCE($7, interval_count)
             next_occurence = COALESCE($8, next_occurence)
             end_date = COALESCE($9, end_date)
             WHERE id = $10
             RETURNING *`,
      [
        accountId,
        categoryId,
        type,
        amount,
        period,
        intervalUnit,
        intervalCt,
        nextOccurence,
        endDate,
        id,
      ],
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query(`DELETE FROM recurring_transactions WHERE id = $1`, [id]);
  },
};

module.exports = RecurringTransaction;
