'use strict';

const chalk = require('chalk');

function handleError(err) {
    console.error(chalk.red('ERROR'));

    /* istanbul ignore else  */
    if (err.response) {
        console.error(err.response.body);
        console.error();
    }

    console.error(err.stack);
    process.exitCode = 1;
}

module.exports = handleError;
