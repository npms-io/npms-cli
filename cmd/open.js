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
    .example('$0 open gulp', 'Opens "gulp" package using auto source')
    .example('$0 open gulp --link npms', 'Opens "gulp" package in `https://npms.io` service')
    .option('link', {
        alias: 'l',
        describe: 'Choose link',
        choices: ['auto', 'npm', 'npms'],
        default: 'auto',
    })
    .demand(1, 1)
    .options({
        link: {
            describe: 'Open <package> using supplied link source',
            type: 'string',
            default: 'auto',
        },
    });

exports.handler = (argv) => {
    got(`https://api.npms.io/module/${encodeURIComponent(argv.package)}`, { json: true })
    .then((res) => getService(argv, res))
    .then((link) => opn(link, { wait: false }))
    .then(() => { process.exitCode = 0; })
    .catch((err) => handleError(err));
};

function getService(argv, res) {
    const links = res.body.collected.metadata.links;

    if (argv.link === 'npms') {
        return `https://npms.io/search?term=${argv.package}`;
    }
    if (argv.link === 'npm') {
        return links.npm;
    }
    if (argv.link === 'auto') {
        return links.repository || links.npm;
    }

    return links.repository || links.npm;
}
