'use strict';

const got = require('got');
const opn = require('opn');
const handleError = require('./util/handleError');

exports.command = 'open <package>';
exports.describe = 'Opens the package in your browser.';
exports.builder = (yargs) =>
    yargs
    .strict()
    .options({
        color: {
            describe: 'Allows disabling or enabling colored output',
            type: 'boolean',
            default: true,
        },
    });

exports.handler = (argv) => {
    got(`https://api.npms.io/module/${encodeURIComponent(argv.package)}`, { json: true })
    .then((res) => res.body.collected.metadata.links.repository || res.body.collected.metadata.links.npm)
    .then((link) => opn(link, { wait: false }))
    .then(() => { process.exitCode = 0; })
    .catch((err) => handleError(err));
};
