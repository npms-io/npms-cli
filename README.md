# npms-cli ![npm](https://img.shields.io/npm/v/npms-cli.svg) ![dependencies](https://david-dm.org/flesch/npms-cli.svg)

> Search <https://npms.io> from the command line!

![npms-cli](https://cloud.githubusercontent.com/assets/13259/16711387/e9fac438-461d-11e6-8c8d-a02f37879577.png)

## Install

```bash
$ npm install --global npms-cli
```

> :warning: **NOTICE**: The [npms.io](https://npms.io/) team is working on the official `npms-cli` (<https://github.com/npms-io/npms-cli>). Ownership of the command line name "`npms`" is in the process of being transferred, so this project can be considered **DEPRECATED**, though it should work until the official version is released.

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

## See Also

* <https://github.com/npms-io/npms-cli/issues/1>
* <https://github.com/sindresorhus/alfred-npms>

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
