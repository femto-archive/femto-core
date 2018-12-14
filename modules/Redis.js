const Promise = require('bluebird')
const redis = require('redis')

Promise.promisifyAll(redis)

class Redis {
  constructor() {
    this.client = redis.createClient(OPTIONS.core.redis.port, OPTIONS.core.redis.host, OPTIONS.core.redis.options)
  }
}

Redis.instance = new Redis()

module.exports = Redis