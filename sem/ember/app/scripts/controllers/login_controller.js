
EmberApp.LoginController = Ember.ObjectController.extend({

    actions : 
    {
    	logOut : function() {
            var model = this.get('model');

            model.set('name','');
            model.set('pass','');
            model.set('isLoggedIn',false);

            //Save model after use
            model.save();
        },

    	logIn : function(){
    		var model = this.get('model');

    		model.set('isLoggedIn',true);
			model.save();
			// this.transitionToRoute('/');
    	},

    	goBack : function() {
    		window.history.go(-1);
    	}
    }   	
});