const path = require('path');
const express = require('express');
const router = express.Router();

module.exports = route => {
  var subPath = [''] 
  if (route.sub && Array.isArray(route.sub)) {
    subPath = route.sub;
  }
  subPath.forEach(sp => {
    let ControllerIns = require(path.resolve('controller', route.name));
    router.all(route.path + sp, (req, res, next) => {
      (new ControllerIns({ ctx: sp === '' ? route.name : sp.slice(1) }))(req, res, next);
    });
  });
  return router;
};
