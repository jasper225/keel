const { pool } = require("../config/db");

const Account = {
  async create({ userId, name, type, currency, openingBalance }) {
    const res = await pool.query(
      `INSERT INTO accounts (user_id, name, type, currency, opening_balance)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
      [userId, name, type, currency, openingBalance],
    );
    return res.rows[0];
  },
  async getById(id) {
    const res = await pool.query(
      `SELECT * FROM accounts
             WHERE id = $1`,
      [id],
    );
    return res.rows[0];
  },
  async getByUserId(userId) {
    const res = await pool.query(
      `SELECT * FROM accounts
             WHERE user_id = $1
             ORDER BY created_at`,
      [userId],
    );
    return res.rows;
  },
  async getBalance(id) {
    const res = await pool.query(
      `SELECT current_balance FROM account_balances
             WHERE account_id = $1`,
      [id],
    );
    return res.rows;
  },
  async update(id, { name, type, currency }) {
    const res = await pool.query(
      `UPDATE categories SET name = COALESCE($1, name),
             type = COALESCE($2, type),
             currency = COALESCE($3, currency)
             WHERE id = $4
             RETURNING *`,
      [name, type, currency, id],
    );
    return res.rows[0];
  },
  async delete(id) {
    const res = await pool.query("DELETE FROM accounts WHERE id = $1", [id]);
    return res.rowCount > 0;
  },
};

module.exports = Account;
