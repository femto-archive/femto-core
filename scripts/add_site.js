// Add a designated site to the `sites` folder.
const jetpack = require('fs-jetpack')

const Utils = require('../modules/Utils')
const Shell = require('../modules/Shell')
const Cert = require('../modules/Cert')

const cert = new Cert()

const git = require('simple-git/promise')(Utils.rootDir())

async function addSite(site) {
  site = Utils.resolveGit(site)
  const name = site.split('/').slice(-1)[0]

  // console.log('Cloning git repository')

  // await git.cwd('sites')
  //   .then(() => git.submoduleAdd(site, name))
  //   .catch(() => {} /* error is already printed by default*/)

  // console.log('Installing requirements')

  // const shell = new Shell()
  // shell.cwd(`sites/${name}`)
  // await shell.exec(`npm i`)

  // console.log('Generating certificates')

  let { public, private } = cert.createCurve()

  // save the public cert to the certs folder
  jetpack.write(`certs/${name}.pem`, public)
  jetpack.write(`sites/${name}/private.pem`, private)

  console.log(`Installed ${name}`)
}

;(async () => {
  addSite('https://github.com/femto-host/auth')
})()