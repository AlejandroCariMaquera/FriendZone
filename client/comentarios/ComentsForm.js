Template.ComentsForm.helpers({
	listComents(){
		return COMENTS.find({articuloId:this._id});	
	} 
});
Template.ComentsForm.events({
	"click button" : function(e)
	{
		e.preventDefault();
		var dato=$(e.currentTarget).closest("form").serializeObject();
		COMENTS.insert(dato);
	}
});