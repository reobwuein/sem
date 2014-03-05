EmberApp.Document = DS.Model.extend({
	name : DS.attr('string'),
	persons : DS.attr('string'),
	types : DS.attr('string'),
	instances : DS.attr('string'),
	date : DS.attr('string')
});  

EmberApp.Document.FIXTURES = [{
	id : 1,	
	name: "Document 1",
	persons : "Jan-Klaas de Slimme",
	types : "Form",
	instances : "SEM",
	date : "2013/12/1"
}]