const express = require("express");
const router = express.Router();

//controllers
const {
  getProductId,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  removeProduct,
  getAllProducts,
  getDistinctCategories,
} = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//routes
router.param("productId", getProductId);

router.param("userId", getUserById);

router.post(
  "/:userId/product/create",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/:productId/", getProduct);

router.get("/photo/:productId", photo);

router.put(
  "/:userId/update/:productId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/:userId/remove/:productId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

router.get("/products", getAllProducts);

router.get("/products/categories", getDistinctCategories);

module.exports = router;
