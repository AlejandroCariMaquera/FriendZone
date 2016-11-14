Template.publicacion.helpers({
	DATOS:POSTS.find({}, {sort: [ ["date", "desc"] ] }),
  URL(){
    return URL.get();
  }
});

Template.publicacion.events({
	"click #btnsend":function(e){
		e.preventDefault();
		var r=$("#formpublic").serializeObject();
    if(r.text||r.images){
      POSTS.insert(r);
      $("#input").val("");
      $("#formulario li").find("img").attr("src","");
      $('.done').click();
      $('[name="images"]').val("");
    }
    else
    {
      alert("Debes introducir un estado o una imagen para poder PUBLICAR");
    }
		
    //console.log(r);*/
	}
});
//Codigo like dislike
Template.item.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});
Template.item.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  itemName(user){
    var usuario = Accounts.users.findOne({_id:user});
    return usuario.username+' '+usuario.profile.fullname;
  }
});
Template.item.events({
  'click #like'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.item.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.discounter = new ReactiveVar(0);
});
Template.item.helpers({
  discounter() {
    return Template.instance().discounter.get();
  },
});
Template.item.events({
  'click #dislike'(event, instance) {
    // increment the counter when button is clicked
    instance.discounter.set(instance.discounter.get() + 1);
  },
});
Template.publicacion.helpers({
  autor:function(){
    if(Accounts.user().profile.name!=undefined)
    {
      return Accounts.user().profile.name;
    }else{
      return Accounts.user().username;
    }
  }
});
//--->nombre a las publicaciones
Template.item.helpers({
  texto:function(){
    if(Accounts.user().profile.name!=undefined)
    {
      return Accounts.user().profile.name;
    }else{
      return Accounts.user().username;
    }
  }
});
Template.item.helpers({
  fullname:function(){
    if(Accounts.user().profile.fullname==undefined)
    {
      return "jeje";
    }else{
      
      return Accounts.user().profile.fullname;
    }
  }
});
Template.item.events({
  "click #coment":function(e){
    e.preventDefault();
  },
  'click #removePublicacion': function(e) {
    e.preventDefault();
    if (confirm("¿Seguro que deseas eliminar la publicación?")) {
      var deletePublic = this._id;
      POSTS.remove({_id:deletePublic});
    }
  }
});

