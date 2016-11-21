URL=new ReactiveVar("");
Uploader.finished=function(index, fileInfo, templateContex){
  URL.set(fileInfo.url);
  //console.log(fileInfo);
};

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
Template.form.onRendered(function(instance){
 
  setInterval(function(){
    var cont = $("#contenido").data('cont');
    $("#contenido").removeClass("fondo"+cont);
    cont = (cont+1)%3;
    $("#contenido").addClass("fondo"+(cont));
    $("#contenido").data('cont',cont);
  },5000);  

});
Template.nav.events({
    'click #login': function() {
      var username = $('#login-username').val();
      var password = $('#login-password').val();

      Meteor.loginWithPassword(username, password, function(error) {
        if(error) alert("Tu nombre o tu contraseña son incorrectos");
      });
    },

    'click #logout': function() {
      Meteor.logout();
    }
});
Template.nav.helpers({
  showBanner(){
    if(Accounts.user()!= null){
      return false;
    }
    return true;
  }
});
Template.form.helpers({
  showBanner(){
    if(Accounts.user()!= null){
      return false;
    }
    return true;
  }
});
  