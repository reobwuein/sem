EmberApp.DocumentsController = Ember.ArrayController.extend({

    // arrangedContent: function() {
    //     var search = this.get('search');
    //     if (!search) { return this.get('content') }

    //     return this.get('content').filter(function(note) {            
    //         return note.get('title').indexOf(search) != -1;
    //     })
    // }.property('content', 'titleFilter')

    // filterValue : undefined,

    // content : function() {
    //     var content = this.get('content');
    //     console.log('filterContent called.');

    //     if (!content || !this.get('filterValue')) {
    //         console.log('filter value not defined.');
    //         return content;
    //     }

    //     var filterValue = this.get('filterValue');
    //     return content.filter(function(item) {
    //         if(item.get('name').find('filterValue') != -1) {
    //             return true;
    //         }
    //     });
    // }.property('content.isLoaded', 'filterValue'),

    // actions : {
    //     filterDocuments : function(newFilter) {
    //         console.log("new filter = " + newFilter);
    //         this.set('fi',newFilter);
    //     },
    // },
    search: '',    
    titleFilter: null,
    
    actions:{
        query: function() {
            // the current value of the text field
            var query = this.get('search');
            this.set('titleFilter', query);
        }
    },
    
    arrangedContent: function() {
        var search = this.get('search');
        if (!search) { 
            console.log("No search filter found. Return all content");
            return this.get('content') 
        }

        return this.get('content').filter(function(note) {            
            return note.get('title').indexOf(search) != -1;
        })
    }.property('content', 'titleFilter')

});