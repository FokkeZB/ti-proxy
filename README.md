# ti-proxy
Parse JavaScript to proxy Titanium API calls

## Example

```
var TiProxy = require('ti-proxy');

var code = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'app.js').read().text;
var parsedCode = TiProxy.convert(code);

// see proxy-interface.js
var myProxy = require('my-proxy');

var fn = new Function('__proxy', parsedCode);

var app = fn(myProxy);

```

See [proxy-interface.js](proxy-interface.js) for an example proxy.

## Credits

Original converter code by [David Bankier](https://github.com/dbankier/TiShadow/blob/master/cli/support/uglify.js).
