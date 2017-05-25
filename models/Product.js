var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productSchema = new schema({
  name :{
    type: String,
    required:true
  },
  code : {
    type : String,
    required: true,
    unique: true
  },
  price : {
    type: Number,
    required: true,
  }
});

var product = mongoose.model('products',productSchema);

module.exports = product;
