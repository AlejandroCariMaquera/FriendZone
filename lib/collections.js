POSTS=new Mongo.Collection("public");
MESSAGES = new Mongo.Collection("messages");
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