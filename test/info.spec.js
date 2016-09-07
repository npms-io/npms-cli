'use strict';

/* eslint-disable no-multi-spaces, semi, no-unused-vars */

const chai         = require('chai')
const assert       = chai.assert
const should       = chai.should()
const expect       = chai.expect
const chalk        = require('chalk')
const fs           = require('fs')
const childProcess = require('child_process');
const cmd          = require('../package.json').main;


describe(chalk.cyan('==> cmd/info.js'), () => {
    it('should return info for searched package', (done) => {
        childProcess.exec(`node ${cmd} info npms-cli --size 1 --output json`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            const resultObj = JSON.parse(stdout)

            assert(resultObj.collected.metadata.name === 'npms-cli');
        })
        done()
    })
})
