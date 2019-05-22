require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");

//check the user from database
function verifyUser(req, res, next) {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (err, docs) => {
      if (err) {
        res.status(201).send("Error loding the data");
      } else if (docs === null) {
        res.status(201).send({
          isVerified: false,
          message: "Email not found."
        });
      } else if (!docs.isVerified) {
        console.log(docs.isVerified);
        return res.status(401).send({
          isVerified: false,
          message: "Your account has not been verified."
        });
      } else {
        next();
      }
    }
  );
}
function resendToken(req, res, next) {
  User.find({ email: req.body.email }, function(err, user) {
    if (!user)
      return res
        .status(400)
        .send({ msg: "We were unable to find a user with that email." });
    else {
      if (user.isVerified)
        return res.status(400).send({
          msg: "This account has already been verified. Please log in."
        });
      else {
        console.log(user._id);
        req._id = user._id;
        next();
      }
    }
  });
}
//Check Weather the user email is in database or not
function checkIsEmailUnique(req, res, next) {
  const email = req.body.email;

  User.find({ email }, (err, docs) => {
    if (err) {
      res.send("Error loding the data");
    } else if (docs.length === 0 || docs === null) {
      next();
    } else {
      res.send({
        message: "Email is already taken"
      });
    }
  });
}

//it generate token using jwt with secrectkey
function generateJwt(req, res, next) {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  jwt.sign(
    { user: user },
    process.env.PUBLIC_KEY,
    { expiresIn: "10h" },
    (err, token) => {
      res.json({
        message: "Sucessfully token generated.",
        token: token,
        user: user
      });
    }
  );
}

//Check the token is verified or not of jwt
function verifyJwt(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.PUBLIC_KEY, (err, decoded) => {
      //TODO: manage if/else statement
      if (err) {
        res.send(err);
      } else {
        console.log("Token Valid", decoded);
        next();
      }
    });
  } catch (e) {
    res.send("Token required in authorization header.");
  }
}

// add user to the datbase
function addUser(req, res, next) {
  //TODO: add the created date and active field active is false by default
  console.log("addUser is running");
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  var newUser = new User(user);
  newUser
    .save()
    .then(() => {
      req._id = newUser._id;
      console.log("User added to the database");
      next();
    })
    .catch(e => res.send(e));
}

function verifyToken(req, res, next) {
  Token.findOne({ token: req.query.token }, (err, token) => {
    console.log("token: ", token);
    if (token) {
      User.findOne({ _id: token._userId }, (err, user) => {
        console.log("User:", user);
        user.isVerified = true;
        user.save(function(err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send({
            isVerified: true,
            message: "Account has been verified"
          });
        });
      });
    } else {
      res.send({
        isVerified: false,
        message: "Token Error"
      });
    }
  });
}

module.exports = {
  verifyUser: verifyUser,
  generateJwt: generateJwt,
  checkIsEmailUnique: checkIsEmailUnique,
  addUser: addUser,
  verifyJwt: verifyJwt,
  resendToken: resendToken,
  verifyToken: verifyToken
};
