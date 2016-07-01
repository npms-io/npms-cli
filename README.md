# npms-cli

> Search <https://npms.io> from the command line!

![npms-cli](https://cloud.githubusercontent.com/assets/13259/16476586/784f5f96-3e4e-11e6-8647-faf387b17e5a.png)

## Install

```bash
$ npm install --global npms-cli
```

## Usage

```bash
$ npms search [-n|--number 10] search terms...

Commands:
  search  Search npms.io for packages matching the search terms.

Options:
  -n, --number   Limit the number of search results returned.      [default: 10]
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
  
Examples:
  npms search -n 15 react
```

## See Also

* <https://github.com/npms-io/npms-cli/issues/1>
* <https://github.com/sindresorhus/alfred-npms>

## License

(The MIT License)

Copyright (c) 2016 [John Flesch](http://fles.ch).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
