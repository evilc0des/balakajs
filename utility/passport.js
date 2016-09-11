//var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/user');


module.exports=function(passport){

  passport.serializeUser(function(user, done) {
   // this user object is from mongoose
   done(null, user._id);
  });
  passport.deserializeUser(function(_id, done) {
   // find user in mongoose
    User.findById(_id, function(err, user){
      done(err, user);
    });
  });


  passport.use('local-login', new LocalStrategy({
        usernameField: 'user',
        passwordField: 'pass',
        session:true,
        passReqToCallback: true
      },
      function(req, username, password, done){
        process.nextTick(function(){
          console.log('Here', req.body);
          console.log('User', username);
          User.findOne({ 'user': username}, function(err, user){
            if(err)
            {
              console.log('error');
              return done(err);
            }
            if(!user)
            {
              console.log('nouser');
              return done(null, false, req.flash('loginMessage', 'No User found'));              
            }
            if(user.password != password){
              console.log('nopass');
              return done(null, false, req.flash('loginMessage', 'inavalid password'));
            }
            console.log(user);
            return done(null, user);

          });
        });
      }
    ));

};
