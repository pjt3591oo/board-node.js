var express = require('express');
var router = express.Router();

var posts = require('./posts');
var users = require('./posts');

/* GET home page. */
router.use('/posts', posts);
router.use('/users', users);

module.exports = router;
