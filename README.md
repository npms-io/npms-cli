# npms-cli

[![npm][npm-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

> Search <https://npms.io> from the command line!

![npms-cli](https://cloud.githubusercontent.com/assets/13259/16711387/e9fac438-461d-11e6-8c8d-a02f37879577.png)

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

(The MIT License)

Copyright (c) 2016 [npms](https://npms.io/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[npm-image]: https://img.shields.io/npm/v/npms-cli.svg
[npm-url]: https://www.npmjs.com/package/npms-cli
[david-dm-dev-image]: https://img.shields.io/david/dev/flesch/npms-cli.svg
[david-dm-dev-url]: https://david-dm.org/flesch/npms-cli#info=devDependencies
[david-dm-image]: https://img.shields.io/david/flesch/npms-cli.svg
[david-dm-url]: https://david-dm.org/flesch/npms-cli
