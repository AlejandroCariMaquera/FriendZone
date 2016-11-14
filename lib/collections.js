POSTS=new Mongo.Collection("public");
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


Notifications = new Mongo.Collection('notificaciones');
Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function(comment) {
  var post = POSTS.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};

MESSAGES = new Mongo.Collection("messages");
MESSAGES.allow({
	insert:function()
	{
		return true;
	}
});
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
COMENTS = new Mongo.Collection("coments");
COMENTS.allow({
	insert:function()
	{
		return true;
	}
});
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