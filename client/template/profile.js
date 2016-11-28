Template.profile.helpers({
  itemN(){
      var usuario = Accounts.users.findOne({_id:this._id});
      return usuario.username+' '+usuario.profile.fullname;
  },  
  usuarios:function(){
      return Meteor.users.find();
  }
});
Template.profile.events({
	"click #verPerfil":function(e){
	e.preventDefault();
	var usuario = Accounts.users.findOne({_id:this._id});
    console.log(usuario);
    //AMIGOS.insert(usuario);
	}
});