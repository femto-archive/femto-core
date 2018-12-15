const Promise = require('bluebird')

const composeFile = Promise.promisify(require('composefile'))
const compose = require('docker-compose')
const path = require('path')

const Config = require('../modules/Config')
const Utils = require('../modules/Utils')
const config = new Config()


async function start(site) {
    const composeConfig = config.get(`${site}.docker`)
    const siteDir = path.join(Utils.sitesDir(), site)

    await composeFile(Object.assign({ outputFolder: siteDir }, composeConfig))

    console.log('Generated compose file...')

    await compose.upAll({
        cwd: siteDir,
        log: true
    })

    console.log('Site started')
}

;(async() => {
    start('auth')
})()

