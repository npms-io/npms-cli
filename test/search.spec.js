'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const exec = require('./util/exec');

describe('search', () => {
    afterEach(() => nock.cleanAll());

    it('should print results using default `table` output', () => {
        nock('https://api.npms.io')
        .get('/search')
        .query({ q: 'gulp', from: '0', size: '10' })
        .reply(200, JSON.stringify(require('./fixtures/search/gulp.json')));

        return exec(['search', 'gulp', '--no-color'])
        .then((output) => {
            expect(output.stdout).to.contain('┌──');
            expect(output.stdout).to.contain('│ Package');
            expect(output.stdout).to.contain('│ gulp •');
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should print a message using default `table` output if there are no results', () => {
        nock('https://api.npms.io')
        .get('/search')
        .query({ q: 'hownpm', from: '0', size: '10' })
        .reply(200, JSON.stringify(require('./fixtures/search/hownpm.json')));

        return exec(['search', 'hownpm', '--no-color'])
        .then((output) => {
            expect(output.stdout).to.contain('┌──');
            expect(output.stdout).to.contain('│ Package');
            expect(output.stdout).to.contain('│ hownpm •');
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should work if a "minimal" package is within the results (failed analysis)', () => {
        nock('https://api.npms.io')
        .get('/search')
        .query({ q: 'gulp', from: '0', size: '10' })
        .reply(200, JSON.stringify(require('./fixtures/search/gulp.json')));

        return exec(['search', 'gulp', '--no-color'])
        .then((output) => {
            expect(output.stdout).to.contain('┌──');
            expect(output.stdout).to.contain('│ Package');
            expect(output.stdout).to.contain('│ gulp •');
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should print results in `json` format', () => {
        nock('https://api.npms.io')
        .get('/search')
        .query({ q: 'gulp', from: '0', size: '10' })
        .reply(200, JSON.stringify(require('./fixtures/search/gulp.json')));

        return exec(['search', 'gulp', '--output', 'json'])
        .then((output) => JSON.parse(output.stdout))
        .then((results) => {
            expect(results).to.be.a('array');
            expect(results[0].package.name).to.equal('gulp');
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should print an empty array using `json` output if there are no results', () => {
        nock('https://api.npms.io')
        .get('/search')
        .query({ q: 'somequerythatwillnevergiveresults', from: '0', size: '10' })
        .reply(200, JSON.stringify(require('./fixtures/search/no-results.json')));

        return exec(['search', 'somequerythatwillnevergiveresults', '--output', 'json'])
        .then((output) => JSON.parse(output.stdout))
        .then((results) => {
            expect(results).to.be.have.length(0);
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should limit results to defined size [--size, -s]', () => {
        const fixture = require('./fixtures/search/gulp.json');

        nock('https://api.npms.io')
        .get('/search')
        .query({ q: 'gulp', from: '0', size: '1' })
        .reply(200, Object.assign({}, fixture, { results: fixture.results.slice(0, 1) }));

        return exec(['search', 'gulp', '--size', '1', '--output', 'json'])
        .then((output) => JSON.parse(output.stdout))
        .then((results) => {
            expect(results).to.have.length(1);
            expect(results[0].package.name).to.equal('gulp');
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should start with offset [--from, -f]', () => {
        const fixture = require('./fixtures/search/gulp.json');

        nock('https://api.npms.io')
        .get('/search')
        .query({ q: 'gulp', from: '1', size: '10' })
        .reply(200, Object.assign({}, fixture, { results: fixture.results.slice(1) }));

        return exec(['search', 'gulp', '--from', '1', '--output', 'json'])
        .then((output) => JSON.parse(output.stdout))
        .then((results) => {
            expect(results[0].package.name).to.equal('gulp-util');
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should pass qualifiers to the API request', () => {
        nock('https://api.npms.io')
        .get('/search')
        .query({
            q: 'gulp not:deprecated',
            from: '0',
            size: '10',
        })
        .reply(200, JSON.stringify(require('./fixtures/search/gulp.json')));

        return exec(['search', 'gulp', 'not:deprecated', '--output', 'json'])
        .then((output) => JSON.parse(output.stdout))
        .then((results) => {
            expect(results).to.be.a('array');
            expect(results[0].package.name).to.equal('gulp');
            expect(nock.isDone()).to.equal(true);
        });
    });

    it('should handle API errors', () => {
        nock('https://api.npms.io')
        .get('/search')
        .query({ q: 'gulp', from: '0', size: '10' })
        .reply(500, { code: 'SOME_ERROR', message: 'Some error' });

        return exec(['search', 'gulp', '--no-color'], { printStderr: false })
        .catch((err) => {
            expect(err.status).to.equal(1);
            expect(err.output.stderr).to.contain('ERROR\n');
            expect(err.output.stderr).to.contain('SOME_ERROR');
            expect(err.output.stderr).to.contain('Some error');
            expect(nock.isDone()).to.equal(true);
        });
    });
});
