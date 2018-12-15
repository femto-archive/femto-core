const stackTrace = require('stack-trace')
const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const Utils = require('./Utils')

/*
 * A configuration file for a site can be stored in many different ways.
 * Configuration at the top level, e.g. /config.json is passed into a sites
 * top level.  You may store multiple config files in a 'config' folder.
 * If a 'config.(js|json)' file is found it is stored at the top level itself.
 * If other files are found there, they are stored in sublayers of the config
 * object according to their name.
 * 
 * If any config file has a 'global' object, it is raised to the top level of
 * configuration.
 */

class Config {
  constructor() {
    // load all config files.
    this.config = {}

    Utils.enabledSites()
      .map(site => {
        this.config[site.site] = {}

        // first, we check for a top level config file.
        const configs = [
          path.join(site.path, 'config.js'),
          path.join(site.path, 'config.json'),
          path.join(site.path, 'config', 'config.js'),
          path.join(site.path, 'config', 'config.json')
        ]
        
        configs
          .filter(config => Utils.fileExists(config))
          .forEach(config => this.load(this.config, site.site, require(config)))

        const configDir = path.join(site.path, 'config')

        if (Utils.fileExists(configDir))
          fs.readdirSync(configDir)
            .filter(file => file.endsWith('js') || file.endsWith('json'))
            .filter(file => file.split('.')[0] !== 'config')
            .forEach(file => this.load(this.config, site.site + '.' + file.split('.')[0], require(path.join(configDir, file))))
      })
  }

  load(config, jPath, object) {
    if ('global' in object) {
      config = Object.assign(config, object.global)
      delete object.global
    }

    const existing = _.get(config, jPath)
    _.set(config, jPath, Object.assign(typeof existing === 'undefined' ? {} : existing, object))
  }

  get() {
    return _.get(
      this.config,
      Array.from(arguments)
        .map(item => String(item))
        .join('.')
    )
  }

  site() {
    return _.get(
      this.config,
      [Utils.siteFromPath(stackTrace.get()[1].getFileName())]
        .concat(Array.from(arguments))
        .map(item => String(item))
        .join('.')
    )
  }
}

module.exports = Config