const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");
const nodeMailer = require("../controllers/nodeMailer");

route.post("/login", userController.verifyUser, userController.generateJwt);

route.post(
  "/signin",
  userController.checkIsEmailUnique,
  userController.addUser,
  tokenController.generateToken,
  nodeMailer.nodeMailer
);

route.get("/verify", userController.verifyToken);

route.post(
  "/resendtoken",
  userController.resendToken,
  tokenController.generateToken,
  nodeMailer.nodeMailer
);

route.get("/protected", userController.verifyJwt, (req, res) => {
  res.send({
    message: "Finally api route protected!"
  });
});

route.get("/verifyJwt", userController.verifyJwt);

module.exports = route;
