const Product = require('../models/Product');

// Create a product
const createProduct = async (req, res) => {
  const { name, description, category, price, rating } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      category,
      price,
      rating
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
