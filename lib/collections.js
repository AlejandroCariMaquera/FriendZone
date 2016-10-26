POSTS=new Mongo.Collection("public");
POSTS.allow({
	"insert":function(){
		return true;
	}
});