try {Ti.Filesystem.getFile(__proxy.resource(__proxy.resource() + "sounds/my.wav"));

Ti.Filesystem.getFile(__proxy.resource(__proxy.resource(), "sounds/my.wav"));

Ti.Filesystem.getFile(__proxy.resource(__proxy.resource(), "sounds", "my.wav"));

Ti.Filesystem.getFile(__proxy.resource(__proxy.resource(), "sounds", "music", "my.wav"));

__proxy.resource();

__proxy.resource() + "sounds/my.wav";

Ti.Filesystem.getFile(__proxy.resource("/appdata-private://testApp/", "/testDir/"));

Ti.Filesystem.getFile(__proxy.resource("appdata-private://testApp/", "/testDir/"));

Ti.Filesystem.getFile(__proxy.resource("appdata-private://testApp", "/testDir/"));

Ti.Filesystem.getFile(__proxy.resource("appdata-private://testApp", "testDir/"));

Ti.Filesystem.getFile(__proxy.resource("appdata-private://testApp", "testDir"));} catch (e) { e.filename = __filename; __proxy.exception(e); }