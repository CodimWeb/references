import $ from 'jquery';
import Tab from  'bootstrap/js/src/tab';
// import bootstrap from 'bootstrap';
import '../scss/style.scss';



$(document).ready(function(){
	// console.log(Tab)
    var footer = $('.footer')
    var footerHeight = footer.outerHeight();
	$('.wrapper').css({
		'padding-bottom': footerHeight
	});
	$(window).resize(function(){
		var footerHeight = footer.outerHeight();
		$('.wrapper').css({
			'padding-bottom': footerHeight
		});
	});
});