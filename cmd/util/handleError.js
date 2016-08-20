'use strict';

const chalk = require('chalk');

function handleError(err) {
    console.error(chalk.red('ERROR'));

    if (err.response) {
        console.error(err.response.body);
        console.error();
    }

    console.error(err.stack);

    setImmediate(() => process.exit(1));
}

module.exports = handleError;
