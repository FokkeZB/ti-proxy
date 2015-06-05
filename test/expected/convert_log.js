try {__proxy.log("log", "hi");

__proxy.log("log", "hello", "world");

__proxy.log("debug", variable);

__proxy.log("error", "asdf" + "asdfas" + "asdfasdf");

__proxy.log(type, "error" + content);

__proxy.log("info", "Ti.API.log()");

__proxy.log("info", variable);

__proxy.log("debug", "asdf" + "asdfas" + "asdfasdf");

__proxy.log("error", "error");

__proxy.log(variable, "error" + content);

__proxy.log("error", "error");} catch (e) { e.filename = __filename; __proxy.exception(e); }