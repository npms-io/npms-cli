'use strict';

const got = require('got');
const opn = require('opn');
const handleError = require('./util/handleError');

exports.command = 'open <package>';
exports.describe = 'Opens the package in your browser.';
exports.builder = (yargs) =>
    yargs
    .strict()
    .usage('Usage: $0 open <package> [options]\n\nOpens the package in your browser..')
    .example('$0 open gulp', 'Opens "gulp" package')
    .example('$0 open --npms gulp', 'Opens "gulp" package in `https://npms.io` service')
    .example('$0 open --npm gulp', 'Opens "gulp" package in `https://npmjs.org` service')
    .example('$0 open --github gulp', 'Opens "gulp" package in `https://github.com` service')
    .demand(1, 1)
    .options({
        npms: {
            describe: 'Open "gulp" package in `https://npms.io` service',
            type: 'boolean',
        },
        npm: {
            describe: 'Open "gulp" package in `https://npmjs.org` service',
            type: 'boolean',
        },
        github: {
            describe: 'Open "gulp" package in `https://github.com` service',
            default: true,
            type: 'boolean',
        }
    });

exports.handler = (argv) => {
    got(`https://api.npms.io/module/${encodeURIComponent(argv.package)}`, { json: true })
    .then((res) => getService(argv, res))
    .then((link) => opn(link, { wait: false }))
    .then(() => { process.exitCode = 0; })
    .catch((err) => handleError(err));
};

function getService(argv, res) {
    if (argv.npms) { return `https://npms.io/search?term=${argv.package}`; }
    if (argv.npm) { return res.body.collected.metadata.links.npm; }
    return res.body.collected.metadata.links.repository || res.body.collected.metadata.links.npm;
}
