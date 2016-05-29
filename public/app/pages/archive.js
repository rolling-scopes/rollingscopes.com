var _            = require('lodash');
var loadEvents   = require('../data/loaders/archive-loader');

var events = loadEvents().filter(function (event) {
  return !event.upcoming;
});

module.exports = {
  page: {
    title: 'RS | Archive'
  },
  events: events.slice(1, events.length)
}
