Template.msnItems.helpers({
  itemN(user){
    var usuario = Accounts.users.findOne({_id:user});
    return usuario.username+' '+usuario.profile.fullname;
  }
});
Template.box.helpers({
  itemN(user){
    var usuario = Accounts.users.findOne({_id:this._id});
    return usuario.username+' '+usuario.profile.fullname;
  }
});

Template.box.helpers({
  msnList:MESSAGES.find({}, {sort: [ ["date", "desc"] ] })
});
Template.chat.helpers({
  boxChat:CHAT.find({}, {sort: [ ["date", "desc"] ] })
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
Template.chat.events({
	"submit .chatSendMessages":function(event)
	{
		event.preventDefault();
		var message = event.target.msn.value;
		MESSAGES.insert({msn:message,date:new Date()});
		event.target.msn.value="";
	}
});
Template.box.events({
	"submit #setmsn":function(event)
	{
		event.preventDefault();
		var message = event.target.msn.value;
		MESSAGES.insert({msn:message,date:new Date()});
		event.target.msn.value="";
	},
	'click #removeChat': function(e) {
	    e.preventDefault();
	    var deleteChat = this._id;
	    CHAT.remove({_id:deleteChat});
  }
});