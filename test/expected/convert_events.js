__proxy.events.addEventListener("App", "click", function() {
    alert("hi");
});

__proxy.events.fireEvent("App", "click");

__proxy.events.fireEvent("Gesture", "click");

__proxy.events.fireEvent("Geolocation", "click");

__proxy.events.removeEventListener("App", "asddf", myFunction);