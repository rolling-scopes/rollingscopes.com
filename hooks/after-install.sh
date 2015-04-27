#!/bin/sh
sudo -i
cd /webapp
npm i
cd /webapp/school
bower i --allow-root
cd /webapp
gulp
