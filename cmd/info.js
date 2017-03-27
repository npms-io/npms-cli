'use strict';

const util = require('util');
const got = require('got');
const handleError = require('./util/handleError');

exports.command = 'info <package>';
exports.describe = 'Get info from npms.io of a given package.';

exports.builder = (yargs) =>
    yargs
    .usage('Usage: $0 info <package> [options]\n\nGet info from npms.io of a given package.')
    .example('$0 info gulp', 'Get "gulp" package info')

    .options({
        output: {
            alias: 'o',
            describe: 'Format the results in a human readable format or as JSON',
            default: 'human',
            choices: ['human', 'json'],
        },
        api: {
            describe: 'The API url',
            default: 'https://api.npms.io/v2',
        },
    });

exports.handler = (argv) => {
    got(`${argv.api}/package/${encodeURIComponent(argv.package)}`, { json: true })
    .then((res) => {
        if (argv.output === 'json') {
            console.log(JSON.stringify(res.body, null, 2));
        } else {
            console.log(util.inspect(res.body, { depth: null, colors: argv.color }));
        }
    })
    .then(() => { process.exitCode = 0; })
    .catch((err) => handleError(err));
};
