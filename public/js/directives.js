directiveModule = angular.module('balakaApp.directives', []);

directiveModule.directive('playlistItem', function(){
	// Runs during compile
	return {

		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, iElm, iAttrs, controller) {
			iElm.click(function (e) {
				$('.playlist-div').addClass('col-md-6')
			 	var secondary = $('.playlist-item').find('img').width(150).height('auto').height();
			 	var primary =$(this).find('img').width(225);
			 	console.log(primary.height());
			 	console.log(secondary);
			 	var secondaryHeight = 100 + (primary.height()/2)-(secondary/2);
			 	$('.playlist-item').addClass('queued');
			 	$(this).removeClass('queued');
			 	$('.playlist-item.queued').each(function(index) {
			 		$(this).css('z-index', (4-index+1)*100).css('position', 'absolute').css('left', (50+(index*15))+'%').css('top', secondaryHeight+'px');
			 	})
			 	$(this).css('z-index', 500).css('position', 'absolute').css('left', '25%').css('top', '100px'); 
			 	$('.jumbotron').hide();
			 	$('.playlist-viewer').show();
			 	$scope.play(iAttrs.playlistItem);
	 		})
		}
	};
});