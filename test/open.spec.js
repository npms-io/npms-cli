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

describe('==> npms-cli', () => {
    describe('==> cmd/open.js', () => {
        it('should open package git project in browser', (done) => {
            // npms gulp --open git
            exec(`node ${cmd} open gulp`, (stdout) => {
                expect(stdout).to.equal('') && done();
            });
        });
    });
});
