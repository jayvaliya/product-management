const { Router } = require('express');
const { Product } = require('../db');
const userMiddleware = require('../middlewares/user');
const productRouter = Router();

// Get all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch products', details: error.message });
  }
});

// Create a new product
productRouter.post('/', userMiddleware, async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const product = new Product({
      name,
      description,
      quantity,
      price,
      userId: req.user._id,
    });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to create product', details: error.message });
  }
});

// Get a product by ID
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch product', details: error.message });
  }
});

// Delete a product by ID
productRouter.delete('/:id', userMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the user owns the product
    if (product.userId.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ error: 'Unauthorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to delete product', details: error.message });
  }
});

module.exports = productRouter;
