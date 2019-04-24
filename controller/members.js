const Controller = require('../lib/controller');

class MembersController extends Controller {
  constructor(opts) {
    super();
    return this.wrapHandler(this[opts.ctx]);
  }
  member(req, res, next) {
    console.log('members');
    res.send('members~');
  }
  beforeHandler() {
    super.beforeHandler();
    console.log('childbefore');
  }
  afterHandler() {
    super.afterHandler();
    console.log('childafter');
  }
}

module.exports = MembersController;