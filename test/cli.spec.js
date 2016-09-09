'use strict';

/* global describe, it*/

const chai = require('chai');
const expect = chai.expect;
const pkgInfo = require('../package.json');
const childProcess = require('child_process');
const cli = require('../package.json').main;
const cmd = `node ${cli}`;

let resultObj;

const exec = (command, callback) => {
    childProcess.exec(command, (error, out, stderr) => {
        if (error || stderr) { throw error; }
        callback(out);
    });
};

describe('==> npms-cli', () => {
    describe('==> cli', () => {
        it('should search without error', (done) => {
            exec('node cli.js search gulp', (stdout) => {
                expect(stdout).to.be.a('string') && done();
            });
        });

        it('should return results using default size [10 results] using default `table` output ', (done) => {
            exec(`${cmd} search gulp`, (stdout) => {
                expect(stdout).to.contain('┌──');
                expect(stdout).to.contain('│ Package');
                expect(stdout).to.contain('│ gulp •');
                expect(stdout).to.contain('├───');
                expect(stdout).to.contain('│ gulp-util •');
                done();
            });
        });

        it('should return results using default size [10 results] in json format', (done) => {
            exec(`${cmd} search gulp --output json`, (stdout) => {
                expect(stdout).to.be.a('string');
                resultObj = JSON.parse(stdout);
                expect(resultObj.length).to.equal(10) && done();
            });
        });

        it('should start with offset [--from, -f]', (done) => {
            exec(`${cmd} search gulp --size 3 --from 2`, (stdout) => {
                expect(stdout).to.contain('https://github.com/terinjokes/gulp-uglify') && done();
            });
        });

        it('should limit results to defined size [--size, -s]', (done) => {
            exec(`${cmd} search gulp --output json --size 2`, (stdout) => {
                resultObj = JSON.parse(stdout);
                expect(resultObj.length).to.equal(2) && done();
            });
        });

        it('should return result in JSON format [--output json, -o json]', (done) => {
            exec(`${cmd} search gulp --output json --size 1`, (stdout) => {
                resultObj = JSON.parse(stdout);
                expect(resultObj.length).to.equal(1) && done();
            });
        });

        it('should scoreEffect [--scoreEffet]', (done) => {
            exec(`${cmd} search gulp --scoreEffect 1 --size 3`, (stdout) => {
                expect(stdout).to.not.contain('https://www.npmjs.com/package/gulped') && done();
            });
        });

        it('should return qualityWeight [--qualityWeight]', (done) => {
            exec(`${cmd} search gulp --scoreEffect 1 --size 2`, (stdout) => {
                expect(stdout).to.contain('https://github.com/gulpjs/gulp') && done();
            });
        });

        it('should return popularityWeight [--popularityWeight]', (done) => {
            exec(`${cmd} search gulp --popularityWeight --size 1`, (stdout) => {
                expect(stdout).to.contain('https://github.com/gulpjs/gulp') && done();
            });
        });

        it('should return maintenanceWeight [--maintenanceWeight]', (done) => {
            exec(`${cmd} search gulp --maintenanceWeight --size 1`, (stdout) => {
                expect(stdout).to.contain('https://github.com/gulpjs/gulp') && done();
            });
        });

        it('should show version [--version, -v]', (done) => {
            exec(`${cmd} search gulp --version`, (stdout) => {
                expect(stdout).contain(pkgInfo.version) && done();
            });
        });

        it('should show version [--help, -h]', (done) => {
            exec(`${cmd} search gulp --help`, (stdout) => {
                expect(stdout).to.contain('The offset in which to start searching from') && done();
            });
        });
    });
});
