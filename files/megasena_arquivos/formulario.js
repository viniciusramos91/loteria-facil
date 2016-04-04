
	// jQuery Mask Plugin v1.3.1
	// github.com/igorescobar/jQuery-Mask-Plugin
	(function(c){var w=function(a,d,e){var f=this;a=c(a);var l;d="function"==typeof d?d(a.val(),e):d;f.init=function(){e=e||{};f.byPassKeys=[8,9,16,37,38,39,40,46,91];f.translation={0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}};f.translation=c.extend({},f.translation,e.translation);f=c.extend(!0,{},f,e);a.each(function(){!1!==e.maxlength&&a.attr("maxlength",d.length);a.attr("autocomplete","off");g.destroyEvents();g.events();
	g.val(g.getMasked())})};var g={events:function(){a.on("keydown.mask",function(){l=g.val()});a.on("keyup.mask",g.behaviour);a.on("paste.mask",function(){setTimeout(function(){a.keydown().keyup()},100)})},destroyEvents:function(){a.off("keydown.mask").off("keyup.mask").off("paste.mask")},val:function(v){var d="input"===a.get(0).tagName.toLowerCase();return 0<arguments.length?d?a.val(v):a.text(v):d?a.val():a.text()},behaviour:function(a){a=a||window.event;if(-1===c.inArray(a.keyCode||a.which,f.byPassKeys))return g.val(g.getMasked()),
	g.callbacks(a)},getMasked:function(){var a=[],c=g.val(),b=0,q=d.length,h=0,l=c.length,k=1,r="push",m=-1,n,s;e.reverse?(r="unshift",k=-1,n=0,b=q-1,h=l-1,s=function(){return-1<b&&-1<h}):(n=q-1,s=function(){return b<q&&h<l});for(;s();){var t=d.charAt(b),u=c.charAt(h),p=f.translation[t];p?(u.match(p.pattern)?(a[r](u),p.recursive&&(-1==m?m=b:b==n&&(b=m-k),n==m&&(b-=k)),b+=k):p.optional&&(b+=k,h-=k),h+=k):(a[r](t),u==t&&(h+=k),b+=k)}return a.join("")},callbacks:function(f){var c=g.val(),b=g.val()!==l;if(!0===
	b&&"function"==typeof e.onChange)e.onChange(c,f,a,e);if(!0===b&&"function"==typeof e.onKeyPress)e.onKeyPress(c,f,a,e);if("function"===typeof e.onComplete&&c.length===d.length)e.onComplete(c,f,a,e)}};f.remove=function(){g.destroyEvents();g.val(f.getCleanVal()).removeAttr("maxlength")};f.getCleanVal=function(){for(var a=[],c=g.val(),b=0,e=d.length;b<e;b++)f.translation[d.charAt(b)]&&a.push(c.charAt(b));return a.join("")};f.init()};c.fn.mask=function(a,d){return this.each(function(){c(this).data("mask",
	new w(this,a,d))})};c.fn.unmask=function(){return this.each(function(){c(this).data("mask").remove()})};c("input[data-mask]").each(function(){var a=c(this),d={};"true"===a.attr("data-mask-reverse")&&(d.reverse=!0);"false"===a.attr("data-mask-maxlength")&&(d.maxlength=!1);a.mask(a.attr("data-mask"),d)})})(window.jQuery||window.Zepto);
	/*
	* maskMoney plugin for jQuery
	* http://plentz.github.com/jquery-maskmoney/
	* version: 2.1.2
	* Licensed under the MIT license
	*/
	;(function($) {
		if(!$.browser){
			$.browser = {};
			$.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
			$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
			$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
			$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
		}
	
		var methods = {
			destroy : function(){
				var input = $(this);
				input.unbind('.maskMoney');
	
				if ($.browser.msie) {
					this.onpaste = null;
				}
				return this;
			},
	
			mask : function(){
				return this.trigger('mask');
			},
	
			init : function(settings) {
				settings = $.extend({
					symbol: '',
					symbolStay: false,
					thousands: ',',
					decimal: '.',
					precision: 2,
					defaultZero: true,
					allowZero: false,
					allowNegative: false
				}, settings);
	
				return this.each(function() {
					var input = $(this);
					var dirty = false;
	
					function markAsDirty() {
						dirty = true;
					}
	
					function clearDirt(){
						dirty = false;
					}
	
					function keypressEvent(e) {
						e = e || window.event;
						var k = e.which || e.charCode || e.keyCode;
						if (k == undefined) return false; //needed to handle an IE "special" event
						if (k < 48 || k > 57) { // any key except the numbers 0-9
							if (k == 45) { // -(minus) key
								markAsDirty();
								input.val(changeSign(input));
								return false;
							} else if (k == 43) { // +(plus) key
								markAsDirty();
								input.val(input.val().replace('-',''));
								return false;
							} else if (k == 13 || k == 9) { // enter key or tab key
								if(dirty){
									clearDirt();
									$(this).change();
								}
								return true;
							} else if ($.browser.mozilla && (k == 37 || k == 39) && e.charCode == 0) {
								// needed for left arrow key or right arrow key with firefox
								// the charCode part is to avoid allowing '%'(e.charCode 0, e.keyCode 37)
								return true;
							} else { // any other key with keycode less than 48 and greater than 57
								preventDefault(e);
								return true;
							}
						} else if (canInputMoreNumbers(input)) {
							return false;
						} else {
							preventDefault(e);
	
							var key = String.fromCharCode(k);
							var x = input.get(0);
							var selection = getInputSelection(x);
							var startPos = selection.start;
							var endPos = selection.end;
							x.value = x.value.substring(0, startPos) + key + x.value.substring(endPos, x.value.length);
							maskAndPosition(x, startPos + 1);
							markAsDirty();
							return false;
						}
					}
	
					function canInputMoreNumbers(element){
						var reachedMaxLength = (element.val().length >= element.attr('maxlength') && element.attr('maxlength') >= 0);
						var selection = getInputSelection(element.get(0));
						var start = selection.start;
						var end = selection.end;
						var hasNumberSelected = (selection.start != selection.end && element.val().substring(start,end).match(/\d/))? true : false;
						return reachedMaxLength && !hasNumberSelected;
					}
	
					function keydownEvent(e) {
						e = e||window.event;
						var k = e.which || e.charCode || e.keyCode;
						if (k == undefined) return false; //needed to handle an IE "special" event
	
						var x = input.get(0);
						var selection = getInputSelection(x);
						var startPos = selection.start;
						var endPos = selection.end;
	
						if (k==8) { // backspace key
							preventDefault(e);
	
							if(startPos == endPos){
								// Remove single character
								x.value = x.value.substring(0, startPos - 1) + x.value.substring(endPos, x.value.length);
								startPos = startPos - 1;
							} else {
								// Remove multiple characters
								x.value = x.value.substring(0, startPos) + x.value.substring(endPos, x.value.length);
							}
							maskAndPosition(x, startPos);
							markAsDirty();
							return false;
						} else if (k==9) { // tab key
							if(dirty) {
								$(this).change();
								clearDirt();
							}
							return true;
						} else if ( k==46 || k==63272 ) { // delete key (with special case for safari)
							preventDefault(e);
							if(x.selectionStart == x.selectionEnd){
								// Remove single character
								x.value = x.value.substring(0, startPos) + x.value.substring(endPos + 1, x.value.length);
							} else {
								//Remove multiple characters
								x.value = x.value.substring(0, startPos) + x.value.substring(endPos, x.value.length);
							}
							maskAndPosition(x, startPos);
							markAsDirty();
							return false;
						} else { // any other key
							return true;
						}
					}
	
					function focusEvent(e) {
						var mask = getDefaultMask();
						if (input.val() == mask) {
							input.val('');
						} else if (input.val()=='' && settings.defaultZero) {
							input.val(setSymbol(mask));
						} else {
							input.val(setSymbol(input.val()));
						}
						if (this.createTextRange) {
							var textRange = this.createTextRange();
							textRange.collapse(false); // set the cursor at the end of the input
							textRange.select();
						}
					}
	
					function blurEvent(e) {
						if ($.browser.msie) {
							keypressEvent(e);
						}
	
						if (input.val() == '' || input.val() == setSymbol(getDefaultMask()) || input.val() == settings.symbol) {
							if(!settings.allowZero){
								input.val('');
							} else if (!settings.symbolStay){
								input.val(getDefaultMask());
							} else {
								input.val(setSymbol(getDefaultMask()));
							}
						} else {
							if (!settings.symbolStay){
								input.val(input.val().replace(settings.symbol,''));
							} else if (settings.symbolStay && input.val() == settings.symbol){
								input.val(setSymbol(getDefaultMask()));
							}
						}
					}
	
					function preventDefault(e) {
						if (e.preventDefault) { //standard browsers
							e.preventDefault();
						} else { // old internet explorer
							e.returnValue = false
						}
					}
	
					function maskAndPosition(x, startPos) {
						var originalLen = input.val().length;
						input.val(maskValue(x.value));
						var newLen = input.val().length;
						startPos = startPos - (originalLen - newLen);
						setCursorPosition(input, startPos);
					}
	
					function mask(){
						var value = input.val();
						input.val(maskValue(value));
					}
	
					function maskValue(v) {
						v = v.replace(settings.symbol, '');
	
						var strCheck = '0123456789';
						var len = v.length;
						var a = '', t = '', neg='';
	
						if(len != 0 && v.charAt(0)=='-'){
							v = v.replace('-','');
							if(settings.allowNegative){
								neg = '-';
							}
						}
	
						if (len==0) {
							if (!settings.defaultZero) return t;
							t = '0.00';
						}
	
						for (var i = 0; i<len; i++) {
							if ((v.charAt(i)!='0') && (v.charAt(i)!=settings.decimal)) break;
						}
	
						for (; i < len; i++) {
							if (strCheck.indexOf(v.charAt(i))!=-1) a+= v.charAt(i);
						}
						var n = parseFloat(a);
	
						n = isNaN(n) ? 0 : n/Math.pow(10,settings.precision);
						t = n.toFixed(settings.precision);
	
						i = settings.precision == 0 ? 0 : 1;
						var p, d = (t=t.split('.'))[i].substr(0,settings.precision);
						for (p = (t=t[0]).length; (p-=3)>=1;) {
							t = t.substr(0,p)+settings.thousands+t.substr(p);
						}
	
						return (settings.precision>0)
						? setSymbol(neg+t+settings.decimal+d+Array((settings.precision+1)-d.length).join(0))
						: setSymbol(neg+t);
					}
	
					function getDefaultMask() {
						var n = parseFloat('0')/Math.pow(10,settings.precision);
						return (n.toFixed(settings.precision)).replace(new RegExp('\\.','g'),settings.decimal);
					}
	
					function setSymbol(value){
						if (settings.symbol != ''){
							var operator = '';
							if(value.length != 0 && value.charAt(0) == '-'){
								value = value.replace('-', '');
								operator = '-';
							}
	
							if(value.substr(0, settings.symbol.length) != settings.symbol){
								value = operator + settings.symbol + value;
							}
						}
						return value;
					}
	
					function changeSign(input){
						var inputValue = input.val();
						if (settings.allowNegative){
							if (inputValue != '' && inputValue.charAt(0) == '-'){
								return inputValue.replace('-','');
							} else {
								return '-' + inputValue;
							}
						} else {
							return inputValue;
						}
					}
	
					function setCursorPosition(input, pos) {
						// I'm not sure if we need to jqueryfy input
						$(input).each(function(index, elem) {
							if (elem.setSelectionRange) {
								elem.focus();
								elem.setSelectionRange(pos, pos);
							} else if (elem.createTextRange) {
								var range = elem.createTextRange();
								range.collapse(true);
								range.moveEnd('character', pos);
								range.moveStart('character', pos);
								range.select();
							}
						});
						return this;
					};
	
					function getInputSelection(el) {
						var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;
	
						if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
							start = el.selectionStart;
							end = el.selectionEnd;
						} else {
							range = document.selection.createRange();
	
							if (range && range.parentElement() == el) {
								len = el.value.length;
								normalizedValue = el.value.replace(/\r\n/g, "\n");
	
								// Create a working TextRange that lives only in the input
								textInputRange = el.createTextRange();
								textInputRange.moveToBookmark(range.getBookmark());
	
								// Check if the start and end of the selection are at the very end
								// of the input, since moveStart/moveEnd doesn't return what we want
								// in those cases
								endRange = el.createTextRange();
								endRange.collapse(false);
	
								if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
									start = end = len;
								} else {
									start = -textInputRange.moveStart("character", -len);
									start += normalizedValue.slice(0, start).split("\n").length - 1;
	
									if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
										end = len;
									} else {
										end = -textInputRange.moveEnd("character", -len);
										end += normalizedValue.slice(0, end).split("\n").length - 1;
									}
								}
							}
						}
	
						return {
							start: start,
							end: end
						};
					} // getInputSelection
	
					input.unbind('.maskMoney');
					input.bind('keypress.maskMoney', keypressEvent);
					input.bind('keydown.maskMoney', keydownEvent);
					input.bind('blur.maskMoney', blurEvent);
					input.bind('focus.maskMoney', focusEvent);
					input.bind('mask.maskMoney', mask);
				})
			}
		}
	
		$.fn.maskMoney = function(method) {
			if ( methods[method] ) {
				return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
				return methods.init.apply( this, arguments );
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.maskMoney' );
			}
		};
	})(window.jQuery || window.Zepto);
	
	
	function number_format (number, decimals, dec_point, thousands_sep) {
	  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	  var n = !isFinite(+number) ? 0 : +number,
	    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	    s = '',
	    toFixedFix = function (n, prec) {
	      var k = Math.pow(10, prec);
	      return '' + Math.round(n * k) / k;
	    };
	  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	  if (s[0].length > 3) {
	    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	  }
	  if ((s[1] || '').length < prec) {
	    s[1] = s[1] || '';
	    s[1] += new Array(prec - s[1].length + 1).join('0');
	  }
	  return s.join(dec);
	}
	
	$(function() {
		$( "#accordion" ).accordion({
		  	collapsible: true,
		  	header: ".elastic-table",
		  	heightStyle: "content",
		  	active: false
		});
	});
	$(document).ready(function() {
		
		//FORMULARIO FALE CONOSCO
	    //limitando o funcionamento para acesso anonimo
	    if(!$(".wpthemeHeader").length){
	    	
		    // Visually enhance selects 
		    var label;
		    var newLabel;
		    var $selectButton;
		    
		    $('select').each(function() {
		        label = $(this).children('option:selected').text();
		        
		        $(this).css('opacity','0');
		        $(this).wrap('<div class="select-button" />');
		        $(this).before('<span class="select-label">' + label + '</span><i class="i-justified i-justified-r font-icon i-down-dir"></i>');
		    });
		    $('select').change(function() {
		        newLabel = $(this).children('option:selected').text();
		        $selectButton = $(this).parent('.select-button');
		        
		        $selectButton.children('.select-label').text(newLabel);
		    });
	    
	    }
	    
	});
	/**
	 * 
	 */



	function hifen(field, event) {
		// var input = document.getElementById('campoconta');
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which
				: event.charCode;
		if (keyCode != 46 && keyCode != 8) {

			var campo;
			var size;
			var temp1;
			var temp2;

			campo = field.value;// document.getElementById('campoconta').value;
			campo = campo.replace("-", "");
			size = campo.length;
			if (size >= 2) {
				temp1 = campo.slice(0, size);
				temp2 = campo.slice(size, size);
				campo = temp1 + "-" + temp2;

			}
			// document.getElementById('campoconta').value = campo;
			field.value = campo;
		}
	}

	function validateEmail(field) {
		if (field.value == '') {
			return true;
		}
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (re.test(field.value)) {
			return true;
		} else {
			alert("Voc\u00ea digitou um endere\u00e7o inv\u00e1lido, por favor corriga o email.");
			field.focus();
		}
	}

	function show(elem) {
		elem.style.display = "block";
	}

	function hide(elem) {
		elem.style.display = "";
	}

	function populaDetalheReclamacao(xml){
		$("#spanProtocolo").text($(xml).find("protocolo").text());
		$("#spanNoSituacao").text($(xml).find("situacao").text());
		$("#spanNomeCategoria").text($(xml).find("nomeCategoria").text());
		$("#spanDataEnvio").text($(xml).find("dataEnvio").text());
		var icRelacionamento = $(xml).find("icRelacionamento").text();
		if(icRelacionamento=="S"){
			$("#tenhoContaDisable").prop("checked",true);
		}else{
			$("#naoTenhoContaDisable").prop("checked",true);
		}

		$("#nomeDisabled").val($(xml).find("nome").text());
		$("#categoriaReclamacao").val($(xml).find("categoria").text());
	}
