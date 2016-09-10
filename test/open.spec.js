'use strict';

const cp = require('child_process');
const expect = require('chai').expect;
const nock = require('nock');
const betray = require('betray');
const exec = require('./util/exec');

describe('open', () => {
    afterEach(() => nock.cleanAll());

    it('should open module\'s repository in browser', () => {
        nock('https://api.npms.io')
        .get('/module/gulp')
        .reply(200, JSON.stringify(require('./fixtures/open/gulp.json')));

        const betrayed = betray(cp, 'spawn', () => ({
            unref: () => {},
        }));

        return exec(['open', 'gulp'])
        .then((output) => {
            expect(output.stdout).to.equal('');
            expect(output.stderr).to.equal('');

            expect(betrayed.invoked).to.equal(1);
            expect(betrayed.invocations[0][1]).to.contain('https://github.com/gulpjs/gulp');
        });
    });

    it('should open module\'s npm page in browser if it has no repository', () => {
        nock('https://api.npms.io')
        .get('/module/query')
        .reply(200, JSON.stringify(require('./fixtures/open/query.json')));

        const betrayed = betray(cp, 'spawn', () => ({
            unref: () => {},
        }));

        return exec(['open', 'query'])
        .then((output) => {
            expect(output.stdout).to.equal('');
            expect(output.stderr).to.equal('');

            expect(betrayed.invoked).to.equal(1);
            expect(betrayed.invocations[0][1]).to.contain('https://www.npmjs.com/package/query');
        });
    });

    it('should handle API errors', () => {
        nock('https://api.npms.io')
        .get('/module/gulp')
        .query({ term: 'gulp', from: '0', size: '10' })
        .reply(500, { code: 'SOME_ERROR', message: 'Some error' });

        return exec(['open', 'gulp', '--no-color'], { printStderr: false })
        .catch((err) => {
            expect(err.status).to.equal(1);
            expect(err.output.stderr).to.contain('ERROR\n');
            expect(err.output.stderr).to.contain('SOME_ERROR');
            expect(err.output.stderr).to.contain('Some error');
            expect(nock.isDone()).to.equal(true);
        });
    });
});
