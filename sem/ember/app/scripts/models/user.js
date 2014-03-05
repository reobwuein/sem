EmberApp.User = DS.Model.extend({
	name: DS.attr('string'),
	pass: DS.attr('string'),
	token : DS.attr('string'),
	isLoggedIn : DS.attr('boolean'),
});

// EmberApp.User.FIXTURES = [{
// 	id : 1,	
// 	name: "super user",
// 	pass: "epic laser dragon",
// 	token : "token",
// 	isLoggedIn : true
// }]