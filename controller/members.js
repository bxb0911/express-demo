module.exports = options => {
  const { wrapper, ctrl } = options;
  const before = (req, res, next) => {
    console.log('before');
  }
  const after = () => {
    console.log('aaa');
  }
  const membersController = {
    members(req, res, next) {
      res.send('members~');
      console.log('index');
      next();
    }
  }
  return wrapper(membersController[ctrl], before, after);
};