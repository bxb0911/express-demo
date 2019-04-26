const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = route => {
  var basePath = route.path;
  var subRoute = [route];
  if (route.sub && Array.isArray(route.sub)) {
    subRoute = route.sub;
  }
  subRoute.forEach(sr => {
    let fullPath = basePath !== sr.path ? basePath + sr.path : basePath;
    let Controller = require(path.resolve('controller', route.name));
    router[sr.method || 'get'](fullPath, (req, res, next) => {
      (new Controller({ ctx: sr.name || route.name }))(req, res, next);
    });
  })

  return router;
};
