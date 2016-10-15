var express = require('express');
var router = express.Router();
var Movie=require('../model/movie');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/movielist', function(req, res){
    console.log('here');
    Movie.find({}, function (err, movies) {
        if(err)
            console.log(err);
        var movielist = [];
        movies.forEach( function(movie, index) {
        	if(movie.title != '' && movie.initials != '' && movie.code != '')
            	movielist.push(movie);
        });
        console.log(movielist);
        res.json({s: 'p', d: movielist});
    });
});

module.exports = router;
