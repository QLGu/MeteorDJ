// userdata = new Mongo.Collection("userdata");
Playlist = new Mongo.Collection("playlist");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
  });

  Template.body.helpers({
    playlist: function() {
      return Playlist.find();
    }
  });

  Template.body.events({
    "submit .new-song": function(event) {
      var title = event.target.title.value;

      Playlist.insert({
        title: title,
        createdAt: new Date()
      });

      event.target.title.value = "";
      return false;
    }
  });

  Template.song.events({
    "click .delete": function() {
      Playlist.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
