var mongoose = require("mongoose"),
	Book = require("./models/book"),
	Library = require("./collections/library"),
	fs = require('fs'),
	Backbone = require("Backbone"),
	mongooseSync = require("./Backbone.mongoose");

Backbone.sync = mongooseSync;
