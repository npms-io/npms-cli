const expect = require('chai').expect
const run = require('./run')
const package = require('../package.json')
const version = (query) => describe('version', () => {
  it('should return a version reflecting package version', (done) => {
    run('node cli.js -v', (out) => {
      expect(out).to.match(new RegExp(package.version)) && done()
    })
  })
})

module.exports = version
