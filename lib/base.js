const uuid = require('uuid');
const morgan = require('morgan');

class Base {
  constructor(options) {
    this.options = Object.assign({
      uuidVersion: 'v4',
      setHeader: false,
      headerName: 'X-Request-Id',
      attributeName: 'id'
    }, options || {});
  }
  ctxIdGen() {
    const opts = this.options;
    return (req, res, next) => {
      req[opts.attributeName] = req.headers[opts.headerName.toLowerCase()] || uuid[opts.uuidVersion](opts, opts.buffer, opts.offset);
      if (opts.setHeader) {
        res.setHeader(opts.headerName, req[opts.attributeName]);
      }
      next();
    }
  }
  loggers() {
    morgan.token('id', (req) => {
      return req.id;
    });
    var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';
    return [
      morgan(loggerFormat, {
        skip: (req, res) => {
          return res.statusCode < 400
        },
        stream: process.stderr
      }), 
      morgan(loggerFormat, {
        skip:  (req, res) => {
          return res.statusCode >= 400
        },
        stream: process.stdout
    })]
  }
}

module.exports = Base;