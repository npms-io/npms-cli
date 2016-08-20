'use strict';

const got = require('got');
const opn = require('opn');
const handleError = require('./util/handleError');

exports.command = 'open <package>';
exports.describe = 'Opens the module in your browser.';

exports.handler = (argv) => {
    got(`https://api.npms.io/module/${encodeURIComponent(argv.package)}`, { json: true })
    .then((res) => res.body.collected.metadata.links.repository || res.body.collected.metadata.links.npm)
    .then((link) => opn(link, { wait: false }))
    .catch((err) => handleError(err));
};
