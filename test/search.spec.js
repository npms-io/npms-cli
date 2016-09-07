'use strict';

/* eslint-disable no-multi-spaces, semi, no-unused-vars */

const chai         = require('chai')
const assert       = chai.assert
const should       = chai.should()
const chalk        = require('chalk')
const fs           = require('fs')
const childProcess = require('child_process');
const cmd          = require('../package.json').main;

describe(chalk.cyan('==> cmd/search.js'), () => {
    it('should return info for searched package', (done) => {
        childProcess.exec(`node ${cmd} search npms-cli --size 1`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            stdout.should.contain('https://github.com/npms-io/npms-cli')
            stdout.should.not.contain('https://github.com/sindresorhus/npm-run-path')
            done()
        })
    })
})
