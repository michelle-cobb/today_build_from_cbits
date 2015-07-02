#! /bin/bash

clear

echo 'Completed building distribution folder'
echo 'Starting server'
echo 'Access by visiting http://localhost:8080 on any browser'
echo 'If you want to run selenium tests, make sure to open Firefox'
echo 'Tests are located in the /tests folder in the test suite `today tests`'

node server.js

