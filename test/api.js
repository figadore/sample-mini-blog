/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0 */

// Include external dependencies
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');

// Include local modules
var logger = require('../lib/logger');
var app = require('../lib/www');

// Setup
var oldLogLevel;
chai.config.includeStack = true;
chai.use(chaiHttp);

describe('Connectivity', function connectivitySuite() {
  it("should return 200 on GET /", function testGetRoot(done) {
    chai.request(app)
      .get('/')
      .end(function onEnd(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should return 200 on GET /api", function testGetApiRoot(done) {
    chai.request(app)
      .get('/api')
      .end(function onEnd(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("should return 200 on GET /api/posts", function test(done) {
    chai.request(app)
      .get('/api/posts')
      .end(function onEnd(err, res) {
        expect(res).to.have.status(200);
        done();
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

describe('API', function connectivitySuite() {
  it("should return a list of blog posts", function test(done) {
    chai.request(app)
      .get('/api/posts')
      .end(function onEnd(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an.object;
        expect(res.body.data).to.be.instanceof(Array);
        done();
      });
  });
  it("should create a new blog post", function test(done) {
    var post = {
      title: "review",
      text: "that movie was great"
    };
    chai.request(app)
      .post('/api/posts')
      .send(post)
      .end(function onEnd(err, res) {
        expect(res).to.have.status(201);
        done();
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
