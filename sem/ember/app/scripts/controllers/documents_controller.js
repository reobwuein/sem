EmberApp.DocumentsController = Ember.ArrayController.extend({

    arrangedContent: function() {
        var search = this.get('search');
        if (!search) { return this.get('content') }

        return this.get('content').filter(function(note) {            
            return note.get('title').indexOf(search) != -1;
        })
    }.property('content', 'titleFilter')
});