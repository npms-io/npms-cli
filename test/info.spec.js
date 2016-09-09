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


let resultObj;

describe('==> npms-cli', () =>{
    describe('==> cmd/info.js', () => {
        it('should return info for searched package', (done) => {
            exec(`node ${cmd} info npms-cli --size 1 --output json`, (stdout) => {
                resultObj = JSON.parse(stdout);
                expect(resultObj.collected.metadata.name).to.equal('npms-cli') && done();
            });
        });
    });
});
