viewModule = angular.module('balakaApp.controllers', []);

viewModule.controller('PlaylistController', function($scope, $window, $http){

	$scope.movies = [];
	$scope.name = '';
	$scope.url = '';
	$scope.synopsis = '';
	$scope.cast = '';
	$scope.price = '';
	$scope.offset= '3';
	$scope.screen='md';

	this.playListFetch = function () {
		console.log('here');
		$http.get("/movielist").success(function(data, status) {
		 	console.log(data);
		 	if(data.s == 'p')
		 	{
		 		$scope.movies = data.d;
		 	}
		 	//console.log(this.username);
		});		 
	}

	$scope.play = function (id) {
		console.log(id);
		var result = $.grep($scope.movies, function(e){ return e._id == id; });
		console.log(result);
		$scope.$apply(function () {
			$scope.offset= '0';
			$scope.screen='sm';
			$scope.name = result[0].title;
			$scope.url = result[0].trailer;
			$scope.synopsis = result[0].synopsis;
			$scope.code = result[0].code;
			$scope.initials = result[0].initials;
			if(result[0].genre)
				$scope.genre = result[0].genre.join();
			if(result[0].cast)
				$scope.cast = result[0].cast.join();
			$scope.poster = result[0].poster.url;
			$scope.banner = result[0].banner.url;
			$scope.shows = result[0].shows;
		});
		


		$('body').css("background", "url('"+result[0].banner.url+"') no-repeat left top");
		$('body').css("background-size", "cover");
	}

	this.showTrailer = function(id) {
		vex.dialog.alert({ unsafeMessage: '<iframe id="youtube-embed" width="800" height="450" src="https://www.youtube.com/embed/'+$scope.url+'?autoplay=1" frameborder="0" allowfullscreen></iframe>' })

	};	
});

viewModule.controller('AdminController', function($scope, $window, $http){

	$scope.user = '';
	$scope.pwd = '';
	$scope.remember = '';

	this.login = function () {

		if($scope.remember == '')
			$scope.remember = false;
		var sendData = {
			user: $scope.user, 
			pass: $scope.pwd,
			remember: $scope.remember
		}
		console.log(sendData);
		$http.post("/users/login", sendData).success(function(data, status) {

			if(data.s == 'p')
				$window.location.href = '/admin';
        });
	}

	this.logout = function() {
		$window.location.href = '/users/logout';
	}


		
});

viewModule.controller('DashboardController', function($scope, $window, $http){

	$scope.title = '';
	$scope.code = '';
	$scope.initials = '';
	$scope.trailer = '';
	$scope.synopsis = '';
	$scope.cast = '';
	$scope.genre = '';

	$scope.hh = [];
	$scope.mm = [];
	$scope.ap = [];
	$scope.price = [];

	this.movielist = function () {
		$http.get("/admin/movielist").success(function(data, status) {
		 	console.log(data);
		 	if(data.s == 'p')
		 	{
		 		$scope.movielist = data.d;
		 		this.username = data.user;
		 	}
		 	console.log(this.username);
		});
	}

	this.record = function () {

		$scope.cast = $scope.cast.split(",");
		$scope.genre = $scope.genre.split(",");
		var results = new RegExp('[\\?&]v=([^&#]*)').exec($scope.trailer);
		if(results)
			var trailerCode = results[1];
		var sendData = {
			oldname: $scope.oldname,
			title: $scope.title, 
			code: $scope.code,
			initials: $scope.initials,
			trailer: trailerCode,
			synopsis: $scope.synopsis,
			cast: $scope.cast,
			genre: $scope.genre
		}
		console.log(sendData);
		$http.post("/admin/record", sendData).success(function(data, status) {

				$('.mainDiv-sec').addClass('hidden-sec');
		 		$('.uploadDiv').removeClass('hidden-sec');
        });		
	}

	this.new = function () {

		//clear the data for new
		$scope.title = '';
		$scope.code = '';
		$scope.initials = '';
		$scope.trailer = '';
		$scope.synopsis = '';
		$scope.cast = '';
		$scope.genre = '';

		$scope.hh = [];
		$scope.mm = [];
		$scope.ap = [];
		$scope.price = [];
		$scope.oldname = 'null';

		$('#inputTitle').val('');
		$('#inputCode').val('');
		$('#inputInitials').val('');
		$('#inputTrailer').val('');
		$('#inputSynopsis').val('');
		$('#inputCast').val('');
		$('#inputGenre').val('');

		$('.form-heading').html('Add a New Movie:');

		$('.mainDiv-sec').addClass('hidden-sec');
		$('.detailDiv').removeClass('hidden-sec');

		console.log(this);
		//angular.element('inputTitle').controller('ngModel').$render();
			 
	}

	this.finish = function() {

		$scope.show = [];
		//console.log()
		for(i = 0; i < $scope.hh.length; i++)
		{
			if($scope.mm[i] == "0")
				$scope.mm[i] = "00";
			if($scope.hh[i] != '' && $scope.hh[i] != '0')
			{
				var time = $scope.hh[i]+":"+$scope.mm[i]+" "+$scope.ap[i];
				$scope.show.push({t: time, p: $scope.price[i]});				
			}

		}
		var sendData = {
			title: $scope.title, 
			shows: $scope.show
		}
		console.log(sendData);
		$http.post("/admin/newshow", sendData).success(function(data, status) {

			if(data.s == 'p')
				$window.location.href = '/admin';
        });
	}

	this.edit = function (name) {

		console.log(name);
		var movielen = $scope.movielist.length;

		var movie;

		for(var i = 0; i < movielen; i++)
		{
		  if($scope.movielist[i].title == name)
		  {
		    movie = $scope.movielist[i];
		  }
		}
		$scope.oldname = movie.title;
		$scope.title = movie.title;
		$scope.code = movie.code;
		$scope.initials = movie.initials;
		$scope.trailer = 'https://www.youtube.com/watch?v='+movie.trailer;
		$scope.synopsis = movie.synopsis;
		$scope.cast = movie.cast.join();
		$scope.genre = movie.genre.join();

		$('.form-heading').html('Edit Movie Records:');

		$('#inputTitle').val($scope.title);
		$('#inputCode').val($scope.code);
		$('#inputInitials').val($scope.initials);
		$('#inputTrailer').val($scope.trailer);
		$('#inputSynopsis').val($scope.synopsis);
		$('#inputCast').val($scope.cast);
		$('#inputGenre').val($scope.genre);

		console.log(movie);
		for(let show of movie.shows)
		{
			console.log(show);
			$scope.hh.push(parseInt(show.t.split(':')[0]));
			$scope.mm.push(parseInt(show.t.split(':')[1].split(' ')[0]));
			$scope.ap.push(parseInt(show.t.split(':')[1].split(' ')[1]));
			$scope.price.push(parseInt(show.p));
		}
		var showlen = $scope.hh.length;
		for(var i = 0; i < showlen; i++)
		{
			$('.inputhh'+i).val($scope.hh[i]);
			$('.inputmm'+i).val($scope.mm[i]);
			$('.inputap'+i).val($scope.ap[i]);
			$('.inputPrice'+i).val($scope.price[i]);
		}
		console.log("in Edit");
		console.log(movie);
		console.log($scope.title);
		console.log($scope.ap);
		console.log($scope.price);

		$('.mainDiv-sec').addClass('hidden-sec');
		$('.detailDiv').removeClass('hidden-sec');


	}

	this.delete = function (name, init) {
		
		vex.dialog.confirm({
		    message: 'Are you absolutely sure you want to delete this movie?',
		    callback: function (value) {
		        if (value) {
		        	var sendData = {
						title: name,
						initials: init
					}
					$http.post("/admin/delete", sendData).success(function(data, status) {

						if(data.s == 'p')
							vex.dialog.alert('Successfully Deleted Movie "'+name+'" !');
							setTimeout(function () {
								 $window.location.href = '/admin';
							}, 5000)
							
			        });
		        } else {
		            console.log('Chicken.')
		        }
		    }
		})
	}

	
});