EmberApp.DocumentsRoute = Ember.Route.extend({
	
    model: function () {
    	var creationDate;
        this.document = [];
        for(var i = 0, l = 20; i<l; i++){

        	// random data
        	creationDate = randomDate();
			this.document.push({
				"name" : "test document " + i,
				"persons" : (Math.random() > .33 && "Kees Vonk" || Math.random() > .33 && "Klasien van Diepen" || "Bep de Denker"),
				"types" : "test document",
				"instances" : ["Sem"],
				"date" : creationDate.getHours() + ":" + creationDate.getMinutes() + " " + creationDate.getDate() + "/" + creationDate.getMonth() + "/" + creationDate.getFullYear()
			})        	
        }

		function randomDate(maxMiliSecondsBack){
			maxMiliSecondsBack = maxMiliSecondsBack || 31536000000; // one year default;
			return new Date( new Date().getTime() - maxMiliSecondsBack + Math.random() * maxMiliSecondsBack)
		}

        return this;
    }

});
