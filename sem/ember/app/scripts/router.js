Ember.Router.map(function () {

  this.resource('clients');
  this.resource('client', {path:'clients/:id'});

  this.resource('instances');
  this.resource('instance', {path:'instances/:id'});

  this.resource('documents');
  
  this.resource('document' , {path:'/documents/:document_id'});
  this.route('document', {path:'/documents/new'});

	// this.resource('documents', function() {
 //  	this.resource('document' , {path:'/:document_id'})
 //  	this.resource('document', {path:'new'});	
 //  });

  this.resource('login');
 

});
