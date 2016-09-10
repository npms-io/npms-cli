const expect = require('chai').expect
const run = require('./run')
const search = (query) => describe('search', () => {
  it('should search without error', (done) => {
    run(`node cli.js search ${query}`, (out) => {
      expect(out).to.be.a('string') && done()
    })
  })

  it('should return relevant results', (done) => {
    run(`node cli.js search ${query}`, (out) => {
      expect(out).to.match(new RegExp(query)) && done()
    })
  })
})

module.exports = search
