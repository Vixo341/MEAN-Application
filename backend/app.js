const express = require('express');

const app = express();


app.use('/api/posts', (req, res, next) => {
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
