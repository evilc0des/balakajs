"use strict";
var express = require('express');
var router = express.Router();
var request = require('request');
const fs = require('fs');
var Movie=require('../model/movie');
var path = require('path');
var async = require('async');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dksaha', 
  api_key: '255866145114681', 
  api_secret: '9H1T_UGw-oDE-nr40hQqIsjEviw' 
});


module.exports = function(upload){

    router.get('/', function(req, res){
        console.log('Auth', req.isAuthenticated());
        if(req.isAuthenticated())
            res.redirect('/admin/dashboard');
        else
           res.render('admin', { title: 'Admin login' });
            
    });

    router.get('/dashboard', function(req, res){
        console.log('AuthDash', req.isAuthenticated());
        if(req.isAuthenticated())
            res.render('dashboard', { title: 'Admin Dashboard' });
        else
            res.redirect('/admin');

    });

    router.get('/movielist', function(req, res){
        console.log('here');
        Movie.find({}, function (err, movies) {
            if(err)
                console.log(err);
            var movielist = [];

            movies.forEach( function(movie, index) {
                movielist.push(movie);
            });
            console.log(req.user);
            res.json({s: 'p', d: movielist, user: req.user.user});
        });
      
    });

    router.post('/record', function(req, res){
        console.log(req.body);
        Movie.findOne({title: req.body.oldname}, function (err, movie) {
            if(err)
                return done(err);
            if(movie){
                movie.title = req.body.title;
                movie.code = req.body.code;
                movie.initials = req.body.initials;
                movie.synopsis = req.body.synopsis;
                movie.trailer = req.body.trailer;
                movie.cast = req.body.cast;
                movie.genre = req.body.genre;

                movie.save(function(err,savedPost){
                    if(err){
                        throw err;
                    }
                    console.log("old Movie Edited",savedPost);
                    res.json({s:'p', d: savedPost._id});
                    //return done(null, savedUser);
                });
            }
            else{

                var newMovie = new Movie();
                newMovie.author = req.user.id;
                newMovie.title = req.body.title;
                newMovie.code = req.body.code;
                newMovie.initials = req.body.initials;
                newMovie.synopsis = req.body.synopsis;
                newMovie.trailer = req.body.trailer;
                newMovie.cast = req.body.cast;
                newMovie.genre = req.body.genre;
                //newMovie.shows = req.body.shows;
                newMovie.save(function(err,savedPost){
                    if(err){
                        throw err;
                    }
                    console.log("New Movie Added",savedPost);
                    res.json({s:'p', d: savedPost._id});
                    //return done(null, savedUser);
                });

            }
        
        });
    });

    router.post('/newshow', function (req, res) {
        Movie.findOne({title: req.body.title}, function (err, movie) {
            movie.shows = req.body.shows;
            movie.save(function (err, savedPost) {
                if(err){
                    throw err;
                }
                console.log(savedPost);
                res.json({s: 'p', d: savedPost});
            });
        });
    });

    router.post('/delete', function (req, res) {

        var movie;
        Movie.findOne({title: req.body.oldname}, function (err, mov) {
            movie = mov;

            async.waterfall(
                [

                    function(callback){

                        Movie.remove({title: req.body.title}, function (err) {
                            
                            if(err)
                                callback(err);
                            else
                                callback(null, {s: 'p'});
                        });

                    },
                    function(result, callback) {
                        /*var posterDir = path.resolve(__dirname, '../public/images/poster/');
                        var posterPath =  posterDir+"/"+req.body.initials+".jpg";
                        //console.log(newPath);
                        fs.unlink(posterPath, function (err) {
                            if(err)
                                callback(err, {s:'f'});
                        });
                        var bannerDir = path.resolve(__dirname, '../public/images/banner/');
                        var bannerPath =  bannerDir+"/"+req.body.title+".jpg";
                        //console.log(newPath);
                        fs.unlink(posterPath, function (err) {
                            if(err)
                                callback(err, {s:'f'});
                            else
                                callback(null, {s: 'p'});
                        });*/

                        cloudinary.uploader.destroy(movie.poster.public_id, function(result) { 
                            console.log(result);
                            cloudinary.uploader.destroy(movie.banner.public_id, function(result) { console.log(result); callback(null, {s: 'p'}) });
                         });

                    }
                ],
                function (err,result) {
                    if(err)
                        throw err;
                    else
                        res.json({s:'p'});
                }
            );
        });

    });         



    // accept one file where the name of the form field is named photho
    router.post('/poster', upload.single('file'), function(req, res){

        console.log(req.file);
        var data = req.file.buffer;
        //var upDir = path.resolve(__dirname, '../public/images/poster/');
        //var newPath =  upDir+"/"+req.headers.title+".jpg";
        cloudinary.uploader.upload_stream(function(result){
            Movie.findOne({initials: req.headers.title}, function (err, movie) {
                console.log(result);
                movie.poster = result;
                movie.markModified('poster');
                movie.save(function(err,savedPost){
                    if(err){
                        throw err;
                    }
                    console.log("old Movie Edited",savedPost);
                    res.json({s:'p', d: savedPost._id});
                    //return done(null, savedUser);
                });
            });
        }).end( req.file.buffer );
        //console.log(newPath);
        /*fs.writeFile(newPath, data, function (err) {
            res.status(204).end();
        });*/
        
    });

    // accept one file where the name of the form field is named photho
    router.post('/banner', upload.single('file'), function(req, res){
        //console.log(req.headers);
        var data = req.file.buffer;
        cloudinary.uploader.upload_stream(function(result){
            Movie.findOne({initials: req.headers.title}, function (err, movie) {
                console.log(result);
                movie.banner = result;
                movie.markModified('banner');
                movie.save(function(err,savedPost){
                    if(err){
                        throw err;
                    }
                    console.log("old Movie Edited",savedPost);
                    res.json({s:'p', d: savedPost._id});
                    //return done(null, savedUser);
                });
            });
        }).end( req.file.buffer );
        /*var upDir = path.resolve(__dirname, '../public/images/banner/');
        var newPath =  upDir+"/"+req.headers.title+".jpg";
        console.log(newPath);
        fs.writeFile(newPath, data, function (err) {
            res.status(204).end();
        });*/
    });

    return router;
}
	



