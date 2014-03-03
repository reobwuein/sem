EmberApp.User = DS.Model.extend({
	name: DS.attr('string'),
	pass: DS.attr('boolean'),
	token : DS.attr('string')
});

EmberApp.User.FIXTURES = [{
	name: "super user",
	pass: "epic laser dragon",
	token : "token"
}]