const { pool } = require('../config/db');

const Category = {
    async create({ userId, parentId, name, type }) {
        const res = await pool.query(
            `INSERT INTO categories (user_id, parent_id, name, type)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [userId, parentId, name, type]
        );
    },

    async findById(categoryId) {
        const res = await pool.query(
            `SELECT * FROM categories
             WHERE id = $1`,
             [categoryId]
        );
        return res.rows[0];
    },

    async findByUserId(userId) {
        const res = await pool.query(
            `SELECT * FROM categories
             WHERE user_id = $1`,
             [userId]
        );
        return res.rows;
    },

    async findChildren(parentId) {
        const res = await pool.query(
            `SELECT * FROM categories
             WHERE parent_category_id = $1
             ORDER BY name ASC`,
             [parentId]
        );
        return res.rows;
    },

    async update(categoryId, { parentId, name, type}) {
        const res = await pool.query(
            `UPDATE categories SET parent_id = COALESCE($1, parent_id),
             name = COALESCE($2, name),
             type = COALESCE($3, type)
             WHERE id = $4
             RETURNING *`,
             [parentId, name, type, categoryId]  
        );
    },

    async delete(categoryId) {
        const res = await pool.query('DELETE FROM categories WHERE id = $1', [categoryId]);
        return res.rowCount > 0;
    }

}

module.exports = Category;