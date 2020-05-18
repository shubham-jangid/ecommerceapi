const mongoose = require("mongoose");
const { ObjectId } = require("mongoose.Schema");

const productCartSchema = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  count: Number,
  price: Number,
  name: String,
});
const ProductCart = mongoose.model("ProductCart", productCartSchema);

const orderSchema = new mongoose.Schema(
  {
    product: [productCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, ProductCart };
