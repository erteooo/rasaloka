const pool = require('../config/db');

class User {
    static async create(username, email, password, role = 'user') {
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT id, username, email, role, created_at FROM users');
        return rows;
    }
}

module.exports = User;
