const bcrypt = require('bcrypt');
const redisPlugin = require('../plugin/redis');
const db = redisPlugin({ port: 6379,  host: '127.0.0.1' });

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }
  // 保存用户数据
  save(cb) {
    const id = this.id;
    db.hmset(`user:${id}`, this, (err) => {
      cb(err);
    });
  }
  // 根据ID 从 Redis 哈希表中取出用户数据
  static get(id, cb) {
    db.hgetall(`user:${id}`, (err, user) => {
      if (err) return cb(err);
      cb(null, new User(user));
    });
  }
  // 用户登录认证 -----------------------> 中台应该请求后台接口
  static authenticate(name, pass, cb) {
    // 此处请求后台接口获取uid及用户信息
    // ---------------------------------
    // 暂时写死用户数据
    let userData = { id: 2, name: 'caicai' }
    cb(null, userData);
  }
  // 删除ID对应用户数据
  static remove(id, cb) {
    db.del(`user:${id}`, err => {
      cb(err);
    });
  }
}

module.exports = User;
