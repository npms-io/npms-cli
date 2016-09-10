'use strict';

const originalExit = process.exit;
const originalStdWrite = { stdout: process.stdout.write, stderr: process.stderr.write };

function interceptOutput() {
    const output = { stdout: '', stderr: '' };

    process.stdout.write = (str) => { output.stdout += str; };
    process.stderr.write = (str) => { output.stderr += str; };

    return () => {
        process.stdout.write = originalStdWrite.stdout;
        process.stderr.write = originalStdWrite.stderr;

        return output;
    };
}

function waitForExit(timeout) {
    let timeoutId;

    const restore = () => {
        clearTimeout(timeoutId);

        process.exit = originalExit;

        Object.defineProperty(process, 'exitCode', {
            configurable: true,
            writable: true,
            value: 0,
        });
    };

    return new Promise((resolve, reject) => {
        let exitCode = 0;

        timeoutId = setTimeout(() => reject(new Error('Command timedout')), timeout);

        process.exit = (code) => {
            exitCode = code;

            if (exitCode === 0) {
                resolve();
            } else {
                reject(Object.assign(new Error(`Command failed and exited with #${exitCode}`), { status: exitCode }));
            }
        };

        Object.defineProperty(process, 'exitCode', {
            configurable: true,
            get: () => exitCode,
            set: (code) => {
                exitCode = code;

                if (exitCode === 0) {
                    resolve();
                } else {
                    reject(Object.assign(new Error(`Command failed and exited with #${exitCode}`), { status: exitCode }));
                }
            },
        });
    })
    .then(() => restore(), (err) => {
        restore();
        throw err;
    });
}

function exec(argv, options) {
    options = Object.assign({ printStderr: true, timeout: 1500 }, options);

    // Clear the cli & yargs from the module cache
    delete require.cache[require.resolve('../../cli')];
    delete require.cache[require.resolve('yargs')];

    // Intercept output
    const finishInterceptingOutput = interceptOutput();

    // Execute CLI, waiting for the command to exit
    const promise = waitForExit(options.timeout)
    .then(() => finishInterceptingOutput(), (err) => {
        err.output = finishInterceptingOutput();

        if (options.printStderr && err.output.stderr) {
            console.error(err.output.stderr);
        }

        throw err;
    });

    process.argv = ['node', './cli.js'].concat(argv);
    require('../../cli');  // eslint-disable-line global-require

    return promise;
}

module.exports = exec;
