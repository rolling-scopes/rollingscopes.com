var _            = require('lodash');
var loadEvents   = require('../data/loaders/archive-loader');

var events = loadEvents()
  .filter((event) => {
    return event.location.indexOf('Ташкент') !== -1;
  });

var currentEvent = events[0];

module.exports = {
  page: {
    title: 'RS | Tashkent'
  },
  event: currentEvent
}
