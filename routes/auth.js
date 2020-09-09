var express = require("express");
var { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check } = require("express-validator");

var router = express.Router();

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name must be 3 character long"),
    check("email").isEmail().withMessage("enter valid email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should have length of 5"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("enter valid email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should have length of 5"),
  ],
  signin
);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  res.json(req.auth);
  // res.send("test route");
});

module.exports = router;
