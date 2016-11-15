Template.chat.events({
	"submit .chatSendMessages":function(event)
	{
		event.preventDefault();
		var message = event.target.msn.value;
		MESSAGES.insert({msn:message,date:new Date()});
		event.target.msn.value="";
	}
});
Template.msnItems.helpers({
  itemN(user){
    var usuario = Accounts.users.findOne({_id:user});
    return usuario.username+' '+usuario.profile.fullname;
  }
});

Template.chat.helpers({
  msnList:MESSAGES.find({}, {sort: [ ["date", "desc"] ] })
});
Template.chat.helpers({
	itemN(){
	    var usuario = Accounts.users.findOne({_id:this._id});
	    return usuario.username;
	},	
	usuarios:function(){
  		return Meteor.users.find();
  	}
});