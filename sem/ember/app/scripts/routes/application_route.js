EmberApp.ApplicationRoute = Ember.Route.extend({
	model : function() {
		console.log("ApplicationRoute called.");
		this.store.createRecord('user', {
			id : 2,
			isLoggedIn : true,
			name : 'admin',
		  	pass : 'securepassword',
		  	token : '123123123'
		});
	}
});
