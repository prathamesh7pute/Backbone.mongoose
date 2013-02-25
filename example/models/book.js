var Backbone = require('Backbone');

var Book = Backbone.Model.extend({
	mongooseModel: "Book",
	defaults: {
		"name": ""
	}
});

exports = module.exports = Book;
