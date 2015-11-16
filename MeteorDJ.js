Playlist = new Mongo.Collection("playlist");
//TODO replace with user-specefic playlists

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
  });

  Template.body.helpers({
    playlist: function() {
      return Playlist.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
