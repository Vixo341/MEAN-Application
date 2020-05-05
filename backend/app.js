const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');

const connectUrl = 'mongodb+srv://test:RhB8cmf5t2K3jZPW@cluster0-9yl35.mongodb.net/node-angular?retryWrites=true&w=majority';


const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const app = express();

mongoose.connect(connectUrl, connectConfig)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
//RhB8cmf5t2K3jZPW
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post Added Successfully!'
  });
});


app.get("/api/posts", (req, res, next) => {
  Post.find()
  .then(documents => {
    res.status(200).json({
      message: 'Post Fetched succesfully!',
      posts: documents
      });
  });
  });


app.delete("api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post Deleted!"});
  });
});

 module.exports = app;
