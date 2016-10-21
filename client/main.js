
  Template.form.events({
    'click #signup': function() {
      var user = {
        username: $('#signup-username').val(),
        password: $('#signup-password').val(),
        email:    $('#signup-input').val(),
        profile: {
          fullname: $('#signup-fullname').val()
        }
      };

      Accounts.createUser(user, function (error) {
        if(error) alert(error);
      });
    },
  });
  Template.nav.events({

    'click #login': function() {
      var username = $('#login-username').val();
      var password = $('#login-password').val();

      Meteor.loginWithPassword(username, password, function(error) {
        if(error) alert("no seas pendejo pon tu usuario y tu password");
      });
    },

    'click #logout': function() {
      Meteor.logout();
    }
  });