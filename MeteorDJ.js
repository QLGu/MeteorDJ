//songs stored in user docs? pros and cons?

if (Meteor.isClient) {
  // Meteor.subscribe("songs");

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
});

//TODO add installation-specific api keys using Meteor.settings
//TODO implement tagging per user
//TODO implement song player (with hidden controls)
//TODO implement saving current song from player
//TODO route /room and /@user pages with FlowRouter
//TODO admin panel
