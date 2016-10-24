Template.muro.events({
	"submit #mainForm":function(e){
		e.preventDefault();
		var message = e.target.message.value
		ARTICLE.insert({msn:message});
		e.target.message.value = "";
		//alert(message);
	}
});
Template.muroMsn.helpers({
	isReady(){
		return FlowRouter.subsReady("loadMuro");
	},
	items(){
		return ARTICLE.find();
	}
});