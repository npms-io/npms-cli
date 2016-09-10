const expect = require('chai').expect
const run = require('./run')
const json = (query) => describe('json `--output json`', () => {
  it('should return valid json', (done) => {
    run(`node cli.js search ${query} --output json`, (out) => {
      try {
        JSON.parse(out) && done()
      } catch (error) {
        throw error
      }
    })
  })

  it('should return 10 results (default)', (done) => {
    run(`node cli.js search ${query} --output json`, (out) => {
      expect(JSON.parse(out)).to.be.a('array').and.to.have.lengthOf(10) && done()
    })
  })
})

module.exports = json
