
EmberApp.DocumentController = Ember.ObjectController.extend({

    actions : {
    	logOut : function() {
            console.log("Logout called.");
        },
    	logIn : function(){
            console.log("Login called.");	
    	}
    }   	
})