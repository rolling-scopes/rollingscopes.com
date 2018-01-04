var _            = require('lodash');
var loadEvents   = require('../data/loaders/archive-loader');

var events = loadEvents()
  .filter((event) => {
    return event.location.indexOf('г. Могилев') !== -1;
  });

var currentEvent = events[0];

module.exports = {
  page: {
    title: 'RS | Mogilev'
  },
  event: currentEvent
}
