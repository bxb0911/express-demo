const Controller = require('../lib/controller');
const User = require('../lib/user');

class UsersController extends Controller {
  constructor(opts) {
    super();
    return this.wrapHandler(this[opts.ctx]);
  }
  handler(req, res, next) {
    res.render('login', { title: 'Hi~' });
  }
  submit(req, res, next) {
    const data = req.body.user;
    // 请求后台接口获取对应的 uid
    User.authenticate(data.name, data.pass, (err, userData) => {
      if (err) return next(err);
      if (userData) {
        let user = new User(userData);
        user.save(err => {
          if (err) return next(err);
          req.session.uid = user.id;
          res.redirect('/');
        });
      } else {
        res.error('Sorry! invalid credentials. ');
        res.redirect('back');
      }
    });
  }
  login(req, res) {
    res.render('login', { title: 'Login' });
  }
  logout(req, res, next) {
    const uid = req.session.uid;
    const store = req.sessionStore;
    if (!uid) return next();
    User.remove(uid, err => {
      if (err) return next(err);
      store.destroy(req.sessionID, err => {
        if (err) throw err;
        res.redirect('/');
      });
    });
  }
}

module.exports = UsersController;