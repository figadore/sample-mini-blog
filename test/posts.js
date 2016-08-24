/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0 */
/* eslint max-nested-callbacks: 0 */

// Include external dependencies
var chai = require('chai');
var expect = chai.expect;

// Include local modules
var logger = require('../lib/logger');
var Posts = require('../app/posts');

// Setup
var oldLogLevel;
chai.config.includeStack = true;

describe('Posts', function connectivitySuite() {
  it("should return an array of posts", function test(done) {
    Posts.fetchAll(function onFetched(err, posts) {
      expect(err).to.not.exist;
      expect(posts).to.be.instanceof(Array);
      return done();
    });
  });
  it("should create a new post", function test(done) {
    var count;
    var post = {
      title: "review",
      text: "that movie was great"
    };
    Posts.fetchAll(function onFetched(err, posts) {
      expect(err).to.not.exist;
      count = posts.length;
      Posts.create(post, function onCreated(e, newPostsArray) {
        expect(e).to.not.exist;
        expect(newPostsArray).to.be.instanceof(Array);
        expect(newPostsArray.length).to.equal(count + 1);
        done();
      });
    });
  });
  before(function setLogLevel() {
    oldLogLevel = logger.level();
    logger.level('fatal');
  });

  after(function restoreLogLevel() {
    logger.level(oldLogLevel);
  });
});
