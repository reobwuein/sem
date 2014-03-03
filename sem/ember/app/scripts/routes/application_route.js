EmberApp.User = DS.Model.extend({
		name: DS.attr('string'),
		pass: DS.attr('string'),
		token : DS.attr('string')
	});

EmberApp.ApplicationRoute = Ember.Route.extend({
	model : function() {
		console.log("Storing user.");
		var store = this.get('store');

		store.push('user', {
      		ID: 0,
      		name: "Gerard",
  			pass: "David Bazan",
      		token: "10"
    	});

    	var result = store.all('user',1);
		console.log(result.get('name'));
		
	}
});
