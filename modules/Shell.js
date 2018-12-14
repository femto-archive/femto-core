const exec = require('child_process').exec
const path = require('path')

const Utils = require('./Utils')

class Shell {
    constructor() {
        this.currentDir = Utils.rootDir()
    }

    cwd(dir) {
        // TODO: ensure resulting path exists
        this.currentDir = path.resolve(this.currentDir, dir)
    }

    exec(cmd, shouldPrint=true) {
        return new Promise((resolve, reject) => {
            let execution = exec(cmd, {
                cwd: this.currentDir + '\\'
            }, (err) => {
                if (err) return reject(err)
                resolve()
            })

            if (shouldPrint) {
                execution.stdout.pipe(process.stdout)
            }
        })
    }
}

module.exports = Shell