Songs = new Mongo.Collection("songs");

if (Meteor.isClient) {
  Meteor.subscribe("songs");

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  Template.body.helpers({
    songs: function() {
      return Songs.find();
    }
  });

  Template.body.events({
    "submit .add-song": function(event) {
      var url = event.target.url.value;
      event.target.url.value = "";

      Meteor.call("addSong", url);

      return false;
    }
  });

  Template.song.events({
    "click .delete": function() {
      // delete song from user (not from database)
      // move to methods
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("songs", function() {
    return Songs.find();
  });
}

Meteor.methods({
  addSong: function(url) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-signed-in");
    }

    //TODO extract and validate youtube/soundcloud id = code
    var code = url;

    //TODO platform = youtube || soundcloud (based on url)
    var platform = "self"

    //TODO get song title from platform service
    // var title =

    var song = Songs.findOne({code: code, platform: platform}, {_id: 1});
    if (!song) {
      var songId = Songs.insert({
        createdAt: new Date(),
        platform: platform,
        code: code,
        saved: []
      });
    } else {
      var songId = song._id;
    }

    Meteor.call("saveSong", songId);
  },
  saveSong: function(songId) {
    // if song is not saved to user
    //add user to song.saved[]
    Songs.update(songId, {$addToSet: {saved: Meteor.userId()}});
  },
  getSongs: function() {
    //get all user's songs
    //TODO how to filter? in separate code?
    // is storing tags inside users inside songs too ineffecient?
  }
});

//TODO make universal song list with adding
//TODO extract youtube/soundcloud id code from input url
//TODO filter song list permissions per users who have added it to their "song library"
//TODO implement tagging per user
//TODO implement song player (with hidden controls)
//TODO implement saving current song from other users
//TODO route /room and /@user pages with FlowRouter
//TODO admin panel
