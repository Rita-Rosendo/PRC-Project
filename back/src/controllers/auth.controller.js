const db = require("../models");
const config = require('../config.js')
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).save(err => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.send({ message: "User was registered successfully!" });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.app.auth_secret, {
        expiresIn: 86400 
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    });
};
