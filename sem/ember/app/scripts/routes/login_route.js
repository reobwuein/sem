EmberApp.LoginRoute = Ember.Route.extend({
	
	model : function() {
		// var user = this.store.all('user',1);
		// console.log(user.get('name'));
		// // console.log(user.get('name'));
  //       return user;

  		var store = this.get('store');
	    store.push("user",
	      {
	         id: 1,
	         name : "Gerard",
	         pass : "pass",
	         token : "token"
	      }
	 	);
	    return store.find("user",1);
    },

	actions : {
		logIn : function() {
			console.log("Login Called")
		},

		logOut : function() {

		}
	}
});