const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');  // Add fs module to read files

const app = express();
const PORT = 6000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Serve static HTML files (like produkadmin.html)
app.use(express.static(path.join(__dirname, 'public'))); // Ensure "public" folder is properly served


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'produkadminn.html'));
});


// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ubah jika username MySQL Anda berbeda
  password: '', // Ubah jika password MySQL Anda berbeda
  database: 'crud_rasaloka', // Pastikan database Anda memiliki tabel 'products'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save files with unique name
  },
});

const upload = multer({ storage });

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Error fetching products' });
    }
    res.json(results);
  });
});

// Add a new product
app.post('/api/products', upload.single('image'), (req, res) => {
  const { name, description, price, stock } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, description, price, stock, image], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ message: 'Error adding product' });
    }
    res.status(201).json({
      id: result.insertId,
      name,
      description,
      price,
      stock,
      image,
    });
  });
});

// Update a product
app.put('/api/products/:id', upload.single('image'), (req, res) => {
  const { name, description, price, stock } = req.body;
  let image = req.body.image; // Use existing image if no new file uploaded
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image = ? WHERE id = ?';
  db.query(query, [name, description, price, stock, image, req.params.id], (err) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ message: 'Error updating product' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ message: 'Error deleting product' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
