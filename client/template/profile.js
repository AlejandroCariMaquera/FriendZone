//amigo = new ReactiveVar('');
//informacion = new ReactiveVar('');

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
  },
  friend(){
    return Template.instance().friend.get();
  }
});
Template.profile.events({ 
  "click #verPerfil":function(e,instance){
  e.preventDefault();
  var usuario = Accounts.users.findOne({_id:this._id}); 
  var info = PERFIL.findOne({user:this._id});
    instance.amigo.set(usuario);
    instance.informacion.set(info);
    instance.friend.set(usuario._id);
    console.log(usuario._id);
  }
});

Template.profile.onCreated(function(){
this.amigo = new ReactiveVar('');
this.informacion = new ReactiveVar('');
this.friend = new ReactiveVar('');
this.amigos = new ReactiveVar('');
});


Template.profile.helpers({
  PUBLIC(){
    return POSTS.find({user:Template.instance().friend.get()}, {sort: [ ["date", "desc"] ] });
  },
   amigos(){
    return Template.instance().amigos.get();
  }
});

//return Accounts.user().profile.fullname;
//aumentado para buscador
Template.profile.events({
  "click #buscador":function(e,template){
    e.preventDefault();
    var a=template.find('#search').value;
    var list=Accounts.users.find({username: {$regex: a}}).fetch();
    template.amigos.set(list);
    //console.log(list);
  //var r=$("#fotito").serializeObject();
      //POSTS.insert(r);
    }
});