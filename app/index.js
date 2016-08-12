/* eslint-env node */
// Customize this file with app routes and logic

// Include external dependencies
var express = require('express');

// Include local modules

// Setup

// Public
module.exports = {
  init: function init(app) {
    var apiRoot = "/api";
    var apiRouter = express.Router();
    // Set api router for app
    app.use(apiRoot, apiRouter);
    addApiRoutes(apiRouter);
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
    res.json({
      data: [
        {
          "a": "b"
        },
        {
          "c": "d"
        }
      ],
      links
    });
  });
}
