POSTS=new Mongo.Collection("public");
POSTS.allow({
	"insert":function(){
		return true;
	}
});
var articlesSchema = new SimpleSchema({
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