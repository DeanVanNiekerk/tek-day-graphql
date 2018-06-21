var mongoose = require('mongoose');

var Identity = new mongoose.Schema({
  userGuid: String,
  identityGuid: String,
  applicationGuid: String
});

var User = new mongoose.Schema({
  userGuid: String,
  firstName: String,
  lastName: String,
  identities: [Identity]
});

module.exports = mongoose.model('User', User);