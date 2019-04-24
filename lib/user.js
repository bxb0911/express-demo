const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient(6379, '127.0.0.1');

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }
  // 保存用户信息
  save(cb) {
    if (this.id) {
      this.update(cb);
    } else {
      db.incr('user:ids', (err, id) => {
        if (err) return cb(err);
        this.id = id;
        this.hashPassword(err => {
          if (err) return cb(err);
          this.update(cb);
        });
      });
    }
  }
  // 更新用户信息
  update(cb) {
    const id = this.id;
    db.set(`user:id:${this.name}`, id, err => {
      if (err) return cb(err);
      db.hmset(`user:${id}`, this, (err) => {
        cb(err);
      });
    });
  }
  // 密码加密
  hashPassword(cb) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err);
      this.salt = salt;
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if (err) return cb(err);
        this.pass = hash;
        cb();
      });
    });
  }
  // 根据名称查找用户ID
  static getByName(name, cb) {
    User.getId(name, (err, id) => {
      if (err) return cb(err);
      User.get(id, cb);
    });
  }
  // 查找用户ID
  static getId(name, cb) {
    db.get(`user:id:${name}`, cb);
  }
  // 根据ID 从 Redis 哈希表中取出用户数据
  static get(id, cb) {
    db.hgetall(`user:${id}`, (err, user) => {
      if (err) return cb(err);
      cb(null, new User(user));
    });
  }
  // 用户登录认证
  static authenticate(name, pass, cb) {
    User.getByName(name, (err, user) => {
      if (err) return cb(err);
      if (!user.id) return cb();
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (err) return cb(err);
        if (hash == user.pass) return cb(null, user);
        cb();
      });
    });
  }
}

module.exports = User;
