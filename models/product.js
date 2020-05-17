const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 32,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    maxlength: 2000,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    maxlength: 32,
  },
  category: {},
});
