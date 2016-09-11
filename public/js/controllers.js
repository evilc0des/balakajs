viewModule = angular.module('balakaApp.controllers', []);

viewModule.controller('PlaylistController', function($scope, $window, $http){

	$scope.movies = [];
	$scope.name = '';
	$scope.url = '';
	$scope.synopsis = '';
	$scope.cast = '';
	$scope.price = '';

	this.playListFetch = function () {
		 /* body... */ 
	}

	this.play = function (id) {
		 /* body... */ 
	}	
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
		var sendData = {
			oldname: $scope.oldname,
			title: $scope.title, 
			code: $scope.code,
			initials: $scope.initials,
			trailer: $scope.trailer,
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
			if($scope.hh != '')
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
		$scope.trailer = movie.trailer;
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
			$scope.hh.push(show.t.split(':')[0]);
			$scope.mm.push(show.t.split(':')[1].split(' ')[0]);
			$scope.ap.push(show.t.split(':')[1].split(' ')[1]);
			$scope.price.push(show.p);
		}
		var showlen = $scope.hh.length;
		for(var i = 0; i < showlen; i++)
		{
			$('.inputhh'+i).val($scope.hh[i]);
			$('.inputmm'+i).val($scope.mm[i]);
			$('.inputap'+i).val($scope.ap[i]);
			$('.inputPrice'+i).val($scope.price[i]);
		}

		console.log(movie);
		console.log($scope.title);
		console.log($scope.ap);
		console.log($scope.price);

		$('.mainDiv-sec').addClass('hidden-sec');
		$('.detailDiv').removeClass('hidden-sec');


	}

	
});