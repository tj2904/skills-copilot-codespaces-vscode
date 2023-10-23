// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');

// Get comments
router.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(comments);
    }
  });
});

// Get single comment
router.get('/:id', function(req, res) {
  var id = req.params.id;
  Comment.findById(id, function(err, comment) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        res.json(comment);
      }
    }
  });
});

// Create comment
router.post('/', function(req, res) {
  var comment = req.body;
  User.findOne({ username: comment.username }, function(err, user) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        comment.user_id = user._id;
        Comment.create(comment, function(err, comment) {
          if (err) {
            res.status(500).json({ message: err.message });
          } else {
            res.json(comment);
          }
        });
      }
    }
  });
});

// Update comment
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var comment = req.body;
  Comment.findByIdAndUpdate(id, comment, { new: true }, function(err, comment) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      } else {
        res.json(comment);
      }
    }
  });
});

