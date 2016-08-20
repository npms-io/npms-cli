'use strict';

const got = require('got');
const Table = require('cli-table2');
const chalk = require('chalk');
const moment = require('moment');
const truncate = require('truncate');
const handleError = require('./util/handleError');

exports.command = 'search <packages...>';
exports.describe = 'Search npms.io for packages matching the search terms.';
exports.builder = {
    f: {
        alias: 'from',
        describe: 'The offset in which to start searching from.',
        default: 0,
    },
    s: {
        alias: 'size',
        describe: 'The total number of results to return.',
        default: 10,
    },
    o: {
        alias: 'output',
        describe: 'Format the results in a table or as JSON.',
        default: 'table',
    },
    scoreEffect: {
        describe: 'The effect that the module scores have for the final search score.',
    },
    qualityWeight: {
        describe: 'The weight that the quality has for the each module score.',
    },
    popularityWeight: {
        describe: 'The weight that the popularity has for each module score.',
    },
    maintenanceWeight: {
        describe: 'The weight that the maintenance has for each module score.',
    },
};

exports.handler = (argv) => {
    got('https://api.npms.io/search', {
        json: true,
        query: JSON.parse(JSON.stringify({
            term: argv.packages.join('+'),
            from: argv.from,
            size: argv.size,
            scoreEffect: argv.scoreEffect,
            qualityWeight: argv.qualityWeight,
            popularityWeight: argv.popularityWeight,
            maintenanceWeight: argv.maintenanceWeight,
        })),
    })
    .then((res) => {
        if (!res.body.results.length) {
            console.log(chalk.red(`No matches found for: "${chalk.white.bold(argv.packages.join('+'))}"`));
            return;
        }

        if (argv.output === 'table') {
            const table = new Table({
                head: ['Package', 'Quality', 'Popularity', 'Maintenance', 'Score'],
            });

            table.push.apply(table, res.body.results.map((item) => {
                const module = item.module;

                const pkg = [
                    `${chalk.bold(module.name)} • ${chalk.dim(module.links.repository || module.links.npm)}`,
                    chalk.gray(truncate(module.description, 80, { ellipsis: '...' })),
                    chalk.dim(`updated ${moment(module.date).fromNow()} by ${module.publisher.username}`),
                ].join('\n');

                const score = ['quality', 'popularity', 'maintenance'].map((score) => {
                    return { hAlign: 'center', vAlign: 'center', content: Math.round(item.score.detail[score] * 100) };
                }).concat([{ hAlign: 'center', vAlign: 'center', content: chalk.green(Math.round(item.score.final * 100)) }]);

                return [pkg].concat(score);
            }));
            console.log(table.toString());
        } else {
            console.log(JSON.stringify(res.body.results, null, 2));
        }
    })
    .catch((err) => handleError(err));
};
