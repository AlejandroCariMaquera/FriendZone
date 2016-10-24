import {Mongo} from "meteor/mongo";

ARTICLE = new Mongo.Collection("articles");

ARTICLE.allow({
	insert:function(userId,params){
		return !!userId
	}
});

var articlesSchema = new SimpleSchema({
	msn: {
		type:String
	},
	date: {
		type:Date,
		autoValue:function(){
			return new Date();
		}
	},
	user: {
		type:String,
		autoValue:function(){
			return this.userId
		}
	},
	mediaContent: {
		type:String,
		autoValue:function(){
			return "";
		}
	}
});
ARTICLE.attachSchema(articlesSchema);
