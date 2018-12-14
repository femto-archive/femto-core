class Options {
  constructor() {}

  init() {
    global.OPTIONS = {
      core: {
        redis: {
          port: 6379,
          host: '127.0.0.1',
          options: {}
        }
      }
    }
  }
}

module.exports = Options