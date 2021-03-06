var product = require('..//models/Product');
var jwt = require('jwt-simple');
var validator = require('../validators/ApiDataValidator');

/** api for adding new product */
module.exports.addProduct = function(req,res,next) {
  var newProduct = new product(req.body);
  var error = validator.validateAddProductData(req);
  if(error) {
    res.status(400).json({"status":400,"msg": error}).end();
    return;
  }
  newProduct.save(function(err,product){
    if(err) {
      res.status(500).json({"status" : 500,"msg" : err.errmsg}).end();
      return;
    }
    if(product) {
      res.json({"status": 200, "msg" : "Successfully added new product", "productCode" : product.code});
    } else {
      res.json({"status":200,"msg":"Internal error in adding new product"}).end();
    }
    return;
  });
}

/** api for deleting product */
module.exports.deleteProduct = function(req,res,next) {
  var error = validator.validateDeleteProductData(req);
  if(error) {
    res.status(400).json({"status":400,"msg": error}).end();
    return;
  }
  product.findOneAndRemove({code:req.body.code},function(err,product){
    if(err) {
      res.status(500).json({"status" : 500,"msg" : 'Internal error in deleting product'}).end();
      return;
    }
    if(product) {
      res.json({"status":200,"msg":"Successfully deleted product", "productCode": product.code}).end();
    } else {
      res.json({"status":200,"msg":"Product does not exist"}).end();
    }
    return;
  });
}

/** api for viewing specific product */
module.exports.viewProduct = function(req,res,next) {
  var error = validator.validateViewProductData(req);
  if(error) {
    res.status(400).json({"status":400,"msg" : error}).end();
    return;
  }
  product.findOne({code:req.query.code},{_id:0},function(err,product){
      if(err) {
        res.status(500).json({"status" : 500,"msg" : 'Internal error in fetching product'}),end();
        return;
      }
      if(product) {
        res.json({"status":200,"data":product});
      } else {
        res.json({"status":200,"msg":"Product does not exist" }).end();
      }
      return;
  });
}

/** api for viewing all products */
module.exports.viewAllProducts = function(req,res,next) {
  product.find({},{_id:0},function(err,products){
      if(err) {
        res.status(500).json({"status" : 500,"msg" : 'Internal error in fetching product'}).end();
        return;
      }
      if(products) {
        res.json({"status":200,"data":products}).end();
      } else {
        res.json({"status":200,"msg":"Product does not exist" }).end();
      }
      return;
  });
}

/** api for editing product */
module.exports.editProduct = function(req,res,next) {
  var error = validator.validateEditProductData(req);
  if(error) {
    res.status(400).json({"status":400,"msg": error}).end();
    return;
  }
  product.findOneAndUpdate({code:req.body.code},req.body,function(err,product){
    if(err) {
      res.status(500).json({"status" : 500,"msg" : 'Internal error in editing produc'}).end();
      return;
    }
    if(product) {
      res.json({"status":200,"msg":"Successfully edited product details"}).end();
    } else {
      res.json({"status":200,"msg":"Couldn't find product to update"}).end();
    }
    return;
  });
}
