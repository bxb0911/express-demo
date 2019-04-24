class Controller {
  wrapHandler(handler) {
    return (req, res, next) => {
      this.beforeHandler();
      handler(req, res, next);
      this.afterHandler();
    }
  }
  beforeHandler() {
    console.log('beforecontroller');
  }
  afterHandler() {
    console.log('aftercontroller');
  }
}

module.exports = Controller;