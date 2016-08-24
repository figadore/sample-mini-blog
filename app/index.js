/* eslint-env node */

// Include external dependencies
var express = require('express');

// Include local modules
var posts = require('./posts');
var db = require('./db');

// Setup

// Public
module.exports = {
  init: function init(app) {
    var apiRoot = "/api";
    var apiRouter = express.Router();
    // Set api router for app
    app.use(apiRoot, apiRouter);
    addApiRoutes(apiRouter);
    // Return a promise, delays app start until promise complete
    return db.sync();
  }
};

var links = [
    {
      href: "/",
      rel: "root",
      description: "Blog API Root",
      method: "GET",
      returns: [
        "application/json"
      ]
    },
    {
      href: "/posts",
      rel: "posts",
      description: "List of blog posts",
      method: "GET",
      returns: [
        "application/json"
      ]
    },
    {
      href: "/posts",
      rel: "create-post",
      description: "Create a new blog post",
      method: "POST",
      accepts: [
        "application/json"
      ],
      returns: [
        "application/json"
      ]
    }
];
/**
 * Add routes to express app
 *
 * @param {object} apiRouter
 */
function addApiRoutes(apiRouter) {
  // Root, return a list of available links
  apiRouter.get('/', function onRequest(req, res, next) {
    res.json({
      data: {},
      links
    });
  });

  apiRouter.get('/posts', function onRequest(req, res, next) {
    posts.fetchAll(function onFetched(err, data) {
      res.json({
        data,
        links
      });
    });
  });

  apiRouter.post('/posts', function onRequest(req, res, next) {
    posts.create(req.body, function onCreated(err, data) {
      res.status(201);
      res.json({
        data,
        links
      });
    });
  });
}
