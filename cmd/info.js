'use strict';

const util = require('util');
const got = require('got');
const handleError = require('./util/handleError');

exports.command = 'info <package>';
exports.description = 'Get info from npms.io of a given package.';
exports.builder = {
    o: {
        alias: 'output',
        describe: 'Format the results in a human readable format or as JSON.',
        default: 'human',
    },
};

exports.handler = (argv) => {
    got(`https://api.npms.io/module/${encodeURIComponent(argv.package)}`, { json: true })
    .then((res) => {
        if (argv.output === 'human') {
            console.log(util.inspect(res.body, { depth: null, colors: true }));
        } else {
            console.log(JSON.stringify(res.body, null, 2));
        }
    })
    .catch((err) => handleError(err));
};
