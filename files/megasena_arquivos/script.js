
$(document).ready(function() {
	
	/*LAYOUT*/	
	$('.hero-illustration img').each(function(){
        $(this).removeAttr('width')
        $(this).removeAttr('height');
    });
	$('.action').each(function(){
		if($(this).text().trim().length == 0){
			$(this).remove();
			}
	});
	$('.content p').each(function(){
		if($(this).text().trim().length == 0){
			$(this).remove();
			}
	});
	/* ID exclusiva para cada bloco */
	$('.nav-anchor').each(function(){
		var navContent = $(this).text().trim().toLowerCase().replace(/[_\s]/g, '').replace(/[^a-z0-9-\s]/gi, '');
		$(this).parents('div[class^="component-control"]').attr('id', 'wp_' + navContent + '');
	});
	 
	
});

(function(){
	if(i$.isIE){
		document.createElement('article');
		document.createElement('aside');
		document.createElement('footer');
		document.createElement('header');
		document.createElement('hgroup');
		document.createElement('nav');
		document.createElement('section');
	}
	if(i$.isIE == 7){ document.getElementsByTagName("html")[0].className+=" wptheme_ie7"; }
	if(i$.isIE == 8){ document.getElementsByTagName("html")[0].className+=" wptheme_ie8"; }
})();



/* ------------------------------------------------
	JQuery do menu institucional do site CAIXA
------------------------------------------------ */

/*MOBILE DESKTOP*/	
var iPad = navigator.userAgent.match(/iPad/i) != null;

if (iPad) {
    $('body').addClass('ipad');
}

function slugfy(str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();
  
  var from = "ãàáäâèéëêìíïîòóöôõùúüûñç·/_,:;";
  var to   = "aaaaaeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}

(function( $ ){
  var checkSize = function() {
    var current_width = $(window).width();
    var tabletWidth = 600;
    var desktopWidth = 1000;

    if(current_width < tabletWidth)
      $('html, body').addClass("mobile").removeClass("tablet").removeClass("desktop").data('device', 'mobile');
    else if(current_width >= tabletWidth && current_width <= desktopWidth)
      $('html, body').removeClass("mobile").addClass("tablet").removeClass("desktop").data('device', 'tablet');
    else
      $('html, body').removeClass("mobile").removeClass("tablet").addClass("desktop").data('device', 'desktop');
  }

  $(document).ready(checkSize);
  $(window).resize(checkSize);
})( jQuery );



$(document).ready(function() {
    // Menu
    $('.has-submenu > a').click(function(e){
        e.preventDefault();

        var s = $(this).parent().find('.submenu');
        
        $('.submenu.active').not(s).removeClass('active');
        s.toggleClass('active');

        $('.has-submenu.active').not(s.parent()).removeClass('active');
        $(this).parent().toggleClass('active');
    });

    $('.mobile-menu').click(function(e) {
        e.preventDefault();

        $(this).toggleClass('open-menu');
        $('.main-menu').toggleClass('active');

        if ($(this).hasClass('open-menu')) {
            $('.mobile-account').removeClass('open-account');
            $('.mobile-account-access').removeClass('active');
        }
    });

    
    
    // Search suggest
    var $searchField  = $('.search-input');
    var $suggestItem  = $('.suggest-item');
    var $suggestBox   = $('.suggest-box');
    var $suggestList  = $('.suggest-list');

   // $.getJSON('assets/js/suggest.json', function(data){
   //        for (var i = 0; i < data.length; i++) {
   //            var el = $('<li class="suggest-item"><a href="#" class="suggest-link"><dt class="suggest-title"></dt><dd class="lighter milli"></dd></a></li>');
   //            
   //            el.find('dt').text(data[i]['title']);
   //            el.find('dd').text(data[i]['description']);
   //            el.find('.suggest-link').attr('href', data[i]['url']);
   //
   //            el.appendTo($suggestList);
   //        };

   //        $suggestItem = $('.suggest-item');
   //    });

    $searchField.bind('keyup', function(e) {         
        var searchVal = slugfy($searchField.val().toLowerCase()),
            visible = 0;

        if (e.keyCode == 27) {
            $('.submenu.active').removeClass('active');
            $searchField.val('').trigger('keyup');
            return false;
        }
    
        $suggestItem.each(function() {
            resultTitle = slugfy($(this).find('.suggest-title').text().toLowerCase());

            if (resultTitle.indexOf(searchVal) >= 0 && $searchField.val().length  > 0 && visible < 5) {
                $(this).show();
                visible++;
            } else {
                $(this).hide();
            }
        });         
        
        if ($('.suggest-item:visible').length > 0) {
            $suggestBox.addClass('suggest-box-visible');
        } else {
            $suggestBox.removeClass('suggest-box-visible');
        }               
    
    });

    // A à Z & resultados
    $('#az-search').bind('keyup', function(e){
        var $this = $(this),
            itens = $('.indice-list > li'),
            term = slugfy($this.val().toLowerCase());

        itens.each(function(){
            var $item = $(this),
                title = slugfy($item.find('a').text().toLowerCase());

            if (title.indexOf(term) >= 0) {
                $item.removeClass('invisible');
            } else {
                $item.addClass('invisible');
            }
        });

        $('.indice-letter-group').each(function(){
            var $list = $(this);

            if ($list.find('.indice-list > li.invisible').length < $list.find('.indice-list > li').length) {
                $list.show();
            } else {
                $list.hide();
            }
        });
    });
    var iSide = $('.product-related-content').find('li').find('a');

    iSide.click(function(e){
        var $this = $(this),
        itens = $('.indice-list > li'),
        term = $this.data('slug'),
        select = $this.parent().hasClass('selected');
        //alert( term );
        iSide.parent().removeClass('selected');
        if (!select) {
           $this.parent().addClass('selected');
        };

        itens.each(function(){
            var $item = $(this),
                title = slugfy($item.find('a').text().toLowerCase());
                
            if (title.indexOf(term) >= 0) {
                $item.removeClass('invisible');
            } else {
                $item.addClass('invisible');
            }
            console.log($this.text());
        });

        $('.indice-letter-group').each(function(){
            var $list = $(this),
                slug = $this.attr('data-slug');

            // /alert($list.find('.indice-list > li.invisible').length);
            // if ($list.find('.indice-list > li.invisible').length < $list.find('.indice-list > li').length) {

                $list.find('.indice-list > li').hide();
                if(slug !== "all") {
                    $list.find('.indice-list > li').not('.invisible').show();
                } else {
                    $list.find('.indice-list > li').show();
                }
            // } else {
            // }
        });
        e.preventDefault();
    })

    
    // suggest e sair do menu
    document.onkeydown = function(e) {
        e = e || window.event;
        
        // menu sai no esc
        if (e.keyCode == 27) {
            $('.submenu.active').removeClass('active');
        }

        if((e.keyCode == 40 || e.keyCode == 38) && $('.suggest-box-visible').length){
            var itens = $('.suggest-link:visible'),
                focused = itens.filter(':focus'),
                next;

            if (e.keyCode == 40) {
                if (focused.length) {
                    next = focused.parent().next().find('.suggest-link');
                } else {
                    next = itens.first();
                }
            } else {
                if (focused.length) {
                    next = focused.parent().prev().find('.suggest-link');
                } else {
                    next = itens.last();
                }

                if (next.length < 1) {
                    next = $('#q');
                }
            }

            next.focus();

            return false;
        }
    }

    $(document).click(function(event) { 
        if($(event.target).parents().index($('.main-menu')) == -1) {
            $('.submenu.active').removeClass('active')
            console.log(1)
        }        
    });
//	rybena('ico_libras_2011');
//    includeRybenaNoBar();
//	$('.ico_libras_2011').click(function(){
//        ico_libras_2011();
//    }) 
});
 