# npms-cli

[![Build Status](https://travis-ci.org/npms-io/npms-cli.svg?branch=master)](https://travis-ci.com/npms-io/npms-cli)
[![npm][npm-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Search <https://npms.io> from the command line!

![npms-cli](https://cloud.githubusercontent.com/assets/13259/17828647/a27c2d30-665d-11e6-9d9c-e43e02b31872.png)


## Install

```bash
$ npm install --global npms-cli
```

## Usage

The most used feature is the search command:

```
$ npms search [packages...]

Options:
  --from, -f            The offset in which to start searching from.         [number] [default: 0]
  --size, -s            The total number of results to return.              [number] [default: 10]
  --output, -o          Format the results in a table or as JSON.               [default: "table"]
  --score-effect        The effect that the module scores have for the final search score.[number]
  --quality-weight      The weight that the quality has for the each module score.        [number]
  --popularity-weight   The weight that the popularity has for each module score.         [number]
  --maintenance-weight  The weight that the maintenance has for each module score.        [number]
  -v, --version         Show version number                                              [boolean]
  -h, --help            Show help                                                        [boolean]
```

Besides searching, the CLI provides some more useful commands.  
Please run `$ npms -h` for more information.


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).


[npm-image]: https://img.shields.io/npm/v/npms-cli.svg
[npm-url]: https://www.npmjs.com/package/npms-cli
[david-dm-dev-image]: https://img.shields.io/david/dev/npms-io/npms-cli.svg
[david-dm-dev-url]: https://david-dm.org/npms-io/npms-cli#info=devDependencies
[david-dm-image]: https://img.shields.io/david/npms-io/npms-cli.svg
[david-dm-url]: https://david-dm.org/npms-io/npms-cli
