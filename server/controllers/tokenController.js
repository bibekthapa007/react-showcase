const crypto = require("crypto");
const Token = require("../models/tokenModel");

function generateToken(req, res, next) {
  const hash = crypto.randomBytes(16).toString("hex");
  var newToken = new Token({
    _userId: req._id,
    token: hash
  });
  console.log(newToken);
  newToken.save(function(err) {
    if (err) {
      return res.status(500).send({ msg: err.message });
    } else {
      req.hash = hash;
      next();
    }
  });
}

module.exports = {
  generateToken: generateToken
};
