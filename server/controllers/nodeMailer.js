const nodemailer = require("nodemailer");

function nodeMailer(req, res, next) {
  var mailOptions, link;
  var hash = req.hash;
  var host = req.get("host");
  var clientHost = "localhost:3000";
  link = "http://" + clientHost + "/verify?token=" + hash;
  console.log(link);
  mailOptions = {
    from: "Bibek <bibekthapa922@gmail.com>",
    to: req.body.email,
    subject: "Helo Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>"
  };
  // console.log(mailOptions);
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "bibekthapa922@gmail.com",
      clientId:
        "961506971410-do0o4gf70gb8nd6agj34thpc733hsj6a.apps.googleusercontent.com",
      clientSecret: "5W-z22fljuMUTmrqJo777d50",
      refreshToken: "1/hEWa2ZfhSLr4y4q8GjtTW8NV-TiWixXaLWhTq7Ii8pU"
    }
  });
  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      transporter.close();
      res.status(200).send({
        message: "Check email to verify account."
      });
    }
  });
}

module.exports = {
  nodeMailer: nodeMailer
};
