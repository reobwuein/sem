EmberApp.DocumentsRoute = Ember.Route.extend({

	searchFilter : '',

	// setupController : function(controller, model) {
	//     // setupController is a good location to setup your controller
	//     controller.set("model",model);
	// },

    model: function () {
    	console.log('document model called. ');
    	var searchFilter = this.searchFilter;

		var filterFunc = function(item) {
  			console.log("searchFilter=" + searchFilter);
  			if(searchFilter.trim().length > 0) {
  				if(item.get('name').toLowerCase().search(searchFilter) != -1) {
  					return item;
  				}
  			}
  			else {
  				console.log("empty search");
  				return item;
  			}
  		};
  		var records =this.store.all('document');
  		records.set('filterFunction',filterFunc);
		return records;
    }.observes('searchFilter'),

	actions : {
        backToMenu : function() {
            this.transitionTo('/');
        },

        filterDocuments : function(newFilter) {
        	console.log("new filter = " + newFilter);
        	this.set('searchFilter',newFilter);
        },

		backToTop : function() {
        	$("html, body").animate({scrollTop: 0}, 1000);
        },

        //Use documentObject instead of document to avoid aliasing with the DOM!
        goToDocument : function(documentObject) {
        	this.transitionTo('documents/' + documentObject.id,documentObject);
        },

        newDocument : function() {
        	this.transitionTo('documents/new');
        },
    }

});
