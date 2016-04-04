$(document).ready(function() {


/*NAVEGAÇÃO DE PAGINA*/	
	
	/*Busca itens da barra de navegação*/
	if($('body').hasClass('edit-mode')){
		$('.nav-anchor').addClass('visible');
	}else{
		$('.nav-anchor').each(function(i){
			var anchorContent = $(this).text();
			var cleanContent = $(this).text().trim().toLowerCase().replace(/[_\s]/g, '').replace(/â|ã|á|à/gi, "a").replace(/ê|é/g, "e").replace(/í/g, "i").replace(/ô|ó/g, "o").replace(/ú/g, "u").replace(/ç/g, "c");
			if (anchorContent.length > 2) {
				$('#dynamicNav').append('<li><a title=" '+ anchorContent +' " class="wp_' + cleanContent + '">'+ anchorContent +'</a></li>');
			}
		});
	}
	$('.section-index li a:contains("semmenu")').parent().remove();


	
	/*Barra de navegação padrão*/
	$(".section-index").clone().appendTo('body').addClass('section-index-fixed');
	if($('body').hasClass('edit-mode')){
		$('.nav-anchor').show();
	}
	$('.section-index:first li:first-child a').addClass('current-fixed');

	$('.section-index li:first-child').click(function(){
		$('body,html').animate({scrollTop:0},1000);
		$(this).children().addClass('current');
	});
	
	/*Barra de navegação fixa*/
	function navegacaoFixa(){
		$('.section-index').each(function(){
			var distanciaIndex = $(".section-index").offset().top;
			var distanciaTopo = $(window).scrollTop()
			
			if (distanciaTopo >= distanciaIndex) {
				$('.section-index-fixed').addClass('section-index-visible');
			}else{
				$('.section-index-fixed').removeClass('section-index-visible');
			}
		});
   }
   	
   
	$(window).scroll(function(){
		navegacaoFixa();
		conteudoAtual();
		
	});
	 /*Highlight current content on page navigation*/

	function conteudoAtual(){
		var scrollTop = $(this).scrollTop();
		$('.nav-anchor').each(function(){
			
			var distanciaIndex = $(this).parent().offset().top;
			var navContent = $(this).text();
			var alturaNav = $('.section-index-fixed').outerHeight() - 2;
			var ditanciaFim = distanciaIndex - alturaNav
			
			if ( ditanciaFim <= scrollTop ) {
				$('.section-index-fixed li a').removeClass('current');
				$('.section-index-fixed li a:contains("'+navContent+'")').addClass('current');
			}
		}); 
	}
	/*Barra de navegação scroll*/
	$('#dynamicNav li a').bind('click', function(){
		$('#dynamicNav li a').removeClass('current');
		
		var navContent = $(this).text();
		var alturaNav = $('.section-index-fixed').outerHeight() - 4;
		var distanciaIndex = $('.nav-anchor:contains("'+navContent+'")').parent().offset().top;
		var distanciaTopo = $(window).scrollTop()
	   $('html,body').animate({ scrollTop: distanciaIndex-alturaNav}, 1000);
	   $('.section-index-fixed li a:contains("'+navContent+'")').addClass('current');
	   
		   
	 });
	 /* Se tiver anchora na URL */
	if (location.href.indexOf("#") != -1) {
		var breakUrl = window.location.href.substring(window.location.href.lastIndexOf('wp_'));

		$('#dynamicNav li a').each(function(){
			if($(this).hasClass(breakUrl)){
				$(this).trigger("click");
			}
		});
	}
	/*Ancora no texto*/
	$('.content-section a[class^="wp_"]').click(function(e) {
		e.preventDefault();
		var alturaNav = $('.section-index-fixed').outerHeight() - 4;
		var distanciaTopo = $(window).scrollTop()
		var navContent = $(this).attr('class')
		var distanciaIndex = $('#' + navContent).offset().top;
       $('html,body').animate({ scrollTop: distanciaIndex-alturaNav}, 1000);
			 
	  
});
});
/*
Exception: missing ( before condition
*/