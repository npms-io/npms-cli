#! /usr/bin/env node

const yargs = require('yargs');
const fetch = require('node-fetch');
const Table = require('cli-table2');
const chalk = require('chalk');
const moment = require('moment');
const truncate = require('truncate');

function to_percent(n) {
  return Math.round(n * 100);
}

const table = new Table({
  head: ['Module', 'Quality', 'Popularity', 'Maintenance', 'Score']
});

const argv = yargs.usage('$0 search npm-module-name')
  .command('search', 'Search for a module', (yargs) => {

    let terms = yargs.argv._.slice(1);

    fetch(`https://api.npms.io/search?from=0&size=5&term=${terms.join('+')}`).then(res => res.json()).then(json => {

      let packages = json.results.map(pkg => {
        return [
          [`${chalk.bold(pkg.name)} • ${chalk.dim(pkg.links.homepage)}`, chalk.gray(truncate(pkg.description, 80, { ellipsis:'...' })), chalk.dim(`updated ${moment(pkg.date).fromNow()} by ${pkg.publisher.username}`)].join('\n'),
          { hAlign:'center', vAlign:'center', content:to_percent(pkg.score.detail.quality) },
          { hAlign:'center', vAlign:'center', content:to_percent(pkg.score.detail.popularity) },
          { hAlign:'center', vAlign:'center', content:to_percent(pkg.score.detail.maintenance) },
          { hAlign:'center', vAlign:'center', content:chalk.green(to_percent(pkg.score.final)) }
        ]
      });

      table.push.apply(table, packages);
      console.log(table.toString());

    }).catch(err => {
      console.error('A bad thing happenend!', err);
    });

  })
  .demand(1, 'must provide a module name')
  .help('h')
  .alias('h', 'help')
  .argv;
