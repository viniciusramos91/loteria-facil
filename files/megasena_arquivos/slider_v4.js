$(document).ready(function() {
var quantity = { 'mobile': 1, 'tablet': 3, 'desktop': 4 };

var recalculateSlider = function(slider) {
    var wrapper = slider.find('.slider-itens'),
        itens = wrapper.find('li'),
        device = slider.data('device'),
        pages = 0,
        current = wrapper.find('li.current').index(),
        pagination = $('.slider-pagination');

    // recalculate only if the device changes
    if (!$('body').hasClass(device)) {
        device = $('body').data('device');
        slider.data('device', device);

        wrapper.width((itens.length * 100 / quantity[device]) + '%');
        itens.width((100 / itens.length) + '%');

        pages = Math.ceil(itens.length / quantity[device]);
        pagination.html('');

        for (var i = 1; i <= pages; i++) {
            var el = $('<a href="#" class="pagination-item">'+pages[i]+'</a>');
            // ((q * p) + 1) <= x && x <= ((p + 1) * q)
            // if (((quantity[device] * (i - 1)) + 1) <= (current + 1) && (current + 1) <= (i * quantity[device])) {
            //     el.addClass('current');
            // }
            pagination.append(el);
        };

        if (!pagination.find('.current').length) pagination.find('a:first').addClass('current');
        pagination.find('.current').trigger('click');
    }
}

$(document).ready(function () {
    var itens = $('.slider-itens li'),
    title = $("h1"),
    titleLow = title.text().toLowerCase().replace('-', '').replace('â','a').replace('á','a').replace(' ', '');

    itens.each(function (i) {
        var flag = 0,
            expr = 'a[href*=\'' + titleLow + '\']',
            itemTitle = $(this).find(expr);
        itemTitle.each(function (j) {
            flag = 1;
            return false;
        });
        if (flag == 1) {
            $(this).hide();
        };
    });
});

equalheight = function(container){

	var currentTallest = 0,
		 currentRowStart = 0,
		 rowDivs = new Array(),
		 $el,
		 topPosition = 0;
	 $(container).each(function() {

	   $el = $(this);
	   $($el).height('auto')
	   topPostion = $el.position().top;

	   if (currentRowStart != topPostion) {
		 for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		   rowDivs[currentDiv].height(currentTallest);
		 }
		 rowDivs.length = 0; // empty the array
		 currentRowStart = topPostion;
		 currentTallest = $el.height();
		 rowDivs.push($el);
	   } else {
		 rowDivs.push($el);
		 currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  }
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
		 rowDivs[currentDiv].height(currentTallest);
	   }
	 });
	 $('.slider-wrapper').each(function() {
		 var h = $('.slider-text').outerHeight();
		 $(this).css('height',h)

    });
}


jQuery(function($){
    $(document).on('click', '.section-slider .pagination-item', function(e){
        e.preventDefault();

        var atual = $(this).parents('.slider').find('.slider-itens > li.current'),
            proximo = $('.slider-itens > li:eq('+$(this).index()+')');

        atual.removeClass('current');
        proximo.trigger('slideChanged');
    });

    $('.section-slider .slider-prev').click(function(e){
        e.preventDefault();

        var atual = $(this).parents('.slider').find('.slider-itens > li.current'),
            proximo = atual.prev('li');

        if (proximo.length > 0)
        {
            atual.removeClass('current');
            proximo.trigger('slideChanged');
        }
    });

    $('.section-slider .slider-next').click(function(e){
        e.preventDefault();

        var atual = $(this).parents('.slider').find('.slider-itens > li.current'),
            proximo = atual.next('li');

        if (proximo.length > 0 && proximo.index() < $('.pagination-item').length)
        {
            atual.removeClass('current');
            proximo.trigger('slideChanged');
        }
    });

    $('.slider-itens > li').bind('slideChanged', function(){
        var $this = $(this),
            device = $this.parents('.section-slider').data('device'),
            i = $this.index(),
            total = $('.slider-itens > li').length,
            offset = (i + 1) * quantity[device],
            position = i * 100;


        if (position && offset > total) {
            position -= (100 / quantity[device]) * (offset - total);
        }


        position = Math.max(0, position);
		$('.slider-itens').animate({left: -position + '%'}, 500);

        $this.addClass('current');
        $('.section-slider a.current').removeClass('current');
        $('.section-slider a.pagination-item:eq('+i+')').addClass('current');
    });

    recalculateSlider($('.section-slider'));
	equalheight('.slider-text');



});
    $(window).resize(function(){
        equalheight('.slider-text');
		recalculateSlider($('.section-slider'));
    });

});