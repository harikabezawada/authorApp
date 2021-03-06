var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const MongoClient = require('mongodb').MongoClient;
var app = express();
var cors = require('cors')

app.use(cors()) //
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
MongoClient.connect("mongodb://localhost:27017", { promiseLibrary: Promise }, (err, client) => {
  if (err) {
    logger.warn(`Failed to connect to the database. ${err.stack}`);
  }
  var db = client.db('mydb');
  app.locals.db = db;
  console.log('connected  to db')
})
 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type','access_token','authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.status(err.status || 500);
  res.send({status:err.status||500,Error:err.message});
  console.log("err",err);
  // // Pass to next layer of middleware
   next();
  
});


module.exports = app;
