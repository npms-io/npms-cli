# npms-cli

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build status][travis-image]][travis-url] [![Coverage status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev dependency status][david-dm-dev-image]][david-dm-dev-url]

Search <https://npms.io> from the command line!

![npms-cli](https://cloud.githubusercontent.com/assets/13259/17828647/a27c2d30-665d-11e6-9d9c-e43e02b31872.png)


## Install

```bash
$ npm install --global npms-cli
```

## Usage

The most used feature is the search command:

```
$ npms search <query>

Usage: npms search <query...> [options]

Search npms.io for packages.
For advances filters and modifiers visit https://api-docs.npms.io/#api-search-query.

Options:
  --version, -v         Show version number                                                  [boolean]
  --help, -h            Show help                                                            [boolean]
  --color               Allows disabling or enabling colored output          [boolean] [default: true]
  --from, -f            The offset in which to start searching from              [number] [default: 0]
  --size, -s            The total number of results to return                   [number] [default: 10]
  --output, -o          Format the results in a table or as JSON                    [default: "table"]

Examples:
  npms search cross spawn                Search for "cross spawn"
  npms search cross spawn --output json  Search for "cross spawn" and print results as JSON
```

Besides searching, the CLI provides some more useful commands.  
Please run `$ npms -h` for more information.


## Tests

```bash
$ npm test
$ npm test-cov # to get coverage report
```

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[npm-url]:https://npmjs.org/package/npms-cli
[downloads-image]:http://img.shields.io/npm/dm/npms-cli.svg
[npm-image]:http://img.shields.io/npm/v/npms-cli.svg
[travis-url]:https://travis-ci.org/npms-io/npms-cli
[travis-image]:http://img.shields.io/travis/npms-io/npms-cli/master.svg
[codecov-url]:https://codecov.io/gh/npms-io/npms-api
[codecov-image]:https://img.shields.io/codecov/c/github/npms-io/npms-api/master.svg
[david-dm-url]:https://david-dm.org/npms-io/npms-cli
[david-dm-image]:https://img.shields.io/david/npms-io/npms-cli.svg
[david-dm-dev-url]:https://david-dm.org/npms-io/npms-cli#info=devDependencies
[david-dm-dev-image]:https://img.shields.io/david/dev/npms-io/npms-cli.svg
