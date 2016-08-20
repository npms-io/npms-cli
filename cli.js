#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

module.exports = yargs
    .strict()
    .wrap(Math.min(120, yargs.terminalWidth()))
    .demand(1)
    .command(require('./cmd/search'))
    .command(require('./cmd/info'))
    .command(require('./cmd/open'))
    .alias('v', 'version')
    .version(() => pkg.version)
    .alias('h', 'help')
    .help('help')
    .argv;
