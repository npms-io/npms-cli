const exec = require('child_process').exec
const run = (cmd, callback) => {
  exec(cmd, (error, out, stderr) => {
    if (error || stderr) throw error
    callback(out)
  })
}

module.exports = run
