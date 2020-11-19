const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema;

const productCartSchema = new mongoose.Schema({
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
    amount: Number,
    address: String,
    updated: Date,
    status: {
      type: String,
      default: "Recieved",
      enum: ["Recieved", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart };
