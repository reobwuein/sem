EmberApp.DocumentRoute = Ember.Route.extend({
	model : function(params) {
		return this.store.find('document',params.id);
	},

	actions : {
	    backToMenu : function() {
	        this.transitionTo('/');
	    },

		backToTop : function() {
	    	$("html, body").animate({ scrollTop : 0}, 1000);
	    },

	    backToList : function() {
	    	this.transitionTo('documents');
	    },

        newDocument : function() {
        	this.transitionTo('documents/new');
        },
	}
});