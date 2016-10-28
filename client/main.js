/*PUBLICACIONES=[
  {text:"estoy trizte",date:new Date()},
  {text:"estoy de viaje", date:new Date()},
  {text:"estoy aburrido",date:new Date()}
]*/
Template.profile.helpers({
	DATOS:POSTS.find()
});
Template.profile.events({
	"click #btnsend":function(e){
		e.preventDefault();
		var r=$("#formpublic").serializeObject();
		POSTS.insert(r);
    //console.log(r);
	}
});
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
  },3000);  

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
Template.perfil.helpers({
  texto:function(){
    if(Accounts.user().profile.name!=undefined)
    {
      return Accounts.user().profile.name;
    }else{
      return Accounts.user().username;
    }
  }
});
Template.perfil.helpers({
  fullname:function(){
    if(Accounts.user().profile.fullname==undefined)
    {
      return "pendejo";
    }else{
      
      return Accounts.user().profile.fullname;
    }
  }
});
//Codigo like dislike
Template.item.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});
Template.item.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});
Template.item.events({
  'click #like'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.item.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.discounter = new ReactiveVar(0);
});
Template.item.helpers({
  discounter() {
    return Template.instance().discounter.get();
  },
});
Template.item.events({
  'click #dislike'(event, instance) {
    // increment the counter when button is clicked
    instance.discounter.set(instance.discounter.get() + 1);
  },
});
//--------------------
