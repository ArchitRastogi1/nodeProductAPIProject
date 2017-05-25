var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var mongo = require('../config/db');

var connection = mongoose.createConnection(mongo());
autoIncrement.initialize(connection);

var schema = mongoose.Schema;

var userSchema = new schema({
  name :{
    type: String,
    required:true
  },
  userId : {
    type : Number,
    required: true
  },
  userEmail : {
    type: String,
    required: true,
    unique:true
  },
  username : {
    type: String
  },
  password : {
    type: String,
    required: true
  }
});

userSchema.plugin(autoIncrement.plugin,{
  model : 'user',
  field : 'userId',
  startAt : 1,
  incrementBy : 1
});

var user = mongoose.model('users',userSchema);

module.exports = user;
