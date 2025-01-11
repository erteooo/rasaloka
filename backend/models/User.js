const pool = require('../config/db');

class Role {
    static async create(name) {
        const [result] = await pool.query('INSERT INTO roles (name) VALUES (?)', [name]);
        return result.insertId;
    }

    static async findByName(name) {
        const [rows] = await pool.query('SELECT * FROM roles WHERE name = ?', [name]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM roles');
        return rows;
    }
}

module.exports = Role;
