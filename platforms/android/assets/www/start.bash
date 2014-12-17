#! /bin/bash

clear

echo "building distribution directory"

curl 'http://mohrlab.northwestern.edu/parakeet/build/js/app/content.js' -o "js/app/content.js"
curl 'http://mohrlab.northwestern.edu/parakeet/build/js/app/questions.js' -o "js/app/questions.js"

wait

echo 'Completed building distribution folder'
echo 'Starting server'

node server.js

echo 'Open up the app by visiting http://localhost:8080 on any browser'
echo 'If you want to run selenium tests, make sure to open Firefox'
echo 'Tests are located in the /tests folder in the test suite `today tests`'