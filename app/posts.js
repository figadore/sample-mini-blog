/* eslint-env node */

// Include external dependencies
var Uuid = require('uuid');

// Include local modules

// Setup
var postArray = [
  {title: "first post", text: "this is my first blog post", id: 1},
  {title: "joke", text: "I hate explaining puns to kleptomaniacs, they take everything literally", id: 2}
];

// Public
module.exports = {
  fetchAll: function fetchAll(callback) {
    // TODO fetch from db
    callback(null, postArray);
  },
  create: function create(post, callback) {
    // TODO store in db
    post.id = Uuid.v4();
    postArray.push(post);
    callback(null, postArray);
  }
};
