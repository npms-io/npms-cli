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
.alias('v', 'version')
.version(() => pkg.version)
.alias('h', 'help')
.alias('i', 'info')
.alias('s', 'search')
.help('help')
.demand(1)
.command(require('./cmd/search'))
.command(require('./cmd/info'))
.command(require('./cmd/open'))
.argv;
