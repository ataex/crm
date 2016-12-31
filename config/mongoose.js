const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/crm');
mongoose.plugin(require('./../plugins/deleted-at'));

module.exports = mongoose;