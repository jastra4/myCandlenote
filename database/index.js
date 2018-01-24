var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_RED_URI);
var db = mongoose.connection;

