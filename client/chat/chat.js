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
/*auemnatdo*/
Template.messages.helpers({
    'msgs':function(user){
        var result=ChatRooms.findOne({_id:Session.get('roomid')});        
        if(result){
          return result.messages;
        }
    },
    'position'(user_id){
      if(Accounts.user()._id == user_id)
        return ' pull-right';
      return '';
    }
});
Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { 
        if (Meteor.user())
        {
              var name = Meteor.user().username;
              var id = Meteor.user()._id;
              var message = document.getElementById('message');
              if (message.value !== '') {
                var de=ChatRooms.update({"_id":Session.get("roomid")},{$push:{messages:{
                 user_id:id,
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
Template.chat.helpers({
    'onlusr':function(){
        return Meteor.users.find({ "status.online": true , _id: {$ne: Meteor.userId()} });
    }
});
Template.chat.events({
    'click .user':function(){
        Session.set('currentId',this._id);
        var res=ChatRooms.findOne({chatIds:{$all:[this._id,Meteor.userId()]}});
        var us = Accounts.users.findOne({_id:this._id});
        console.log(us);
        if(res)
        {
            //already room exists
            Session.set("roomid",res._id);
        }
        else{
            //no room exists
            var newRoom= ChatRooms.insert({chatIds:[this._id , Meteor.userId()],messages:[]});
            Session.set('roomid',newRoom);
        }
    }
    /*'click .user':function(e){
      e.preventDefault();
      var us = Accounts.users.findOne({_id:this._id});
      console.log(us);
      CHAT.insert(us);
    }*/
});
