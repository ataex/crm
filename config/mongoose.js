const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);
mongoose.plugin(require('./../plugins/updated-at'));

module.exports = mongoose;