FlowRouter.route('/',{
	name:'elias',
	action(){
		BlazeLayout.render('nav',{main:'form'});
	}
});
FlowRouter.route('/about',{
	name:'About',
	action(){
		BlazeLayout.render('about');
	}
});
FlowRouter.route('/contact',{
	name:'About',
	action(){
		BlazeLayout.render('contact');
	}
});
FlowRouter.route('/profile',{
	name:'Profile',
	subscriptions:function(params, queryParams)
	{
		this.register("getUsers",Meteor.subscribe('getUsers'));
		this.register("loadLikes",Meteor.subscribe('getLikes'));
		this.register("loadMuro",Meteor.subscribe("getArticles",Meteor.userId()));
	},
	action(){
		BlazeLayout.render('profile');
	}
});
/*
FlowRouter.route({  
  waitOn: function() {
    return [Meteor.subscribe('POSTS'), Meteor.subscribe('notificaciones')]
  }
});*/