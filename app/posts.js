/* eslint-env node */

// Include external dependencies

// Include local modules

// Setup
var postArray = [
  {title: "first post", text: "this is my first blog post"},
  {title: "joke", text: "I hate explaining puns to kleptomaniacs, they take everything literally"}
];

// Public
module.exports = {
  fetchAll: function fetchAll(callback) {
    // TODO fetch from db
    callback(null, postArray);
  },
  create: function create(post, callback) {
    // TODO store in db
    postArray.push(post);
    callback(null, postArray);
  }
};
