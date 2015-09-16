var _        = require('lodash');
var speakers = require('../data/json/speakers.json');
var events   = require('../data/json/archive.json');

var talks = _.map(events, function (event) {
  return _.map(event.schedule, function (talk) {
    talk.eventId = event.id;
    return talk;
  });
});

talks = _.flatten(talks);

var speakerToTalksMap = {};

_.each(speakers, function (speaker) {
  speakerToTalksMap[speaker.id] = [];
})

_.each(talks, function (talk) {
  _.each(talk.speakerIDs, function (speaker) {
    speakerToTalksMap[speaker].push(talk);
  });
});

var processedSpeakers = _.map(speakerToTalksMap, function (talk, speakerId) {
  var speaker = _.findWhere(speakers, { id: +speakerId });
  speaker.talks = speakerToTalksMap[speaker.id];
  return speaker;
});

processedSpeakers.sort(function (a, b) {
  return b.talks.length - a.talks.length;
});

module.exports = {
  page: {
    title: 'RS | Зал Славы'
  },
  speakers: processedSpeakers
}
