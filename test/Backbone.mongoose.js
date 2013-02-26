/**
 * Test dependencies.
 */

var mongooseSync = require('../backbone.mongoose'),
	should = require('should'),
	Backbone = require('Backbone'),
	mongoose = require('mongoose'),
	config = {
		db_url: process.env.DB_URL || 'mongodb://localhost/backbone_mongoose_test',
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

/**
 * Tests.
 */
describe('Backbone.mongoose', function() {
	var connection = mongoose.createConnection(config.db_url),
		MongooseModel = connection && connection.model("Book"),
		mongooseModel = new MongooseModel();

	//clear collection before each test
	beforeEach(function(done) {
		mongooseModel.collection.drop(function(err) {
			if (err && err.message !== 'ns not found') {
				done(err);
			}
			done();
		});
	});

	it('must expose version number', function() {
		mongooseSync.VERSION.should.match(/[0-9]+\.[0-9]+\.[0-9]+/);
	});

	it('must match version number', function() {
		mongooseSync.VERSION.should.equal("0.1.1");
	});

	it('Backbone Model.save should save without error', function(done) {
		var book = new Book({
			name: "High Performance Javascript"
		});
		book.on('change', function(doc) {
			doc.toJSON().name.should.equal("High Performance Javascript");
			done();
		});
		book.save();
	});

	it('Backbone Collection.fetch should fetch without error', function(done) {
		var library = new Library(),
			success = function(docs) {
				done();
			},
			error = function(err) {
				done(err);
			};
		library.fetch({
			success: success,
			error: error
		});
	});


});
