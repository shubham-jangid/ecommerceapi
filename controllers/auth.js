const User = require("../models/user");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  const user = new User(req.body);
  console.log(user);

  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: " NOT able to register the user",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }

  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        err: "USER with this email doesn't exist",
      });
    }

    if (user.authenticate(password)) {
      var token = jwt.sign({ _id: user._id }, process.env.SECRETE);
      res.cookie("token", token, { expire: new Date() + 1000 });

      const { _id, name, email, role } = user;
      res.json({
        token: token,
        user: {
          _id,
          name,
          email,
          role,
        },
      });
    } else {
      res.status(401).json({
        msg: " Incorrect Password",
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "successfully signout....." });
};

// protected routes

exports.isSignedIn = expressJwt({
  secret: process.env.SECRETE,
  userProperty: "auth",
});

// custom controllers
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!checker) {
    return res.status(403).json({
      msg: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      msg: "You are not admin, access DENIED",
    });
  }
  next();
};
