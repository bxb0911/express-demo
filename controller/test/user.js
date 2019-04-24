const User = require('../lib/user');
const user = new User({ name: 'caicai', pass: '111' });
user.save(err => {
  if (err) throw err;
  console.log('user id %d', user.id);
});