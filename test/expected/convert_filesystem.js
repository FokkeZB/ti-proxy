Ti.Filesystem.getFile(__proxy.resource(__proxy.getResourcesDirectory() + "sounds/my.wav"));

Ti.Filesystem.getFile(__proxy.resource(__proxy.getResourcesDirectory(), "sounds/my.wav"));

Ti.Filesystem.getFile(__proxy.resource(__proxy.getResourcesDirectory(), "sounds", "my.wav"));

Ti.Filesystem.getFile(__proxy.resource(__proxy.getResourcesDirectory(), "sounds", "music", "my.wav"));

__proxy.getResourcesDirectory();

__proxy.getResourcesDirectory() + "sounds/my.wav";

Ti.Filesystem.getFile(__proxy.resource("/appdata-private://testApp/", "/testDir/"));

Ti.Filesystem.getFile(__proxy.resource("appdata-private://testApp/", "/testDir/"));

Ti.Filesystem.getFile(__proxy.resource("appdata-private://testApp", "/testDir/"));

Ti.Filesystem.getFile(__proxy.resource("appdata-private://testApp", "testDir/"));

Ti.Filesystem.getFile(__proxy.resource("appdata-private://testApp", "testDir"));