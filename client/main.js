/*PUBLICACIONES=[
  {text:"estoy trizte",date:new Date()},
  {text:"estoy de viaje", date:new Date()},
  {text:"estoy aburrido",date:new Date()}
]*/
URL=new ReactiveVar("");
Uploader.finished=function(index, fileInfo, templateContex){
  URL.set(fileInfo.url);
  //console.log(fileInfo);
};
Template.profile.helpers({
	DATOS:POSTS.find({}, {sort: [ ["date", "desc"] ] }),
  URL(){
    return URL.get();
  }
});
Template.profile.events({
	"click #btnsend":function(e){
		e.preventDefault();
		var r=$("#formpublic").serializeObject();
		POSTS.insert(r);
    $("#input").val("");
    $("#formulario li").find("img").attr("src","");
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
      return "jeje";
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
  itemName(user){
    var usuario = Accounts.users.findOne({_id:user});
    return usuario.username+' '+usuario.profile.fullname;
  }
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
Template.profile.helpers({
  autor:function(){
    if(Accounts.user().profile.name!=undefined)
    {
      return Accounts.user().profile.name;
    }else{
      return Accounts.user().username;
    }
  }
});
//--->nombre a las publicaciones
Template.item.helpers({
  texto:function(){
    if(Accounts.user().profile.name!=undefined)
    {
      return Accounts.user().profile.name;
    }else{
      return Accounts.user().username;
    }
  }
});
Template.item.helpers({
  fullname:function(){
    if(Accounts.user().profile.fullname==undefined)
    {
      return "jeje";
    }else{
      
      return Accounts.user().profile.fullname;
    }
  }
});
Template.item.events({
  "click #coment":function(e){
    e.preventDefault();
    alert("Quiere comentar?? jajajaja no me haga reir !!! jajajajaja");
    //var r=$("#formpublic").serializeObject();
    //POSTS.insert(r);
    //console.log(r);
  }
});