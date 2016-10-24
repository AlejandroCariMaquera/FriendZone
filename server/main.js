import { Meteor } from 'meteor/meteor';
 
 

Meteor.startup(() => {
  Meteor.publish("getArticles", function(id){
  	return ARTICLE.find({user:id});
  });
});

