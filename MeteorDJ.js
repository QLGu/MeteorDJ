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
    var code = url;
    //TODO extract and validate youtube/soundcloud id = code

    var platform = "self"
    //TODO platform = youtube || soundcloud (based on url)

    Songs.insert({
      createdAt: new Date(),
      code: code,
      platform: platform
    });
  }
});

//TODO make universal song list with adding
//TODO extract youtube/soundcloud id code from input url
//TODO filter song list permissions per users who have added it (remove autopublish)
//TODO implement tagging per user
//TODO implement song player
//TODO implement saving current song from other users
//TODO route /room and /@user pages with FlowRouter
