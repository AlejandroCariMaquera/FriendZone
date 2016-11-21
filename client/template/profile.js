Template.profile.helpers({
  itemN(){
      var usuario = Accounts.users.findOne({_id:this._id});
      return usuario.username+' '+usuario.profile.fullname;
  },  
  usuarios:function(){
      return Meteor.users.find();
  }
});