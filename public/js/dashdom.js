$(document).ready(function (e) {
	 $('.upload-btn').click(function(){
	 	$('.mainDiv-sec').addClass('hidden-sec');
	 	$('.showDiv').removeClass('hidden-sec');
	 })

	$('.sideNav-main').hover(function(){
	 	$('.movie-opt').hover(function(){
		 	//console.log('here');

		 	$(this).find('#movie-remove-btn').show();

		}, function(){
		 	//console.log('now');
		 	$(this).find('#movie-remove-btn').hide();
		});
	});

	 
})
