try {__proxy.events.addEventListener("App", "click", function() {
    alert("hi");
});

Ti.App.fireEvent("click");

Ti.Gesture.fireEvent("click");

Ti.Geolocation.fireEvent("click");

__proxy.events.removeEventListener("App", "asddf", myFunction);} catch (e) { e.filename = __filename; __proxy.exception(e); }