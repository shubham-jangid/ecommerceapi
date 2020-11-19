const express = require("express");

const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth.js");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getStatus,
  updateStatus,
} = require("../controllers/order");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/:userId/order/create",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

router.get("/:userId/order/all", isSignedIn, isAuthenticated, getAllOrders);
router.get("/:userId/order/status", isSignedIn, isAuthenticated, getStatus);
router.put("/:userId/order/:orderId/status", updateStatus);
module.exports = router;
