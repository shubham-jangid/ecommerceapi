const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("product.product", " price name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save order",
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("User", "name _id")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No order found",
        });
      }
      res.json(orders);
      b;
    });
};

exports.getStatus = (req, res) => {};

exports.updateStatus = (req, res) => {};
