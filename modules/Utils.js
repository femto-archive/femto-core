const path = require('path')
const fs = require('fs')
const _ = require('lodash')

class Utils {
  constructor() {

  }

  static rootDir() {
    // Find the root directory.
    return path.join(__filename, '..', '..')
  }

  static sitesDir() {
    // Find the sites directory
    return path.join(Utils.rootDir(), 'sites')
  }

  static sites() {
    // TODO: add a way to disable a site
    const sitesDir = Utils.sitesDir()

    return fs.readdirSync(sitesDir)
      .map(folder => ({
        site: folder,
        path: path.join(sitesDir, folder),
        enabled: true
      }))
      .concat({
        site: 'core',
        path: Utils.rootDir(),
        enabled: true
      })
  }

  static enabledSites() {
    return Utils.sites().filter(site => site.enabled)
  }

  static fileExists(file) {
    return fs.existsSync(file)
  }

  static siteFromPath(file) {
    const structure = path.parse(file).dir.split(/\/|\\/g)
    const sitesDir = this.sitesDir().split(/\/|\\/g)
    
    if (_.isEqual(sitesDir, structure.slice(0, sitesDir.length))) {
      return structure[sitesDir.length]
    }

    return 'core'
  }

  static resolveGit(git) {
    // if it is already fully defined...
    if (git.indexOf('git@') === 0 || git.indexOf('https://') === 0 || git.indexOf('http://') === 0) {
      return git
    }

    if (git.contains('/')) {
      return `https://github.com/${git}`
    }

    return `https://github.com/femto-host/${git}`
  }
}

module.exports = Utils