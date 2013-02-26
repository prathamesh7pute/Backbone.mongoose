var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
	name: String
});

exports = module.exports = mongoose.model('Book', BookSchema);
