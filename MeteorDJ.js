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

    //TODO (later) change this to highlight box (and add on press enter) if correct
    //TODO else filter song view if not a code
    var extracted = Util.extractUrlCode(url);
    if (!extracted) {
      //TODO temp, move reaction into ui later
      console.log("not a valid url");
      return false;
    }

    //TODO get song title from platform service (using api?)
    // var title =

    var song = Songs.findOne(extracted, {_id: 1});
    if (!song) {
      var songId = Songs.insert({
        createdAt: new Date(),
        code: extracted.code,
        platform: extracted.platform,
        saved: []
      });
    } else {
      var songId = song._id;
    }

    Meteor.call("saveSong", songId);
    return true;
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

//TODO add installation-specific api keys using Meteor.settings
//TODO filter song list permissions per users who have added it to their "song library"
//TODO implement tagging per user
//TODO implement song player (with hidden controls)
//TODO implement saving current song from player
//TODO route /room and /@user pages with FlowRouter
//TODO admin panel
