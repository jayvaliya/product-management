const mongoose = require('mongoose');
const URL = process.env.databaseURL;

mongoose.connect(URL);

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 40,
  },
  password: {
    type: String,
    required: true,
    maxlength: 20,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to Product model
    },
  ],
});
const User = mongoose.model('User', UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
});
const Product = mongoose.model('Product', ProductSchema);

module.exports = {
  User,
  Product,
};
