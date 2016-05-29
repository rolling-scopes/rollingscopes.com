var _            = require('lodash');
var loadEvents   = require('../data/loaders/archive-loader');

var events = loadEvents()
  .filter((event) => {
    //return event.location.indexOf('г. Брест') === -1 &&
    //  event.location.indexOf('г. Гомель') === -1;
      return true;
  });

var currentEvent = events[0];

module.exports = {
  page: {
    title: 'RS | Main'
  },
  event: currentEvent
}
