EmberApp.DocumentRoute = Ember.Route.extend({
	setupController: function(controller, thisDocument) {
        console.log("Document new route controller setup");
        // test = controller;
		controller.set('model', thisDocument);
		controller.set('field', thisDocument.fields);
	},

	model : function(params) {
		test = this.store.find('document',params.id);
        if(params) {
            // console.log("Document route PARAMS received ");
            // console.log(params);
        }
        console.log("Document route model method called.");
        this.fields = [
        	{
        		"setTextInput":true,
        		"setLabel":true,
        		"uniqueName":"form12-field1",
        		"name":"veld 1",
        		"fieldValue":"tekst 1"
        	},
        	{
        		"setTextArea":true,
        		"setLabel":true,
        		"uniqueName":"form12-field2",
        		"name":"veld 2",
        		"fieldValue":"tekst 2"
        	}, 
        	{
        		"setHeader3":true,
        		"fieldValue":"Kopje"
        	},
        	{
        		"setImage":true,
        		"fieldValue":"http://www.seeklogo.com/images/R/Random-logo-B2E22B770A-seeklogo.com.gif",
        		"name":"logo"
        	}
        ];

        this.name = "form";
        return this;
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