const expect = require('chai').expect
const cp = require('child_process')
const package = require('../package.json')

const exec = (command, callback) => {
  cp.exec(command, (error, out, stderr) => {
    if (error || stderr) throw error
    callback(out)
  })
}

describe('npmscli', () => {
  describe('search', () => {
    it('should search without error', (done) => {
      exec(`node cli.js search gulp`, (out) => {
        expect(out).to.be.a('string') && done()
      })
    })
  })

  describe('version', () => {
    it('should return a version reflecting package version', (done) => {
      exec(`node cli.js -v`, (out) => {
        expect(out).to.match(new RegExp(package.version)) && done()
      })
    })
  })

  describe('json', () => {
    it('should return valid json with 10 results (default) when using `--output json`', (done) => {
      exec(`node cli.js search gulp --output json`, (out) => {
        const json = JSON.parse(out)
        expect(json).to.be.a('array').and.to.have.lengthOf(10) && done()
      })
    })
  })
})
