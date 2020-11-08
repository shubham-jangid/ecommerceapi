const Product = require("../models/product");
const formidable = require("formidable");

exports.getProductId = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "No product with this id",
      });
    }
    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "error",
      });
    }
    res.json({ fields, files });
  });
};
