Template.contact.events({
	"click button": function(e) {
		TEMPLATES.set("static");
		console.log("click");
		Router.go("/");
		return false;
	}
});
Template.contact.onRendered( function(){
	$("#contact").hide();
	$("#contact").show('slow', function() {
		
	});
});