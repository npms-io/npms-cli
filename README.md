# npms-cli

[![npm][npm-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Search <https://npms.io> from the command line!

![npms-cli](https://cloud.githubusercontent.com/assets/13259/17828647/a27c2d30-665d-11e6-9d9c-e43e02b31872.png)

## Install

```bash
$ npm install --global npms-cli
```

## Usage

```bash
$ npms search [packages...]

Options:
  -f, --from           The offset in which to start searching from.  [default: 0]
  -s, --size           The total number of results to return.  [default: 10]
  -o, --output         Format the results in a table or as JSON.  [default: "table"]
  --scoreEffect        The effect that the module scores have for the final search score.
  --qualityWeight      The weight that the quality has for the each module score.
  --popularityWeight   The weight that the popularity has for each module score.
  --maintenanceWeight  The weight that the maintenance has for each module score.
  -v, --version        Show version number  [boolean]
  -h, --help           Show help  [boolean]
```

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).


[npm-image]: https://img.shields.io/npm/v/npms-cli.svg
[npm-url]: https://www.npmjs.com/package/npms-cli
[david-dm-dev-image]: https://img.shields.io/david/dev/flesch/npms-cli.svg
[david-dm-dev-url]: https://david-dm.org/flesch/npms-cli#info=devDependencies
[david-dm-image]: https://img.shields.io/david/flesch/npms-cli.svg
[david-dm-url]: https://david-dm.org/flesch/npms-cli
