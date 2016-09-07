const assert = require('assert')
const child_process = require('child_process')
const package = require('./package.json')

describe('npmscli', () => {
  describe('search', () => {
    it('should search without error', (done) => {
      child_process.exec(`node cli.js search gulp`, (error, stdout, stderr) => {
        if (!error && stdout.length) done()
      })
    })
  })

  describe('version', () => {
    it('should return a version reflecting package version', (done) => {
      child_process.exec(`node cli.js -v`, (error, stdout, stderr) => {
        if (!error && stdout.length && stdout.match(package.version)) done()
      })
    })
  })
})
