const express = require("express");
const router = express.Router();

const { getProductId, createProduct } = require("../controllers/product");
const { userId } = require("../controllers/user");

router.param("productId", getProductId);

router.post("/:userId/createProduct", createProduct);

module.exports = router;
