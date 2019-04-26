module.exports = options => {
  const { wrapper, ctrl } = options;
  const before = (req, res, next) => {
    console.log('before');
  }
  const after = () => {
    console.log('aaa')
  }
  const indexController = {
    index(req, res, next) {
      res.render('index', { title: 'Home', id: req.id });
      console.log('index');
      next();
    }
  }

  return wrapper(indexController[ctrl], before, after);
};