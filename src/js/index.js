import $ from 'jquery';

//BS4 components
import Tab from 'bootstrap/js/src/tab'
import Modal from 'bootstrap/js/src/modal'

//styles
import '../scss/style.scss';


$(document).ready(function(){
	//sticky page
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

	//show search dropdown
	$('.header__search-field').on('input', function(e){
		if(e.target.value.length > 1) {
			$(this).siblings('.result-search').fadeIn(250);
			$(this).siblings('.header__search-btn').fadeIn(250);
		} else {
			$(this).siblings('.result-search').fadeOut(250);
			$(this).siblings('.header__search-btn').fadeOut(250);
		}

		//ajax here
	})

	//click on search item 
	$('.result-search__item').on('click', function(){
		$('.header__search-field').val($(this).text());
		$('.result-search').fadeOut(250);
		$('.header__search-btn').fadeOut(250);

		//ajax here
	});

	//hide search dropdown
	$('body').on('click', function(e){
		if($(e.target).hasClass('header__search') || $(e.target).parents('.header__search').length > 0) {
			
		} else {
			$('.result-search').fadeOut(250);
		}
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

	var shareList = [];

	$('.grid-item').each(function(index, item){
		var itemData = {
			image: $(this).find('.references-item__image img').attr('src'),
			name: $(this).find('.references-item__user-name').text(),
			nameLink: $(this).find('.references-item__user-name').attr('href'),
			userPosition: $(this).find('.references-item__user-position').text(),
			userPositionLink: $(this).find('.references-item__user-position').attr('href'),
			userCompany: $(this).find('.references-item__user-company').text(),
			userCompanyLink: $(this).find('.references-item__user-company').attr('href'),
		}
		shareList.push(itemData);
	});

	var maxPosition = shareList.length -1;

	$('body').on('click', '.btn-share-prev', function(){
		var position = parseInt($(this).parents('.grid-item').data('position')) -1;
		if(position > 0) {
			var tmp = shareList[position];
			shareList[position] = shareList[position -1];
			shareList[position -1] = tmp;
			renderShareList(shareList);

		} else {
			position = maxPosition;
			var tmp = shareList[0];
			shareList.splice(0 , 1);
			shareList.push(tmp);
			renderShareList(shareList);
		}
	})

	$('body').on('click', '.btn-share-next', function(){
		var position = parseInt($(this).parents('.grid-item').data('position')) -1;
		if(position == maxPosition) {
			var tmp = shareList[0];
			shareList[0] = shareList[maxPosition];
			shareList[maxPosition] = tmp;
			renderShareList(shareList);
		} else {
			var tmp = shareList[position + 1];
			shareList[position +1] = shareList[position];
			shareList[position] = tmp;
			renderShareList(shareList);
		}
	})

});

function renderShareList(arr) {
	var container = $('.grid-share');
	container.empty();
	$.each(arr, function(index, item){
		container.append(''+
			'<div class="col-3 grid-item" data-position="'+ (index +1) +'">' +
				'<div class="references-item">' +
					'<div class="references-item__body">' +
						'<div class="references-item__image">' +
							'<img src="'+ item.image +'" alt="">' +
						'</div>' +
						'<div class="references-item__user">' +
							'<div class="references-item__user-info references-item__user-info--share-all">' +
								'<div class="share-all-control">' +
									'<button type="button" class="btn btn-share-prev">' +
										'<svg class="icon-share-desctop icon-arrow-left" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">' +
											'<path d="M4.58301 1.5L1.08301 5L4.58301 8.5" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
										'</svg>' +
									'</button>' +
									'<button type="button" class="btn btn-share-next">' +
										'<svg class="icon-share-desctop icon-arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">' +
											'<path d="M1.41699 8.5L4.91699 5L1.41699 1.5" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
										'</svg>' +
									'</button>' +
								'</div>' +
								'<div class="references-item__user-container references-item__user-container--share-all">' +
									'<a href="'+ item.nameLink +'" class="h4 references-item__user-name references-item__user-name--share-all">'+ item.name +'</a>' +
								'</div>' +
								'<div><a href="'+ item.userPositionLink +'" class="references-item__user-position references-item__user-position--share-all">'+ item.userPosition +'</a></div>' +
								'<div><a href="'+ item.userCompanyLink +'" class="references-item__user-company references-item__user-company--share-all">'+ item.userCompany +'</a></div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>'
		)
	})
}