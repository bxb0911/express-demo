const Controller = require('../lib/controller');

class MembersController extends Controller {
  constructor(opts) {
    super();
    return this.wrapHandler(this[opts.ctx]);
  }
  members(req, res, next) {
    console.log('members');
    res.send('members~');
  }
  local() {
    super.beforeHandler();
    console.log('childbefore');
  }
  login() {
    super.afterHandler();
    console.log('childafter');
  }
}

module.exports = MembersController;