var mongoose = require("mongoose"),
	fs = require('fs'),
	files = fs.readdirSync('./schema'),
	connection, mongooseSync;

files.forEach(function(fileName) {
	require('./schema/' + fileName);
});

connection = mongoose.createConnection("url to connect mongodb");

mongooseSync = function(method, model, options) {

	var MongooseModel = connection && connection.model(model.mongooseModel),

	process = function(err, docs) {
		if(err) {
			if(options.error) {
				options.error(model, err, options);
			}
		}
		if(options.success) {
			options.success(model, docs, options);
		}
	},

	data = model.toJSON() || {};

	options || (options = {});

	if(!MongooseModel) {
		return;
	}

	switch(method) {
		case 'create':
			MongooseModel.create(data, process);
			break;
		case 'update':
			MongooseModel.findByIdAndUpdate(model.id, data, process);
			break;
		case 'patch':
			//MongooseModel.patch(model, process);
			break;
		case 'delete':
			MongooseModel.remove(data, process);
			break;
		case 'read':
			MongooseModel.find(data, process);
	}
};

exports = module.exports = mongooseSync;
