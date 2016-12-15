Meteor.startup(function(){
	
	UploadServer.init({
	    tmpDir: process.env.PWD + '/.tmp',
	    uploadDir: process.env.PWD + '/.uploads/',
	    checkCreateDirectories: true //create the directories for you
	  });
});
import { Meteor } from 'meteor/meteor';
Meteor.publish('usuarios',function(){
	return Meteor.users.find({ "status.online": true });
});

Meteor.methods({
		"addlike":function(id){
			var obj= {"idArt":id};
			var art =POSTS.findOne(id);
			art.countLikes++
			POSTS.update({_id:id},{$set:{countLikes:art.countLikes}});
			LIKES.insert(obj);
			return true;
		},
		"removelike":function(id){
			var art =POSTS.findOne(id);
			art.countLikes--
			POSTS.update({_id:id},{$set:{countLikes:art.countLikes}}); 
			LIKES.remove({"idArt":id});
			return true;
		}
});
Meteor.publish( "getLikes",function(){
	return  LIKES.find();
});

Meteor.publish( "getUsers",function(){
	return  Meteor.users.find();
});



