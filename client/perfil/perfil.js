Template.perfil.helpers({
  UserPerfil:function(){
    if(Accounts.user().profile.name!=undefined)
    {
      return Accounts.user().profile.name;
    }else{
      return Accounts.user().username+' '+Accounts.user().profile.fullname;
    }
  }
});
Template.perfil.events({
	"click #guardar":function(e){
		e.preventDefault();
    var r=$("#perfil").serializeObject();
    profile = PERFIL.findOne({user:Accounts.user()._id});
    if(profile!=null)
      PERFIL.update({_id:profile._id},{
        $set:r
      });
    else
      PERFIL.insert(r);
	}
});
Template.perfil.helpers({
   dataProfile(user_id){

    data = PERFIL.findOne({user:Accounts.user()._id});
    return data;
  }
});
Template.perfil.helpers({
  itemN(){
      var usuario = Accounts.users.findOne({_id:this._id});
      return usuario.username;
  },  
  usuarios:function(){
      return Meteor.users.find();
    }
});
Template.perfil.events({
  "click #btnUser":function(e){
    e.preventDefault();
    var usuario = Accounts.users.findOne({_id:this._id});
    CHAT.insert(usuario);
    console.log(usuario);
  }
});