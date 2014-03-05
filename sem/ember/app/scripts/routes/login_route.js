EmberApp.LoginRoute = Ember.Route.extend({
	setupController : function(controller, model) {
		controller.set('model', model);
	},

	model : function() {
		var model = this.store.find('user',2);
		console.log("user " + model.get('name') + " found");	
		return model;	
    },

    actions : {
        backToMenu : function() {
            this.transitionTo('/');
        }
    }
});