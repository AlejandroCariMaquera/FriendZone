amigo = new ReactiveVar('');
informacion = new ReactiveVar('');
Template.profile.helpers({
  itemN(){
      var usuario = Accounts.users.findOne({_id:this._id});
      return usuario.username+' '+usuario.profile.fullname;
  },  
  usuarios:function(){
      return Meteor.users.find();
  },
  amigo(){
    return Template.instance().amigo.get();
  },
  informacion(){
    return Template.instance().informacion.get();
  }
});
Template.profile.events({
  "click #verPerfil":function(e,instance){
  e.preventDefault();
  var usuario = Accounts.users.findOne({_id:this._id}); 
  var info = PERFIL.findOne({user:this._id});
    instance.amigo.set(usuario);
    instance.informacion.set(info);
  }
});

Template.profile.onCreated(function(){
this.amigo = new ReactiveVar('');
this.informacion = new ReactiveVar('');
});


Template.profile.helpers({
  PUBLIC:POSTS.find({/*user:aqui va su id del user*/}, {sort: [ ["date", "desc"] ] })
});

//return Accounts.user().profile.fullname;