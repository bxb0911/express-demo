const Controller = require('../lib/controller');

class IndexController extends Controller {
  constructor(opts) {
    super();
    return this.wrapHandler(this[opts.ctx]);
  }
  index(req, res, next) {
    res.render('index', { title: 'Home', id: req.id });
  }
}

module.exports = IndexController;
