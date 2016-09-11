$(document).ready(function (e) {
	 $('.playlist-item').click(function (e) {
	 	var secondary = $('.playlist-item').find('img').width(150).height();
	 	var primary =$(this).find('img').width(250);
	 	console.log(primary.height());
	 	console.log(secondary);
	 	var secondaryHeight = 100 + (primary.height()/2)-(secondary/2);
	 	$('.playlist-item').css('z-index', 100).css('position', 'absolute').css('left', '50%').css('top', secondaryHeight+'px');
	 	$(this).css('z-index', 500).css('position', 'absolute').css('left', '25%').css('top', '100px'); 
	 })

	 $('.container-index').height($(window).height());
	 $('.sideNav').height($(window).height());
	 $('.sideNav-main').height(0.7*$(window).height());
})