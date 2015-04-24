#!/bin/sh

sudo forever start --minUptime 1000 --spinSleepTime 1000 service.js
