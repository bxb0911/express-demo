const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* ------------------------------------------------------------------- */

const redis = require('redis');
const favicon = require('serve-favicon');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient(6379, '127.0.0.1');
const user = require('./middleware/user');
app.use(session({
  name: 'hdm_sid',
  store: new db,
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(user);

const router = require('./router/index');
const routes = require('./config/config.default').routes;
const Base = require('./lib/base');
const base = new Base();

routes.forEach(route => {
  app.use(base.ctxIdGen())
  base.loggers().forEach(logger => {
    app.use(logger);
  });
  app.use(route.path, router(route));
});

/* -------------------------------------------------------------------- */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
