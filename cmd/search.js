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
    from: {
        alias: 'f',
        describe: 'The offset in which to start searching from.',
        default: 0,
        type: 'number',
    },
    size: {
        alias: 's',
        describe: 'The total number of results to return.',
        default: 10,
        type: 'number',
    },
    output: {
        alias: 'o',
        describe: 'Format the results in a table or as JSON.',
        default: 'table',
    },
    'score-effect': {
        describe: 'The effect that the module scores have for the final search score.',
        type: 'number',
    },
    'quality-weight': {
        describe: 'The weight that the quality has for the each module score.',
        type: 'number',
    },
    'popularity-weight': {
        describe: 'The weight that the popularity has for each module score.',
        type: 'number',
    },
    'maintenance-weight': {
        describe: 'The weight that the maintenance has for each module score.',
        type: 'number',
    },
};

exports.handler = (argv) => {
    got('https://api.npms.io/search', {
        json: true,
        query: JSON.parse(JSON.stringify({
            term: argv.packages.join('+'),
            from: argv.from,
            size: argv.size,
            scoreEffect: argv['score-effect'],
            qualityWeight: argv['quality-weight'],
            popularityWeight: argv['popularity-weight'],
            maintenanceWeight: argv['maintenance-weight'],
        })),
    })
    .then((res) => {
        if (argv.output === 'json') {
            console.log(JSON.stringify(res.body.results, null, 2));
        }

        if (!res.body.results.length) {
            console.log(chalk.red(`No matches found for: "${chalk.white.bold(argv.packages.join('+'))}"`));
            return;
        }

        const table = new Table({ head: ['Package', 'Quality', 'Popularity', 'Maintenance', 'Score'] });

        table.push.apply(table, res.body.results.map((item) => {
            const module = item.module;

            const pkg = [
                `${chalk.bold(module.name)} • ${chalk.dim(module.links.repository || module.links.npm)}`,
                chalk.gray(truncate(module.description, 80, { ellipsis: '...' })),
                chalk.dim(`updated ${moment(module.date).fromNow()} by ${module.publisher.username}`),
            ].join('\n');

            const score = ['quality', 'popularity', 'maintenance']
            .map((score) => ({ hAlign: 'center', vAlign: 'center', content: Math.round(item.score.detail[score] * 100) }))
            .concat([{ hAlign: 'center', vAlign: 'center', content: chalk.green(Math.round(item.score.final * 100)) }]);

            return [pkg].concat(score);
        }));

        console.log(table.toString());
    })
    .catch((err) => handleError(err));
};
