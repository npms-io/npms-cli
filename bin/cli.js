#!/usr/bin/env node

'use strict';

const argv = require('yargs')
  .command(require('./cmd/search'))
  .demand(1)
  .alias('v', 'version')
  .version(() => require('../package').version)
  .alias('h', 'help')
  .help('help')
  .argv;
