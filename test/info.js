const expect = require('chai').expect
const run = require('./run')
const info = (query) => describe('info', () => {
  it('should get info without error', (done) => {
    run(`node cli.js info ${query}`, (out) => {
      expect(out).to.be.a('string') && done()
    })
  })
})

module.exports = info
