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
    console.log(r);
	}
});
