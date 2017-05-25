var jwt = require('jwt-simple');
var auth = require('../controllers/AuthController');
var secret = require('../config/secret');

module.exports = function(req,res,next) {
  var token = req.cookies['token'];

  if(token) {
    try {
      var decoded = jwt.decode(token,secret());
      if(decoded.exp <= Date.now()) {
        res.status(400);
        res.json({"status" : false,"msg" : 'token expired'}).end();
      }
      var key = decoded.userId;
      auth.validateUser(key,function(err,user){
        if(user) {
          next();
        } else {
          res.status(401);
          res.json({"status" : false,"msg" : 'invalid user'}).end();
        }
      });
    } catch(err) {
      res.status(500);
      res.json({"status" : false,"msg" : 'oops something went wrong'}).end();
    }
  } else {
    res.status(401);
    res.json({"status" : false,"msg" : 'invalid token or key'}).end();
  }
}
