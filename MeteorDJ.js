
if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

}

if (Meteor.isServer) {

}

Meteor.methods({

});
