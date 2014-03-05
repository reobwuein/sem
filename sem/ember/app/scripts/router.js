Ember.Router.map(function () {

  this.resource('clients');
  this.resource('client', {path:'clients/:id'});

  this.resource('instances');
  this.resource('instance', {path:'instances/:id'});

  // this.resource('documents',function() {
  //     this.resource('document', {path:'/:id'});
  // });

  this.resource('documents');
  this.resource('document', {path : 'documents/:id'});
  this.resource('document_new', {path : 'documents/new'});

  this.resource('login');
});
