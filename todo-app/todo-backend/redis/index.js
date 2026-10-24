
const redis = require('redis');
const { REDIS_URL } = require('../util/config');

let get;
let set;
let incr;
let decr;

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled');
    return null;
  };

  get = redisIsDisabled;
  set = redisIsDisabled;
  incr = redisIsDisabled;
  decr = redisIsDisabled;
} else {
  const client = redis.createClient({
    url: REDIS_URL,
  });

  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  client.connect()
    .then(() => console.log('Connected to Redis'))
    .catch((err) => console.error('Redis connection failed', err));

  get = (...args) => client.get(...args);
  set = (...args) => client.set(...args);
  incr = (...args) => client.incr(...args);
  decr = (...args) => client.decr(...args);
}

module.exports = {
  get,
  set,
  incr,
  decr,
};
