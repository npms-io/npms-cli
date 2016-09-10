#!/usr/bin/env node

/* eslint no-unused-expressions:0 */

'use strict';

const yargs = require('yargs');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

yargs
.strict()
.wrap(Math.min(120, yargs.terminalWidth()))
.alias('version', 'v')
.version(pkg.version)
.alias('help', 'h')
.help('help')
.demand(1, 'Please supply a valid command')

.option('color', {
    describe: 'Allows disabling or enabling colored output',
    type: 'boolean',
    default: true,
    global: true,
})

.command(require('./cmd/search'))
.command(require('./cmd/info'))
.command(require('./cmd/open'))

.argv;
