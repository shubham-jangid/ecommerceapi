const express = require("express");
var router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getCategoryId,
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryId);

router.post(
  "/:userId/category/create",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
router.get(
  "/:userId/getAllCategories",
  isSignedIn,
  isAuthenticated,
  getAllCategories
);

router.get(
  "/:userId/getCategory/:categoryId",
  isSignedIn,
  isAuthenticated,
  getCategoryById
);

router.put(
  "/:userId/updateCategory/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/:userId/deleteCategory/:categoryId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
