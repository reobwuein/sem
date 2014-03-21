EmberApp.DocumentsRoute = Ember.Route.extend({

	searchFilter : '',

	setupController : function(controller, documents) {
	    // setupController is a good location to setup your controller
      console.log("documents_route.js setupController");
	    controller.set("content",documents);
	},

    model: function () {
    	console.log('document model called. ');
  //   	var searchFilter = this.searchFilter;

		// var filterFunc = function(item) {
  // 			console.log("searchFilter=" + searchFilter);
  // 			if(searchFilter.trim().length > 0) {
  // 				if(item.get('name').toLowerCase().search(searchFilter) != -1) {
  // 					return item;
  // 				}
  // 			}
  // 			else {
  // 				console.log("empty search");	
  // 				return item;
  // 			}
  // 		};
  // 		var records =this.store.all('document');
  // 		records.set('filterFunction',filterFunc);
		// return records;
		var searchFilter = this.get('searchFilter');
		console.log('searchFilter ' + searchFilter);
		var records = this.store.filter('document',function(item) {
			name = item.get('name');
			if(item.get('name').search(searchFilter) != -1) {
				return item;
			}
		});
		
		return records;
		// return this.store.find('document');
    }.observes('searchFilter'),

	actions : {
        backToMenu : function() {
            this.transitionTo('/');
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

        filterDocuments : function(value) {
        	console.log('new value = ' + value);
          test = this.get('model');
          this.get('model').reload();
        	this.set('searchFilter',value);
        }
    }

});
