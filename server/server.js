require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const apiRoute = require("./routes/routes");
var cors = require("cors");
const Image = require("./imageModel");
const Review = require("./reviewModel");

const app = express();
var port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
  // useFindAndModify: false
});

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

app.post("add-like", (req, res) => {
  //:TODO: add the like
});

app.post("/add-review", (req, res) => {
  // console.log(req.body);
  var options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const NewReview = new Review(req.body);

  NewReview.save((err, data) => {
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

  // Review.findOneAndUpdate({ postId: req.body.postId }, req.body, options)
  //   .then(data => res.json(data))
  //   .catch(e => console.log(e));
  //TODO:image:id user:id post:id is required
  //TODO:make the model of the review
});

app.get("/reviews/:postId", (req, res) => {
  Review.find({ postId: req.params.postId })
    .then(data => res.send(data.reverse()))
    .catch(e => console.log(e));
});

app.get("/images", (req, res) => {
  console.log("id", req.params.id);
  const id = req.params.id;
  const perPage = parseInt(req.query.perPage);
  console.log(req.query);
  // Image.estimatedDocumentCount({}, (err, count) => {
  //   console.log("count", count);
  // });
  Image.find()
    .sort({ date: "desc" })
    .limit(perPage)
    .skip((id - 1) * perPage)
    .exec((err, images) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(images);
        res.send({
          message: "sucessful",
          images: images
        });
      }
    });
});

app.get("/image/:id", (req, res) => {
  // Image.estimatedDocumentCount({}, (err, count) => {
  //   console.log("count", count);
  // });
  const id = req.params.id;
  console.log(id);

  Image.findOne({ _id: id }).exec((err, image) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(images);
      res.send({
        message: "sucessful",
        image: image
      });
    }
  });
  // .catch(e => console.log(e));
});

// app.use("/api", apiRoute);

app.listen(port, () => {
  console.log("Server is running in port 5000");
});
