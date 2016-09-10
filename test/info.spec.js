'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const exec = require('./util/exec');

describe('info', () => {
    afterEach(() => nock.cleanAll());

    it('should print results using default `human` output', () => {
        nock('https://api.npms.io')
        .get('/module/gulp')
        .reply(200, JSON.stringify(require('./fixtures/info/gulp.json')));

        return exec(['info', 'gulp', '--no-color'])
        .then((output) => {
            expect(output.stdout).to.contain('{ analyzedAt:');
            expect(output.stdout).to.contain('  collected:');
            expect(output.stdout).to.contain('  evaluation:');
            expect(output.stdout).to.contain('  score:');
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should print results using `json` output', () => {
        nock('https://api.npms.io')
        .get('/module/gulp')
        .query({ term: 'gulp', from: '0', size: '10' })
        .reply(200, JSON.stringify(require('./fixtures/info/gulp.json')));

        return exec(['info', 'gulp', '--output', 'json'])
        .then((output) => JSON.parse(output.stdout))
        .then((info) => {
            expect(info).to.have.keys(['analyzedAt', 'collected', 'evaluation', 'score']);
        });
    });

    it('should handle API errors', () => {
        nock('https://api.npms.io')
        .get('/module/gulp')
        .query({ term: 'gulp', from: '0', size: '10' })
        .reply(500, { code: 'SOME_ERROR', message: 'Some error' });

        return exec(['info', 'gulp', '--no-color'], { printStderr: false })
        .catch((err) => {
            expect(err.status).to.equal(1);
            expect(err.output.stderr).to.contain('ERROR\n');
            expect(err.output.stderr).to.contain('SOME_ERROR');
            expect(err.output.stderr).to.contain('Some error');
            expect(nock.isDone()).to.equal(true);
        });
    });
});
