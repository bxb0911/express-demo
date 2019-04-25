const Redis = require('ioredis');

module.exports = options => {
  let redis;
  if (options.mode === 'cluster') {
    redis = new Redis.Cluster(options.nodes, options.redisOptions);
  } else {
    redis = new Redis(options);
  }
  return redis;
};