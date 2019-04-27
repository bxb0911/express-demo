const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
// 允许所有跨域请求
app.use(cors({ origin: /http:\/\/localhost:8080$/ }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/* ------------------------------------------------------------------- */

const favicon = require('serve-favicon');
const session = require('express-session');
const redisPlugin = require('./plugin/redis');
const RedisStore = require('connect-redis')(session);
const redisClient = redisPlugin({ port: 6379,  host: '127.0.0.1' });
const user = require('./middleware/user');

app.use(session({
  name: 'hdm_sid',
  store: new RedisStore({ client: redisClient }),
  secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
  unsert: 'destroy',
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
  app.use(route.path, router(route, base));
});

/* -------------------------------------------------------------------- */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
