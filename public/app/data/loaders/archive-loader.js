var _        = require('lodash');
var speakers = require('../json/speakers.json');

function getSpeakersByID(ids) {
  return _.map(ids, function (id) {
    return _.findWhere(speakers, { id: id });
  });
}

module.exports = function () {
  var events = require('../json/archive.json');

  return _.map(events, function (event) {
    var materials = [];

    _.each(event.schedule, function (talk) {
      var speaker;

      if (!talk.imagePath) {
        // implicit consequence: every talk with more than 1 speaker should have imagePath;
        // TODO: find better word than 'consequence' :D
        // TODO: move 'images/speakers' to const IMAGES_BASE_PATH

        speaker = _.findWhere(speakers, { id: talk.speakerIDs[0] });
        talk.imagePath = 'images/speakers/' + speaker.photo;
      }

      talk.speakers = getSpeakersByID(talk.speakerIDs);

      _.each(talk.materials, function (material) {
        if (!material.speakerIDs) {
          material.speakerIDs = talk.speakerIDs;
        }

        material.speakers = _.pluck(
          getSpeakersByID(material.speakerIDs),
          'name'
        );

        if (!material.title) {
          material.title = talk.title;
        }
      });

      materials.push.apply(materials, talk.materials);
    });

    event.materials = materials;
    return event;
  });
}
