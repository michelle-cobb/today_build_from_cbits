# today_build

## Installation

* Clone this repo
* Install [node.js](http://nodejs.org)

## To run the app

* In the GitHub desktop app, sync your clone (hit the sync button).
* Go to the command line by going to Spotlight (the magnifying glass in the
  corner) and typing `terminal`, then go to the directory (most likely
  `cd\documents\today_build_new`)
* Type `www/bash start.bash`
* Go to your browser and visit localhost:8080
* Hit refresh

## To build a mobile application

* Install the [Android SDK](http://developer.android.com/sdk/index.html)
* Then install Cordova `npm install -g cordova`, `brew install ant`
* Edit your bash profile to include the path to the Android tools, this may
  change depending on the installation:

  * To do this, you will have to open Terminal and type `nano .bash_profile`:

  ```
  export PATH=$PATH:/usr/local/bin
  export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
  launchctl setenv STUDIO_JDK /library/Java/JavaVirtualMachines/jdk1.8.0_25.jdk
  export ANDROID_HOME="/Users/mnb760/android-sdk-macosx"
  export ANDROID_TOOLS="/Users/mnb760/android-sdk-macosx/tools"
  export ANDROID_PLATFORM_TOOLS="/Users/mnb760/android-sdk-macosx/platform-tools"
  PATH=$PATH:$ANDROID_HOME:$ANDROID_TOOLS:$ANDROID_PLATFORM_TOOLS
  ```

* Set this up as an Android mobile phone application `cordova platform add android`
* From the root, run `cordova build`, alternatively running
  `cordova run android` will install the application on a mobile device plugged
  in, or will start an emulator onto which it will install the application
  (this could be automated using a bash script that runs `grunt build` then
  copies the contents from the dist folder into the www folder then runs the
  builder)
* The file will be built by either process into `/platforms/android/ant-build/{something}unaligned.apk`

## For more information

Contact Michelle Burns at mnburns@northwestern.edu
Also visit the doc.pdf included in this repo
