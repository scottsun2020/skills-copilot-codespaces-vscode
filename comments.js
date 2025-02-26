// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');

mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/comments', function(req, res) {
  var comment = new Comment({
    name: req.body.name,
    email: req.body.email,
    text: req.body.text
  });

  comment.save(function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(comment);
  });
});