URL=new ReactiveVar("");
/*Uploader.finished=function(index, fileInfo, templateContex){
  console.log(templateContex);
};*/
Template.publicacion.helpers({
  DATOS:POSTS.find({}, {sort: [ ["date", "desc"] ] }),
  URL(){
    return URL.get();
  },
  publicationCallback : function(){
    return {
        finished: function(index, fileInfo, templateContex){
          URL.set(fileInfo.url);
          //console.log(fileInfo);
      }
    }
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
       $("#formulario li").find("video").attr("src","").attr('width', '0');;
      $('.done').click();
      $('[name="images"]').val("");
    }
    else
    {
      alert("Debes introducir un estado o una imagen para poder PUBLICAR");
    }
    console.log(r);
  }
});
//Codigo like dislike
Template.item.onCreated(function helloOnCreated() {
  // counter starts at 0
  var counter=0;
  this.counter = new ReactiveVar(counter);
});
Template.item.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  itemName(user){
    var usuario = Accounts.users.findOne({_id:user});
    return usuario.username+' '+usuario.profile.fullname;
  },
  showname(user){
    var usuario = Accounts.users.findOne({_id:user});
    return usuario.username+' '+usuario.profile.fullname;
  }
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
/*
Template.item.events({
  'click #dislike'(event, instance) {
    // increment the counter when button is clicked
    instance.discounter.set(instance.discounter.get() + 1);
  },
});*/
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
  }, 
  "click .like_ui" :function(e, instance){
      
      //console.log(LIKES.find({idUser: Accounts.user()._id, idArt:this._id}).count());
       instance.counter.set(instance.counter.get() + 1);
      e.preventDefault();
      var obj= {"idArt":this._id};
      //this.countLikes++
      //POSTS.update({_id:this._id},{$set:{countLikes:this.countLikes}});
      LIKES.insert(obj); 
      /* Meteor.call("addlike",this._id,function(error, result){
          if(result){
            alert("like insertado");
          }
       });*/
  },
  "click .nolike_ui":function(e){
      e.preventDefault();
      this.countLikes--;
      var idlike= LIKES.findOne({"idArt":this._id, "idUser":Accounts.user()._id});
      //POSTS.update({_id:this._id},{$set:{countLikes:this.countLikes}}); 
      LIKES.remove(idlike._id);
      /*Meteor.call("removelike",this._id,function(error, result){
          if(result){
            alert("ya no te gusta");
          }
       })*/   
  } 

});
Template.item.helpers({
   dataProfile(user){

    var data = PERFIL.findOne({user:user});
    return data;
  },
  ifLike(){
    if( LIKES.find({idUser: Accounts.user()._id, idArt:this._id}).count()>0 )
      return true;
    return false;
  },
  countLikess(){
    return LIKES.find({idArt:this._id}).count();
  },
  ifVideo(file){
    if(file.slice(-3)=='mp4')
      return true;
    return false;
  }
});

Template.publicacion.helpers({
  ifVideo(file){
    if(file.slice(-3)=='mp4')
      return true;
    return false;
  }
});
/////////