const jwt = require("jsonwebtoken");
const config = require('../config.js')
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) 
    return res.status(403).send({ message: "No token provided!" });

  jwt.verify(token, config.app.auth_secret, (err, decoded) => {
    if (err) 
      return res.status(401).send({ message: "Unauthorized!" });
    req.userId = decoded.id;
    next();
  });
};

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    } else {
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        } else {
          next();
        }
      });
    }
  });
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  verifyToken
};
