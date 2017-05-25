module.exports.validateAddProductData = function(request) {
  if(!request.body.code) {
    return "Please provide Product Code";
  }
  if(!request.body.name){
    return "Please provide Product Name";
  }
  if(!request.body.price) {
    return "Please provide Product Price";
  }
}

module.exports.validateEditProductData = function(request) {
  if(!request.body.code) {
    return "Please provide Product Code";
  }
}

module.exports.validateDeleteProductData = function(request) {
  if(!request.body.code) {
    return "Please provide Product Code";
  }
}

module.exports.validateViewProductData = function(request) {
  if(!request.query.code) {
    return "Please provide Product Code";
  }
}
