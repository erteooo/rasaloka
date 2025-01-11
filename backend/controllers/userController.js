const pool = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, email, role, created_at FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
