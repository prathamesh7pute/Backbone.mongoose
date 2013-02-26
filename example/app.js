var mongoose = require("mongoose"),
	Book = require("./models/book"),
	Library = require("./collections/library"),
	fs = require('fs'),
	Backbone = require("Backbone"),
	mongooseSync = require("./backbone.mongoose"),
	config = {
		db_url: "db_url goes here",
		schema_dir: __dirname + "/schema"
	};

//replace Backbone.sync with the mongoose sync
Backbone.sync = mongooseSync(config);


//Initialize sample Backbone Models and collection fot the tests
var Book = Backbone.Model.extend({
	mongooseModel: "Book",
	idAttribute: "_id",
	defaults: {
		"name": ""
	}
});

var Library = Backbone.Collection.extend({
	model: Book,
	mongooseModel: "Book"
});

var book = new Book({
	name: "Javascript Patterns"
});
book.save();
