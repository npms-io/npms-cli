'use strict';

/* eslint-disable no-multi-spaces, semi, no-unused-vars */

const chai         = require('chai')
const assert       = chai.assert
const should       = chai.should()
const expect       = chai.expect
const pkgInfo      = require('../package.json')
const fs           = require('fs')
const chalk        = require('chalk')
const childProcess = require('child_process');
const trim         = require('trim');

const cmd          = 'node ./cli.js';

describe(chalk.cyan('==> npms search cli'), () => {
    let ret

    it('should return results using default size [10 results] using default `table` output ', (done) => {

        childProcess.exec(`${cmd} search gulp`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            stdout.should.contain('┌──')
            stdout.should.contain('│ Package')
            stdout.should.contain('│ gulp •')
            stdout.should.contain('├───')
            stdout.should.contain('│ gulp-util •')
        })

        done()
    })

    it('should return results using default size [10 results] in json format', (done) => {
        childProcess.exec(`${cmd} search gulp --output json`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            const resultObj = JSON.parse(stdout)

            assert(resultObj.length === 10)
        })
        done()
    })

    it('should start with offset [--from, -f]', (done) => {
        childProcess.exec(`${cmd} search gulp --size 3 --from 2`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            stdout.should.not.contain('https://github.com/gulpjs/gulp')
        })
        done()
    })

    it('should limit results to defined size [--size, -s]', (done) => {
        childProcess.exec(`${cmd} search gulp --output json --size 2`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            const resultObj = JSON.parse(stdout)

            assert(resultObj.length === 2)
        })
        done()
    })

    it('should return result in JSON format [--output json, -o json]', (done) => {
        childProcess.exec(`${cmd} search gulp --output json --size 1`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            const resultObj = JSON.parse(stdout)

            assert(resultObj.length === 1)
        })
        done()
    })

    it('should scoreEffect [--scoreEffet]', (done) => {
        childProcess.exec(`${cmd} search gulp --scoreEffect 1 --size 3`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            stdout.should.not.contain('https://www.npmjs.com/package/gulped')
        })
        done()
    })

    it('should return qualityWeight [--qualityWeight]', (done) => {
        childProcess.exec(`${cmd} search gulp --scoreEffect 1 --size 2`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            stdout.should.contain('https://github.com/gulpjs/gulp')
        })
        done()
    })

    it('should return popularityWeight [--popularityWeight]', (done) => {
        childProcess.exec(`${cmd} search gulp --popularityWeight --size 1`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            stdout.should.contain('https://github.com/gulpjs/gulp')
        })
        done()
    })

    it('should return maintenanceWeight [--maintenanceWeight]', (done) => {
        childProcess.exec(`${cmd} search gulp --maintenanceWeight --size 1`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            stdout.should.contain('https://github.com/gulpjs/gulp')
        })
        done()
    })

    it('should show version [--version, -v]', (done) => {
        childProcess.exec(`${cmd} search gulp --version`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            const vers = trim(stdout)

            expect(vers).equals(pkgInfo.version)
        })
        done()
    })

    it('should show version [--help, -h]', (done) => {
        childProcess.exec(`${cmd} search gulp --help`, 'utf8', (err, stdout, stderr) => {
            if (err) { throw err }
            stdout.should.contain('The offset in which to start searching from')
        })
        done()
    })
})
