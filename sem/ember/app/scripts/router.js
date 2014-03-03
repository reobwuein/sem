Ember.Router.map(function () {

  this.resource('clients');
  this.resource('client', {path:'clients/:id'});

  this.resource('instances');
  this.resource('instance', {path:'instances/:id'});

  this.resource('documents');
  this.resource('document' , {path:'documents/:id'})
  this.resource('document', {path:'documents/new'});

});
