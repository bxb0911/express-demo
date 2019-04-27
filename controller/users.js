const User = require('../lib/user');

module.exports = options => {
  const { wrapper, ctrl } = options;
  const before = (req, res, next) => {
    console.log('before');
  }
  const after = () => {
    console.log('aaa');
  }
  const usersController = {
    handler(req, res, next) {
      res.render('login', { title: 'Hi~' });
      console.log('users');
      next();
    },
    submit(req, res, next) {
      const data = req.body.user;
      // res.set('Access-Control-Allow-Origin', 'http://localhost:8080')
      // res.set('Access-Control-Allow-Credentials', 'true')
      // 请求后台接口获取对应的 uid
      User.authenticate(data.name, data.pass, (err, userData) => {
        if (err) return next(err);
        if (userData) {
          let user = new User(userData);
          user.save(err => {
            if (err) return next(err);
            req.session.uid = user.id;
            console.log(req.session.uid)
            res.json({
              errNo: 0,
              errStr: 'success'
            })
            // res.redirect('/');
          });
        } else {
          res.error('Sorry! invalid credentials. ');
          res.redirect('back');
        }
        console.log('submit');
        next();
      });
    },
    login(req, res, next) {
      const uid = req.session.uid;
      if (uid) {
        res.redirect('/');
      } else {
        res.render('login', { title: 'Login' });
      }
      console.log('login');
      next();
    },
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
        console.log('logout');
        next();
      });
    }
  }
  return wrapper(usersController[ctrl], before, after);
};