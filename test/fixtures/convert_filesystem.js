Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "sounds/my.wav");
Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "sounds/my.wav");
Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "sounds", "my.wav");
Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "sounds", "music", "my.wav");
Ti.Filesystem.getResourcesDirectory();
Ti.Filesystem.resourcesDirectory + "sounds/my.wav";

Ti.Filesystem.getFile("/appdata-private://testApp/","/testDir/");
Ti.Filesystem.getFile("appdata-private://testApp/","/testDir/");
Ti.Filesystem.getFile("appdata-private://testApp","/testDir/");
Ti.Filesystem.getFile("appdata-private://testApp","testDir/");
Ti.Filesystem.getFile("appdata-private://testApp","testDir");
