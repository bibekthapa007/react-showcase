require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const apiRoute = require("./routes/routes");
var cors = require("cors");
const Image = require("./imageModel");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.send("Hi there! go to /api to query.");
});

app.post("/add-image", (req, res) => {
  console.log(req.body.data);
  const data = req.body.data;
  const NewImage = new Image(data);
  NewImage.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Succesfully item added", data);
      res.send({
        message: "Sucessful",
        data: data
      });
    }
  });
});

app.get("/images/:id", (req, res) => {
  console.log("id", req.params.id);
  const id = req.params.id;
  const perPage = 3;
  // Image.estimatedDocumentCount({}, (err, count) => {
  //   console.log("count", count);
  // });
  Image.find()
    .limit(perPage)
    .skip((id - 1) * perPage)
    .exec((err, images) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(images);
        res.send({
          message: "sucessful",
          data: images
        });
      }
    });
});

// app.use("/api", apiRoute);

app.listen(5000, () => {
  console.log("Server is running in port 5000");
});
