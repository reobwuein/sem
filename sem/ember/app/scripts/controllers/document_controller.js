EmberApp.DocumentController = Ember.ObjectController.extend({

    isEditing : false,
    isReading : true,

    actions : {
    	editDocument : function(){
    		this.set('isEditing', true);
    		this.set('isReading', false);
    	},
    	readDocument : function(){
    		this.set('isEditing', false);
    		this.set('isReading', true);
    	}
    }	
});