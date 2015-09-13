var _            = require('lodash');
var loadEvents   = require('../data/loaders/archive-loader');

var events = loadEvents();
var currentEvent = events[0];

_.each(currentEvent.schedule, function (talk) {
  talk.speakers = _.pluck(talk.speakers, 'name');
});

module.exports = {
  page: {
    title: 'RS | Главная'
  },
  event: currentEvent
}
