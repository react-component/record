# rc-record
---

React Record Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-record)](https://saucelabs.com/u/rc-record)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-record.svg)](https://saucelabs.com/u/rc-record)

[npm-image]: http://img.shields.io/npm/v/rc-record.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-record
[travis-image]: https://img.shields.io/travis/react-component/record.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/record
[coveralls-image]: https://img.shields.io/coveralls/react-component/record.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/record?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/record.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/record
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-record.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-record


## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Screenshots

<img src="" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8001/examples/


online example: http://react-component.github.io/record/


## Feature

* support ie8,ie8+,chrome,firefox,safari


## install


[![rc-record](https://nodei.co/npm/rc-record.png)](https://npmjs.org/package/rc-record)


## Usage

```js
var Record = require('rc-record');
var React = require('react');
React.render(<Record />, container);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
    </tbody>
</table>


## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

rc-record is released under the MIT license.
