const { pool } = require("../config/db");

const Category = {
  async create({ userId, parentId, name, type }) {
    const res = await pool.query(
      `INSERT INTO categories (user_id, parent_id, name, type)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
      [userId, parentId, name, type],
    );
    return res.rows[0];
  },

  async getById(id) {
    const res = await pool.query(
      `SELECT * FROM categories
             WHERE id = $1`,
      [id],
    );
    return res.rows[0];
  },

  async getByUserId(userId) {
    const res = await pool.query(
      `SELECT * FROM categories
             WHERE user_id = $1`,
      [userId],
    );
    return res.rows;
  },

  async getChildren(id) {
    const res = await pool.query(
      `SELECT * FROM categories
             WHERE parent_category_id = $1
             ORDER BY name ASC`,
      [id],
    );
    return res.rows;
  },

  async getBudgets(id) {
    const res = await pool.query(
      `SELECT id FROM categories c
       JOIN budgets b
       ON b.category_id = c.id
       WHERE c.id = $1`,
      [id],
    );
    return res.rows;
  },

  async update(id, { name, type }) {
    const res = await pool.query(
      `UPDATE categories SET,
             name = COALESCE($1, name),
             type = COALESCE($2, type)
             WHERE id = $3
             RETURNING *`,
      [name, type, id],
    );
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    return res.rowCount > 0;
  },
};

module.exports = Category;
