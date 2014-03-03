EmberApp.User = DS.Model.extend({
	name: DS.attr('string'),
	pass: DS.attr('boolean')
});

EmberApp.User.FIXTURES = [{
	name: "super user",
	pass: "epic laser dragon"
}]