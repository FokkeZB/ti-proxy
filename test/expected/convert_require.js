try {__proxy.require("hello");

a.require("not this one");

var Hello = __proxy.require("Hello");

__proxy.require("/path" + variable + "/path");

tirequire("/path" + variable + "/path");

_require("/path" + variable + "/path");

require.subfunction("no");} catch (e) { e.filename = __filename; __proxy.exception(e); }