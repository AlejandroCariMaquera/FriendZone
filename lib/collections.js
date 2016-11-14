POSTS=new Mongo.Collection("public");
MESSAGES = new Mongo.Collection("messages");
COMENTS = new Mongo.Collection("coments");
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