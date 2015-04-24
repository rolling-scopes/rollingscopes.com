#!/bin/sh
export PORT=80
cd /webapp
sudo forever start --minUptime 1000 --spinSleepTime 1000 service.js
