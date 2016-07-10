#! /usr/bin/env node

'use strict';

const got = require('got');
const Table = require('cli-table2');
const chalk = require('chalk');
const moment = require('moment');
const truncate = require('truncate');

const argv = require('yargs')
  .alias('v', 'version')
  .version(() => require('../package').version)
  .command('search', 'Search npms.io for packages matching the search terms.', (yargs) => {
      return yargs.option('n', {
        alias: 'number',
        describe: 'Limit the number of search results returned.',
        default: 10
      })
    },
    (argv) => {

      got('https://api.npms.io/search', {
        json: true,
        query: {
          term: argv._.slice(1).join('+'),
          size: argv.number
        }
      }).then(res => {

        const table = new Table({ head:['Package', 'Quality', 'Popularity', 'Maintenance', 'Score'] });

        table.push.apply(table, res.body.results.map(item => {

          let pkg = [
            `${chalk.bold(item.name)} • ${chalk.dim(item.links.repository || item.links.npm)}`,
            chalk.gray(truncate(item.description, 80, { ellipsis:'...' })),
            chalk.dim(`updated ${moment(item.date).fromNow()} by ${item.publisher.username}`)
          ].join('\n');

          let score = ['quality', 'popularity', 'maintenance'].map(score => {
            return { hAlign:'center', vAlign:'center', content:Math.round(item.score.detail[score] * 100) };
          }).concat([{ hAlign:'center', vAlign:'center', content:chalk.green(Math.round(item.score.final * 100)) }]);

          return [pkg].concat(score);

        }));

        console.log(table.toString());

      }).catch(err => {
        // console.error(err);
      });
    }
  )
  .usage('$0 search [-n|--number 10] search terms...')
  .example('$0 search -n 15 react')
  .alias('h', 'help')
  .help('help')
  .argv
