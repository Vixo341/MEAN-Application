const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
     );
  res.setHeader(
    "Access-Control-Allow-Methods",
     "GET, POST, PATCH, DELETE, OPTIONS"
     );
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Test post Added Successfully!'
  });
});


app.get('/api/posts', (req, res, next) => {
  const posts = [
    {id: '1',
     title: 'test backend title',
     content: 'test backend content'}
  ];
   res.status(200).json({
    message: 'Backend Post Fetched succesfully!',
    posts: posts
    });
  });

 module.exports = app;
