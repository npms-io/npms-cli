#!/usr/bin/env node

'use strict';

const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify();

const argv = require('yargs')
    .command(require('./cmd/search'))
    .demand(1)
    .alias('v', 'version')
    .version(() => require('../package').version)
    .alias('h', 'help')
    .help('help')
    .argv;
