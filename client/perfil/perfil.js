//Template.perfil.test ="hola MUNDO";
URL2=new ReactiveVar("");
Template.perfil.helpers({
  URL2(){
    return URL2.get();
  },
  perfilCallback : function(){
    return {
        finished: function(index, fileInfo, templateContex){
          URL2.set(fileInfo.url);
          console.log(fileInfo);
      }
    }
  }
});
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
    console.log(r);
    if(profile!=null)
      PERFIL.update({_id:profile._id},{
        $set:r
      });
    else
      PERFIL.insert(r);
	}
  //var r=$("#fotito").serializeObject();
      //POSTS.insert(r);
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
    var us = Accounts.users.findOne({_id:this._id});
    CHAT.insert(us);
    console.log(this);
  }
});
//AUMENTADO
Template.perfil.helpers({
    'onlusr':function(){
        return Meteor.users.find({ "status.online": true , _id: {$ne: Meteor.userId()} });
    }
});
Template.perfil.events({
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
//AUMENTADO