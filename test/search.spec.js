'use strict';

/* global describe, it */

const chai = require('chai');
const expect = chai.expect;
const childProcess = require('child_process');
const cmd = require('../package.json').main;

const exec = (command, callback) => {
    childProcess.exec(command, (error, out, stderr) => {
        if (error || stderr) { throw error; }
        callback(out);
    });
};

describe('=-> npms-cli', () => {
    describe('==> cmd/search.js', () => {
        it('should return info for searched package', (done) => {
            exec(`node ${cmd} search npms-cli --size 1`, (stdout) => {
                expect(stdout).to.contain('https://github.com/npms-io/npms-cli');
                expect(stdout).to.not.contain('https://github.com/sindresorhus/npm-run-path');
                done();
            });
        });
    });
});
