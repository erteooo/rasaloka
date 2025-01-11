const pool = require('../config/db');

class Product {
    static async create(name, description, price, stock) {
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
            [name, description, price, stock]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows;
    }

    static async updateStock(id, stock) {
        const [result] = await pool.query('UPDATE products SET stock = ? WHERE id = ?', [stock, id]);
        return result.affectedRows;
    }
}

module.exports = Product;
