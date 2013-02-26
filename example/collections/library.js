var Backbone = require('Backbone'),
	Book = require("../models/book");

var Library = Backbone.Collection.extend({
	model: Book,
	mongooseModel: "Book",
});

exports = module.exports = Library;
