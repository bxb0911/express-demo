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
    const data = req.body;
    User.authenticate(data['user[name]'], data['user[pass]'], (err, user) => {
      if (err) return next(err);
      if (user) {
        req.session.uid = user.id;
        res.redirect('/');
      } else {
        res.error('Sorry! invalid credentials. ');
        res.redirect('back');
      }
    });
  }
  login(req, res) {
    res.render('login', { title: 'Login' });
  }
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect('/');
    })
  }
}

module.exports = UsersController;