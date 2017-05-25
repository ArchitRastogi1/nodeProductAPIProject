var jwt = require('jwt-simple');
var user = require('../models/User');

var auth = {
   login : function(req,res,next) {
      var userEmail = req.body.userEmail || '';
      var password = req.body.password || '';
      if(userEmail == '' || password == '') {
        res.status(401);
        res.json({"status" : 401, "msg" : 'Invalid Login Credential'}).end();
        return ;
      }

      auth.validate(userEmail,password,function(err,user){
        if(!user) {
          res.status(401);
          res.json({"status" : 401, "msg" : 'Invalid Login Credential'}).end();
        } else {
          var token = genToken(user);
          res.cookie('token', token, { maxAge: 900000, httpOnly: true });
          res.json(token).end();
        }
      });
    },

   validate : function(userEmail,password,callback) {
      user.findOne({'userEmail':userEmail,'password':password},function(err,user){
        if(err) {
          return callback(err);
        } else {
          return callback(null,user);
        }
      });
    },

   validateUser : function(userId,callback) {
      user.find({'userId':userId}, function(err,user) {
        if(err) {
          return callback(err);
        } else {
          return callback(null,user);
        }
      });
    },

   signup : function(req,res,next) {
     var userEmail = req.body.userEmail || '';
     var password = req.body.password || '';
     var name = req.body.name || '';
     if(userEmail == '' || password == '' || name == '') {
       res.status(400);
       res.json({"status" : 400, "msg" : 'Invalid signup data'}).end();
       return ;
     }
     var newuser = new user({'userEmail':userEmail,'password' : password,'name':name});
     newuser.save(function(err,user) {
       if(err) {
         res.json({"status":401,"msg":"Some Internal error in creating user."});
       }
       res.json(user).end();
       return;
     });
   }
}

function genToken(user) {
  var expires = expireIn(7);
  var token = jwt.encode({
    exp:expires,
    userId:user.userId
  },require('../config/secret.js')());
  return token;
}

function expireIn(days) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + days);
}

module.exports = auth;
