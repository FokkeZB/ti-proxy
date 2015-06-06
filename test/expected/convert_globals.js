try {var foo = __proxy.globals.foo = "bar";

function hi() {
    var bar = "foo";
}} catch (e) { e.filename = __filename; __proxy.exception(e); }