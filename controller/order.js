module.exports = options => {
  const { wrapper, ctrl } = options;
  const before = (req, res, next) => {
    console.log('before');
  }
  const after = () => {
    console.log('aaa');
  }
  const orderController = {
    order(req, res, next) {
      res.json({
        errNo: 0,
        errStr: 'success',
        data: [
          {id: 1, name: '订单一'},
          {id: 2, name: '订单二'},
          {id: 3, name: '订单三'},
          {id: 4, name: '订单四'},
          {id: 5, name: '订单五'},
          {id: 6, name: '订单六'}
        ]
      });
      next();
    }
  }
  return wrapper(orderController[ctrl], before, after);
};