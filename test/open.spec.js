'use strict';

/* eslint-disable no-multi-spaces, semi, no-unused-vars */

const chai         = require('chai')
const assert       = chai.assert
const should       = chai.should()
const chalk        = require('chalk')
const childProcess = require('child_process');
const cmd          = require('../package.json').main;


describe(chalk.yellow('==> cmd/open.js'), () => {
    it(chalk.yellow('should open package git project in browser'), (done) => {
        // npms gulp --open git
        childProcess.exec(`node ${cmd} open gulp`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
        })
        done()
    })
})
