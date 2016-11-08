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
