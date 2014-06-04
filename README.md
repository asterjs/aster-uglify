# aster-uglify
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Minify scripts with UglifyJS2 in aster.

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
  mangle: true,
  compress: {
    unsafe: true
  }
}))
.map(aster.dest('dist'))
.subscribe(aster.runner);
```

## API

### uglify(options)

#### options.mangle
Type: `Boolean`
Default: `false`

Mangle names.

#### options.compress
Type: `Object`
Default: `false`

See available list of options [here](https://github.com/mishoo/UglifyJS2#compressor-options).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-uglify
[npm-image]: https://badge.fury.io/js/aster-uglify.png

[travis-url]: http://travis-ci.org/asterjs/aster-uglify
[travis-image]: https://secure.travis-ci.org/asterjs/aster-uglify.png?branch=master
