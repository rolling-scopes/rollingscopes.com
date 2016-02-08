var _            = require('lodash');
var loadEvents   = require('../data/loaders/archive-loader');

var events = loadEvents();

module.exports = {
  page: {
    title: 'RS | Архив'
  },
  events: events.slice(1, events.length)
}
