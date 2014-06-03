# aster-uglify
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Uglify with aster.

## Usage

First, install `aster-uglify` as a development dependency:

```shell
npm install --save-dev aster-uglify
```

Then, add it to your build script:

```javascript
var aster = require('aster');
var uglify = require('aster-uglify');

aster.src('src/**/*.js')
.map(uglify({
  stringOption: 'value'
}))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

## API

### uglify(options)

#### options.stringOption
Type: `String`

Some string option.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-uglify
[npm-image]: https://badge.fury.io/js/aster-uglify.png

[travis-url]: http://travis-ci.org/asterjs/aster-uglify
[travis-image]: https://secure.travis-ci.org/asterjs/aster-uglify.png?branch=master
