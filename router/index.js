const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = (route, base) => {
  var basePath = route.path;
  var subRoute = [route];
  if (route.sub && Array.isArray(route.sub)) {
    subRoute = route.sub;
  }
  subRoute.forEach(sr => {
    let fullPath = basePath !== sr.path ? basePath + sr.path : basePath;
    let controller = require(path.resolve('controller', route.name));
    router[sr.method || 'get'](
      fullPath, 
      controller({ wrapper: base.wrapper, ctrl: sr.name || route.name })
    );
  });

  return router;
};
