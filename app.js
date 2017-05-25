var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var requestValidator = require('./middlewares/RequestValidator');
var authenticatedRoute = require('./routes/AuthenticatedRoute');
var nonLoggedInRoute = require('./routes/NonLoggedInRoute');


var mongo = require('./config/db');
mongoose.connect(mongo());

var app = express();

/** middleware for logging requests */
app.use(logger('dev'));

/** middleware for parsing cookie */
app.use(cookieParser());

/** middleware for parsing request body */
app.use(bodyParser.json());

app.all('/*', function(req,res,next){
  /* CORS Headers */
  res.header('Access-Control-Allow-Origin',"*");
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

  if(req.method == 'OPTIONS') {
    res.sendStatus(200).end();
  } else {
    next();
  }
});

/** for validating user request using jwt token */
app.all('/api/v1/*', requestValidator);

/** for non logged in users */
app.use('/users', nonLoggedInRoute);

/** for rest apis which requires authentication */
app.use('/api/v1', authenticatedRoute);

/* for handling wrong urls */
app.use('/*',function(req,res,next){
  res.status(404);
  res.json({"status":false,"msg":"Please give correct api url"}).end();
});

app.listen(3000);

module.exports = app;
