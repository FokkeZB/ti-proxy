try {var win = __proxy.globals.win = __proxy.UI.createWindow({
    backgroundImage: __proxy.resource("app.png"),
    rightButton: __proxy.resource("catchMe.png")
});

view.generateImage = function() {};

params.image = null;

$.myview.setSelectedImage(__proxy.resource("app.png"));

$.image = Ti.UI.createImageView();

tab.activeIcon = __proxy.resource("app.png");

__proxy.globals.win.backgroundImage = __proxy.resource("app.png");

__proxy.globals.win.backgroundImage = __proxy.resource("/images" + variable + "/app.png");

params.url += "?" + encodeData(params.urlparams);} catch (e) { e.filename = __filename; __proxy.exception(e); }