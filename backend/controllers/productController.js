const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { name, description, price, stock } = req.body;

    try {
        const productId = await Product.create(name, description, price, stock);
        res.status(201).json({ message: 'Product created successfully', productId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
