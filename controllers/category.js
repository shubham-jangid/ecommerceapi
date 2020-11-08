const Category = require("../models/category");

const getCategoryId = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: " cannot find the category",
      });
    }
    req.category = category;
    next();
  });
};

const createCategory = (req, res) => {
  const category = new Category(req.body);
  console.log(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Could not save the category",
      });
    }
    res.status(200).json(category);
  });
};

const getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "no categories",
      });
    }
    res.status(200).json(categories);
  });
};
const updateCategory = (req, res) => {
  Category.findByIdAndUpdate(
    { _id: req.category.id },
    { $set: req.body },
    { new: true },
    (err, category) => {
      if (err) {
        return res.status(400).json({
          error: "could not update category",
        });
      }
      return res.status(200).json(category);
    }
  );
};

const getCategoryById = (req, res) => {
  return res.status(200).json(req.category);
};

const deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }
    res.status(200).json({ msg: `${req.category.name} Successfully deleted` });
  });
};
module.exports = {
  createCategory,
  getCategoryId,
  getAllCategories,
  updateCategory,
  getCategoryById,
  deleteCategory,
};
