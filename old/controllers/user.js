const User = require("../models/user");
const { Order } = require("../models/order");

const getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        msg: "No user found",
      });
    }
    req.profile = user;
    next();
  });
};

const getUser = (req, res) => {
  // TODO: get back here for password
  req.profile.encry_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile.id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          msg: "Unable to update user data",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.status(200).json(user);
    }
  );
};

const userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in this account",
        });
      }
      res.status(200).json(order);
    });
};

const pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "unable to save purchase list",
        });
      }
      next();
    }
  );
};

module.exports = {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
  pushOrderInPurchaseList,
};
