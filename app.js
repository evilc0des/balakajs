var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var multer  = require('multer');

var app = express();
var conf = require('./config');

//Passport Strategies Defined
require('./utility/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: conf.redisStore.secret,
  resave: true,
  saveUninitialized: true,  
  store: new RedisStore({
    host: conf.redisStore.host,       //where redis store is
    port: conf.redisStore.port,              //default redis port
    prefix: 'balaka'         //prefix for sessions name is store
  })

}));
app.use(passport.initialize());
app.use(passport.session());

//routes

var userFn = require('./routes/users');

var routes = require('./routes/index');
var users = userFn(passport);
var admin = require('./routes/admin')(upload);

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);

//Database Setup
mongoose.connect(conf.dbUrl, {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 1
      }
    } 
  }, function(err){
    if (err) {
      console.log(conf.dbUrl);
      console.error('Connecting error in mongodb...', err);
      return;
    };

    console.log('mongodb connected...');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
