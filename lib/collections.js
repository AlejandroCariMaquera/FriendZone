POSTS=new Mongo.Collection("public");
MESSAGES = new Mongo.Collection("messages");
COMENTS = new Mongo.Collection("coments");
var Schemas={}
Schemas.Coments = new SimpleSchema({
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
	autor : {
		type : String,
		label : "Autor",
		autoValue : function(){
			return Accounts.userId();
		}
	}
});
COMENTS.attachSchema(Schemas.Coments);

POSTS.attachSchema(Schemas.Coments);
POSTS.allow({
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
var articlesSchema = new SimpleSchema({
	images:{
		type:String,
		label:"Images"
	},
	text:{
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