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
/*auemnatdo*/
Template.messages.helpers({
    'msgs':function(){
        var result=ChatRooms.findOne({_id:Session.get('roomid')});
        if(result){
          return result.messages;
        }
    }
});
Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { 
        if (Meteor.user())
        {
              var name = Meteor.user().username;
              var message = document.getElementById('message');
    
              if (message.value !== '') {
                var de=ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
                 name: name,
                 text: message.value,
                 createdAt: Date.now()
                }}});
                document.getElementById('message').value = '';
                message.value = '';
              }
        }
        else
        {
           alert("login to chat");
        }
       
    }
  }
}