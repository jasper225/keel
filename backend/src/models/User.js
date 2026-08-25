const  { pool } = require('../config/db');

const User = {
     async findById(userId, options = {}) {
        const fields = ['id', 'email'];
        if (options.includePasssword) fields.push('password');
        
        const res = await pool.query(`SELECT ${fields.join(', ')} FROM users WHERE id = $1`, [userId]);
        return res.rows[0];
    },

    async findByEmail(email, options = {}) {
        const fields = ['id', 'email'];
        if (options.includePassword) fields.push('password');

        const res = await pool.query(`SELECT ${fields.join(', ')} FROM users WHERE email = $1`, [email]);
        return res.rows[0];
    },

    async findOne(criteria = {}) {
         if (criteria.userId) return this.findById(criteria.userId);
         if (criteria.email) return this.findByEmail(criteria.email);
         return null;
    },

    async create({ email, passwordHash }) {
        const res = await pool.query(
        `INSERT INTO users (email, password_hash) 
         VALUES ($1, $2) 
         RETURNING email, password_hash`,
        [email, passwordHash]
        );
        return res.rows[0];
    },

    async updateProfile(userID, { email }) {
        const res = await pool.query(
        `UPDATE users 
         email = COALESCE($1, email) WHERE id = $2 
         RETURNING id, email`,
        [email, userID]
        );
        return res.rows[0];
    },
    
    async deleteProfile(userID) {
        const res = await pool.query('DELETE FROM users WHERE user_id = $1', [userID]);
        return res.rowCount > 0;
    }
}

module.exports = User;