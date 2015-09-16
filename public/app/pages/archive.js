var _            = require('lodash');
var loadEvents   = require('../data/loaders/archive-loader');

var events = loadEvents();

_.each(events, function (event) {
  _.each(event.schedule, function (talk) {
    talk.speakers = _.pluck(talk.speakers, 'name');
  });
});

module.exports = {
  page: {
    title: 'RS | Архив'
  },
  events: events
}
