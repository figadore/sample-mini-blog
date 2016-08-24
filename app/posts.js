/* eslint-env node */

// Include external dependencies
var Uuid = require('uuid');

// Include local modules
var postsMapper = require('./postsMapper.js');

// Setup

// Public
module.exports = {
  fetchAll: function fetchAll(callback) {
    postsMapper.findAll().then(function onFoundPosts(posts) {
      callback(null, posts);
    });
  },
  create: function create(post, callback) {
    post.id = Uuid.v4();
    postsMapper.create(post).then(function onPostCreate(result) {
      module.exports.fetchAll(callback);
    }, function onErrorCreatingPost(err) {
      callback(err);
    });
  }
};
