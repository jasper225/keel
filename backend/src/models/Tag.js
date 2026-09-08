const { pool } = require("../config/db");

const Tag = {
  async create({ userId, name }) {
    const res = await pool.query(
      `INSERT INTO tags (user_id, name)
            VALUES ($1, $2)
            ON CONFLICT (user_id, name) DO NOTHING
            RETURNING *`,
      [userId, name],
    );
    return res.rows[0];
  },
  async listByUserId(userId) {
    const res = await pool.query(
      `SELECT * FROM tags
             WHERE user_id = $1
             ORDER BY name ASC`,
      [userId],
    );
    return res.rows;
  },
  async renameTag({ id, newName }) {
    const res = await pool.query(
      `UPDATE tags SET name = $1
             WHERE id = $2
             RETURNING *`,
      [newName, id],
    );
    return res.rows[0];
  },
  async delete(id) {
    const res = await pool.query("DELETE FROM tags WHERE id = $1", [id]);
    return res.rowCount > 0;
  },
};

module.exports = Tag;
