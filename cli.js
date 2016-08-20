#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

module.exports = yargs
    .command(require('./cmd/search'))
    .command(require('./cmd/info'))
    .command(require('./cmd/open'))
    .demand(1)
    .alias('v', 'version')
    .version(() => pkg.version)
    .alias('h', 'help')
    .help('help')
    .argv;
