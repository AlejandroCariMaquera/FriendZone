Template.contact.events({
	"click button": function(e) {
		TEMPLATES.set("static");
		console.log("click");
		Router.go("/");
		return false;
	}
});
Template.contact.onRendered( function(){
	$("#contacto").hide();
	$("#contacto").show('slow', function() {
		
	});
});