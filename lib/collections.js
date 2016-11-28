POSTS=new Mongo.Collection("public",{
	/*transform:function(item){
		//_.extend()
		item.count =COMENTS.find({articuloId:item._id}).fetch().length;
		return item; 
	}*/
	transform:function(item){
		if(item.user==Accounts.user()._id){
			item.can_eliminar = true;
		}else {
			item.can_eliminar = false;
		}
		return item;
	}
});
CHAT = new Mongo.Collection("chat");
MESSAGES = new Mongo.Collection("messages");
COMENTS = new Mongo.Collection("coments",{
	transform:function(item){
		if(item.user==Accounts.user()._id){
			item.can_edit = true;
		}else {
			item.can_edit = false;
		}
		return item;
	}
});
PERFIL = new Mongo.Collection("perfil");
POSTS.allow({
	remove:function(){
		return true;
	},
	"insert":function(){
		return true;
	}
});
MESSAGES.allow({
	insert:function()
	{
		return true;
	}
});
COMENTS.allow({
	remove:function(){
		return true;
	},
	update:function(){
		return true;
	},
	insert:function()
	{
		return true;
	}
});
PERFIL.allow({
	remove:function(){
		return true;
	},
	update:function(){
		return true;
	},
	insert:function()
	{
		return true;
	}
});
CHAT.allow({
	remove:function(){
		return true;
	},
	update:function(){
		return true;
	},
	insert:function()
	{
		return true;
	}
});
var articlesSchema = new SimpleSchema({
	images:{
		type:String,
		optional:true,
		label:"Images"
	},
	text:{
		optional:true,
		type:String
	},
	date:{
		type:Date,
		autoValue:function(){
			return new Date();
		}
	},
	user:{
		type:String,
		autoValue:function(){
			return this.userId
		}
	}
});
POSTS.attachSchema(articlesSchema);

var messagesSchema = new SimpleSchema({
	msn: {
		type:String
	},
	date: {
		type:Date,
		autoValue:function() {
			return new Date();
		}
	},
	user: {
		type:String,
		autoValue:function(){
			return this.userId;
		}
	}
});
MESSAGES.attachSchema(messagesSchema);

var comentsSchema = new SimpleSchema({
	text : {
		type : String,
		label : "Comentarios"
	},
	current_date : {
		type : Date,
		label : "fecha de publicacion",
		autoValue : function()
		{
			return new Date();
		}
	},
	articuloId:{
		type:String,
		label:"Articulo"		
	},
	user:{
		type:String,
		autoValue:function(){
			return this.userId
		}
	},
	edit:{
		type:Boolean
	}	
});
COMENTS.attachSchema(comentsSchema);

var perfilSchema = new SimpleSchema({
	images:{
		type:String,
		optional:true,
		label:"Images"
	},
	ciudad : {
		type : String,
	},
	estado_civil : {
		type : String,
	},
	celular : {
		type : String,
	},
	user:{
		type:String,
		autoValue:function(){
			return this.userId
		}
	}

});
PERFIL.attachSchema(perfilSchema);

var chatSchema = new SimpleSchema({
	date: {
		type:Date,
		autoValue:function() {
			return new Date();
		}
	},
	user: {
		type:String,
		autoValue:function(){
			return this.userId;
		}
	}
});
CHAT.attachSchema(chatSchema);
/*auemnatdo*/
ChatRooms = new Meteor.Collection("chatrooms");
/*auemnatdo*/