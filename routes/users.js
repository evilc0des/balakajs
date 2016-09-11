var express = require('express');
var router = express.Router();
//var passport = require('passport');


module.exports=function(passport){

	router.post('/login', 
	  passport.authenticate('local-login', { failureRedirect: '/admin' }),
	  function(req, res) {
	  	console.log(req.user);
	  	console.log(req.body);
	  	console.log(req.isAuthenticated());
	  	if (req.body.remember) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
          req.session.cookie.expires = false; // Cookie expires at end of session
        }
	    res.json({s:'p'});
	  });

	router.get('/logout', function(req, res){
		if(req.isAuthenticated())
			req.logout();
		res.redirect('/admin');
	})

	return router;
}

