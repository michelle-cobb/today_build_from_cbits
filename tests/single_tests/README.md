# SINGLE TESTS

Each test in this directory has been optimized to run by itself.

To run:

## First download Selenium IDE

* Download Firefox: https://www.mozilla.org/en-US/firefox/new/
* Open firefox, download Selenium IDE plugin for Firefox: release.seleniumhq.
  org/selenium-ide/2.9.0/selenium-ide-2.9.0.xpi. Install the add-ons and
  restart the browser.
* I suggest adding Power Debugger (Selenium IDE): https://addons.mozilla.org/
  en-us/firefox/addon/power-debugger-selenium-ide/ - this adds a pause on fail
  button which is extremely useful

## Run the app

* From terminal, clone github repo `git clone git@github.com:cbitstech/today_
  build_new.git` - if already done, pull latest and greatest
* Change directory (`cd`) to "www/" directory - full "/today_build_new/www/"
* Run `$ bash start.bash`

## Run the test suite

* Open Firefox - go to localhost:8080 ***if you see "Welcome to TODAY! Start
  TODAY!" you will need to refresh the home page***. You want to see "TODAY!"
  at the top with many buttons ("Daily Scoop", "Mood Rater", etc)
* Open Selenium IDE (there should be an icon in the tool bar) - set base URL
  to localhost:8080
* Add Test Cases: Within Selenium IDE, right click in box under "Test Case",
  select "Add Test Case", go to "/today_build_new/tests/single_tests" highlight
  desired files and click "Open".
* It is best to choose "Play Current Test Case" as false-negatives will occur
  if you run these test cases as a test suite as there are dependency issues.
* You should toggle the speed of the test playing to "Slow" or you may get
  false-negatives.
* If you add Power Debugger (Selenium IDE) you can click "Pause on Fail" next
  to the play buttons for debugging.
* You may need to manually go back to base URL if you are re-running tests.
* You may need to clear localStorage - open Console in browser and run
  `localStorage.clear()`. If you do need to clear localStorage, manually return
  to base URL, ***remember to refresh the page if you see "Welcome to TODAY!
  Start TODAY!"***.
