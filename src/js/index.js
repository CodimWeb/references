import $ from 'jquery';

//BS4 components
import Tab from 'bootstrap/js/src/tab'
// import bootstrap from 'bootstrap';

//styles
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

	// create name for link
	$('.references-item__add-name').on('click', function(){
		//item parent eevnt
		var item = $(this).parents('.references-item');
		//show form
		$(this).fadeOut(300);
		setTimeout(function(){
			item.find('.share-link__edit-form').fadeIn(300);
		}, 300)
		
	});

	// remove error onfocus
	$('.share-link__edit-textarea').focusin(function(){
		var item = $(this).parents('.references-item');
		item.find('.share-link__edit-textarea').removeClass('error');
		item.find('.share-link__edit-error').removeClass('active');
	});

	// add active class if textarea not empty
	$('.share-link__edit-textarea').on('input', function(){
		if($(this).val() != '') {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	})

	// cancel form name link
	$('.share-link__edit-form .share-link__cancel').on('click', function(){
		//item parent eevnt
		var item = $(this).parents('.references-item');

		//hide form
		item.find('.share-link__edit-form').fadeOut(300);

		//clear form
		item.find('.share-link__edit-textarea').val('');

		//show btn create name
		setTimeout(function(){
			item.find('.references-item__add-name').fadeIn(200);
			item.find('.share-link__name__container').fadeIn(200);
		}, 300)	
	});

	// save name link
	$('.share-link__edit-form .share-link__save').on('click', function(){
		//item parent eevnt
		var item = $(this).parents('.references-item');
		// empty or nbsp only
		if((item.find('.share-link__edit-textarea').val() == '') || /^\s+$/.test(item.find('.share-link__edit-textarea').val())) {
			item.find('.share-link__edit-textarea').addClass('error');
			item.find('.share-link__edit-error').addClass('active');
		} else {
			item.find('.references-item__add-name').remove();
			item.find('.share-link__edit-form').fadeOut(300);
			setTimeout(function(){
				var appendContainer = item.find('.references-item__name-panel');
				appendContainer.empty()
				appendContainer.append(
					'<div class="share__label">link name</div>' +
					'<div class="share-link__name__container">' +
						'<p class="share-link__name">' + item.find('.share-link__edit-textarea').val() + '</p>' +
						'<button type="button" class="btn share-link__edit">' +
							'<i class="icon icon-edit"></i>' +
						'</button>' +
					'</div>'
				);

				//clear form
				item.find('.share-link__edit-textarea').val('');	
			},300);
		}
	});

	// edit name link
	$('body').on('click', '.share-link__edit', function(){
		var item = $(this).parents('.references-item');
		//show form
		item.find('.share-link__name__container').fadeOut(300);
		setTimeout(function(){
			item.find('.share-link__edit-textarea').val(item.find('.share-link__name').text());
			item.find('.share-link__edit-form').fadeIn(300);
		}, 300)
	});
});