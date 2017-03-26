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

.option('color', {
    describe: 'Allows disabling or enabling colored output',
    type: 'boolean',
    default: true,
    global: true,
})

.commandDir('./cmd')
.demandCommand(1, 'Please supply a valid command')

.argv;
