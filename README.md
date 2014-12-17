today_build
===========

Installation
============

0. Clone this repo
1. Install node.js from http://nodejs.org

To run the app:
===============

1. In the GitHub desktop app, sync your clone (hit the sync button).
2. Go to the command line by going to Spotlight (the magnifying glass in the corner) and typing `terminal`, then go to the directory (most likely `cd\documents\today_build`)
3. Type `bash start.bash`
4. Go to your browser and visit localhost:8080
5. Hit refresh

To build a mobile application:
==============================

1. Install the Android SDK (http://developer.android.com/sdk/index.html)
2. Then install Cordova `npm install -g cordova`, `brew install ant`
3. Set this up as an Android mobile phone application `cordova platform add android`
4. To turn the distribution version into an application, copy the contents of the `folder` folder into the `app` folder and then run `cordova build`, alternatively running `cordova run android` will install the application on a mobile device plugged in, or will start an emulator onto which it will install the application (this could be automated using a bash script that runs `grunt build` then copies the contents from the dist folder into the www folder then runs the builder) 
5. The file will be built by either process into `/platforms/android/ant-build/{something}unaligned.apk`

For more information:
=====================

Contact Michelle Burns at mnburns@northwestern.edu  
Also visit the doc.pdf included in this repo
