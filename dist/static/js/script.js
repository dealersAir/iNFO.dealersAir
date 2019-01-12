// global variables
;var browser, ajax, animate;

(function () {
	"use strict";

	// Get useragent

	document.documentElement.setAttribute('data-useragent', navigator.userAgent.toLowerCase());

	// Browser identify
	browser = function (userAgent) {
		userAgent = userAgent.toLowerCase();

		if (/(msie|rv:11\.0)/.test(userAgent)) {
			return 'ie';
		}
	}(navigator.userAgent);

	// Add support CustomEvent constructor for IE
	try {
		new CustomEvent("IE has CustomEvent, but doesn't support constructor");
	} catch (e) {
		window.CustomEvent = function (event, params) {
			var evt;

			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};

			evt = document.createEvent("CustomEvent");

			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

			return evt;
		};

		CustomEvent.prototype = Object.create(window.Event.prototype);
	}

	// Window Resized Event
	var winResizedEvent = new CustomEvent('winResized'),
	    rsz = true;

	window.addEventListener('resize', function () {
		if (rsz) {
			rsz = false;

			setTimeout(function () {
				window.dispatchEvent(winResizedEvent);
				rsz = true;
			}, 1021);
		}
	});

	// Closest polyfill
	if (!Element.prototype.closest) {
		(function (ElProto) {
			ElProto.matches = ElProto.matches || ElProto.mozMatchesSelector || ElProto.msMatchesSelector || ElProto.oMatchesSelector || ElProto.webkitMatchesSelector;

			ElProto.closest = ElProto.closest || function closest(selector) {
				if (!this) {
					return null;
				}

				if (this.matches(selector)) {
					return this;
				}

				if (!this.parentElement) {
					return null;
				} else {
					return this.parentElement.closest(selector);
				}
			};
		})(Element.prototype);
	}

	// Check element for hidden
	Element.prototype.elementIsHidden = function () {
		var elem = this;

		while (elem) {
			if (!elem) break;

			var compStyle = getComputedStyle(elem);

			if (compStyle.display == 'none' || compStyle.visibility == 'hidden' || compStyle.opacity == '0') {
				return true;
			}

			elem = elem.parentElement;
		}

		return false;
	};

	// Ajax
	ajax = function ajax(options) {
		var xhr = new XMLHttpRequest();

		xhr.open('POST', options.url);

		if (typeof options.send == 'string') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				options.success(xhr.response);
			} else if (xhr.readyState == 4 && xhr.status != 200) {
				options.error(xhr.response);
			}
		};

		xhr.send(options.send);
	};

	/*
 Animation
 animate(function(takes 0...1) {}, Int duration in ms[, Str easing[, Fun animation complete]]);
 */
	animate = function animate(draw, duration, ease, complete) {
		var start = performance.now();

		requestAnimationFrame(function anim(time) {
			var timeFraction = (time - start) / duration;

			if (timeFraction > 1) {
				timeFraction = 1;
			}

			var progress = ease ? easing(timeFraction, ease) : timeFraction;

			draw(progress);

			if (timeFraction < 1) {
				requestAnimationFrame(anim);
			} else {
				if (complete != undefined) {
					complete();
				}
			}
		});
	};

	function easing(timeFraction, ease) {
		switch (ease) {
			case 'easeInQuad':
				return quad(timeFraction);

			case 'easeOutQuad':
				return 1 - quad(1 - timeFraction);

			case 'easeInOutQuad':
				if (timeFraction <= 0.5) {
					return quad(2 * timeFraction) / 2;
				} else {
					return (2 - quad(2 * (1 - timeFraction))) / 2;
				}
		}
	}

	function quad(timeFraction) {
		return Math.pow(timeFraction, 2);
	}
})();
;var MobNav;

(function () {
	"use strict";

	//fix header

	var headerElem = document.querySelector('.header');

	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 21) {
			headerElem.classList.add('header_fixed');
		} else if (!document.body.classList.contains('popup-is-opened') && !document.body.classList.contains('mob-nav-is-opened')) {
			headerElem.classList.remove('header_fixed');
		}
	});

	//mob menu
	MobNav = {
		options: null,
		winScrollTop: 0,

		fixBody: function fixBody(st) {
			if (st) {
				this.winScrollTop = window.pageYOffset;

				document.body.classList.add('mob-nav-is-opened');
				document.body.style.top = -this.winScrollTop + 'px';
			} else {
				document.body.classList.remove('mob-nav-is-opened');

				window.scrollTo(0, this.winScrollTop);
			}
		},

		open: function open(btnElem) {
			var headerElem = document.getElementById(this.options.headerId);

			if (!headerElem) return;

			if (btnElem.classList.contains('opened')) {
				this.close();
			} else {
				btnElem.classList.add('opened');
				headerElem.classList.add('opened');
				this.fixBody(true);
			}
		},

		close: function close() {
			var headerElem = document.getElementById(this.options.headerId);

			if (!headerElem) return;

			headerElem.classList.remove('opened');

			var openBtnElements = document.querySelectorAll(this.options.openBtn);

			for (var i = 0; i < openBtnElements.length; i++) {
				openBtnElements[i].classList.remove('opened');
			}

			this.fixBody(false);
		},

		init: function init(options) {
			var _this = this;

			this.options = options;

			document.addEventListener('click', function (e) {
				var openElem = e.target.closest(options.openBtn),
				    closeElem = e.target.closest(options.closeBtn),
				    menuLinkElement = e.target.closest(options.menuLinkSelector);

				if (openElem) {
					e.preventDefault();
					_this.open(openElem);
				} else if (closeElem) {
					e.preventDefault();
					_this.close();
				} else if (menuLinkElement) {
					_this.close();
				}
			});
		}
	};
})();
/*
* call Menu.init(Str menu item selector, Str sub menu selector);
*/
var Menu;

(function () {
	"use strict";

	Menu = {
		toggle: function toggle(elem, elementStr, subMenuStr) {
			var subMenuElem = elem.querySelector(subMenuStr);

			if (!subMenuElem) {
				return;
			}

			if (elem.classList.contains('active')) {
				subMenuElem.style.height = 0;

				elem.classList.remove('active');
			} else {
				var mainElem = elem.closest('.menu'),
				    itemElements = mainElem.querySelectorAll(elementStr),
				    subMenuElements = mainElem.querySelectorAll(subMenuStr);

				for (var i = 0; i < itemElements.length; i++) {
					itemElements[i].classList.remove('accord__button_active');
					subMenuElements[i].style.height = 0;
				}

				subMenuElem.style.height = subMenuElem.scrollHeight + 'px';

				elem.classList.add('active');
			}
		},

		init: function init(elementStr, subMenuStr) {
			var _this = this;

			document.addEventListener('click', function (e) {
				var elem = e.target.closest(elementStr);

				if (!elem) {
					return;
				}

				_this.toggle(elem, elementStr, subMenuStr);
			});
		}
	};
})();
/*
Toggle.init(Str toggleSelector[, onDocClickToggleOffSelecor[, Str toggledClass (default - 'toggled')]]);

Toggle.onChange = function(toggleElem, state) {
	// code...
}
*/

;var Toggle;

(function () {
	"use strict";

	Toggle = {
		toggledClass: 'toggled',
		onChange: null,

		target: function target(toggleElem, state) {
			var targetElements = document.querySelectorAll(toggleElem.getAttribute('data-target-elements'));

			if (!targetElements.length) return;

			if (state) {
				for (var i = 0; i < targetElements.length; i++) {
					targetElements[i].classList.add(this.toggledClass);
				}

				//dependence elements
				if (toggleElem.hasAttribute('data-dependence-target-elements')) {
					var dependenceTargetElements = document.querySelectorAll(toggleElem.getAttribute('data-dependence-target-elements'));

					for (var i = 0; i < dependenceTargetElements.length; i++) {
						dependenceTargetElements[i].classList.remove(this.toggledClass);
					}
				}
			} else {
				for (var i = 0; i < targetElements.length; i++) {
					targetElements[i].classList.remove(this.toggledClass);
				}
			}
		},

		toggle: function toggle(toggleElem, off) {
			var state;

			if (toggleElem.classList.contains(this.toggledClass)) {
				toggleElem.classList.remove(this.toggledClass);

				state = false;

				if (toggleElem.hasAttribute('data-first-text')) {
					toggleElem.innerHTML = toggleElem.getAttribute('data-first-text');
				}
			} else if (!off) {
				toggleElem.classList.add(this.toggledClass);

				state = true;

				if (toggleElem.hasAttribute('data-second-text')) {
					toggleElem.setAttribute('data-first-text', toggleElem.innerHTML);

					toggleElem.innerHTML = toggleElem.getAttribute('data-second-text');
				}
			}

			//target
			if (toggleElem.hasAttribute('data-target-elements')) {
				this.target(toggleElem, state);
			}

			//call onChange
			if (this.onChange) {
				this.onChange(toggleElem, state);
			}
		},

		onDocClickOff: function onDocClickOff(e, onDocClickOffSelector) {
			var toggleElements = document.querySelectorAll(onDocClickOffSelector + '.' + this.toggledClass);

			for (var i = 0; i < toggleElements.length; i++) {
				var elem = toggleElements[i];

				if (elem.hasAttribute('data-target-elements')) {
					var targetSelectors = elem.getAttribute('data-target-elements');

					if (!e.target.closest(targetSelectors)) {
						this.toggle(elem, true);
					}
				}
			}
		},

		init: function init(toggleSelector, onDocClickOffSelector, toggledClass) {
			var _this = this;

			if (toggledClass) {
				this.toggledClass = toggledClass;
			}

			document.addEventListener('click', function (e) {
				var toggleElem = e.target.closest(toggleSelector);

				if (toggleElem) {
					e.preventDefault();

					_this.toggle(toggleElem);
				} else {
					_this.onDocClickOff(e, onDocClickOffSelector);
				}
			});
		}
	};
})();
var Popup, MediaPopup;

(function () {
	'use strict';

	//popup core

	Popup = {
		winScrollTop: 0,
		onClose: null,
		headerSelector: '.header',

		fixBody: function fixBody(st) {
			var headerElem = document.querySelector(this.headerSelector);

			if (st && !document.body.classList.contains('popup-is-opened')) {
				this.winScrollTop = window.pageYOffset;

				var offset = window.innerWidth - document.documentElement.clientWidth;

				document.body.classList.add('popup-is-opened');

				if (headerElem) {
					headerElem.style.right = offset + 'px';
				}

				document.body.style.right = offset + 'px';

				document.body.style.top = -this.winScrollTop + 'px';
			} else if (!st) {
				if (headerElem) {
					headerElem.style.right = '';
				}

				document.body.classList.remove('popup-is-opened');

				window.scrollTo(0, this.winScrollTop);
			}
		},

		open: function open(elementStr, callback) {
			var elem = document.querySelector(elementStr);

			if (!elem || !elem.classList.contains('popup__window')) {
				return;
			}

			this.close();

			var elemParent = elem.parentElement;

			elemParent.classList.add('popup_visible');

			elem.classList.add('popup__window_visible');

			if (callback) {
				this.onClose = callback;
			}

			this.fixBody(true);

			return elem;
		},

		message: function message(elementStr, msg, callback) {
			var elem = this.open(elementStr, callback);

			elem.querySelector('.popup__inner').innerHTML = '<div class="popup__message">' + msg + '</div>';
		},

		close: function close() {
			var elements = document.querySelectorAll('.popup__window');

			if (!elements.length) {
				return;
			}

			for (var i = 0; i < elements.length; i++) {
				var elem = elements[i];

				if (!elem.classList.contains('popup__window_visible')) {
					continue;
				}

				elem.classList.remove('popup__window_visible');
				elem.parentElement.classList.remove('popup_visible');
			}

			if (this.onClose) {
				this.onClose();
				this.onClose = null;
			}
		},

		init: function init(elementStr) {
			var _this = this;

			document.addEventListener('click', function (e) {
				var element = e.target.closest(elementStr),
				    closeElem = e.target.closest('.js-popup-close');

				if (element) {
					e.preventDefault();

					_this.open(element.getAttribute('data-popup'));
				} else if (closeElem || !e.target.closest('.popup__window') && e.target.closest('.popup')) {
					_this.fixBody(false);

					_this.close();
				}
			});

			if (window.location.hash) {
				this.open(window.location.hash);
			}
		}
	};

	//popup media
	MediaPopup = {
		image: function image(args) {
			var elemPopup = Popup.open(args.popupStr),
			    elemImg = elemPopup.querySelector('.popup-media__image');

			Popup.onClose = function () {
				elemImg.src = '#';
				elemImg.classList.remove('popup-media__image_visible');
			};

			elemImg.src = args.href;
			elemImg.classList.add('popup-media__image_visible');
		},

		video: function video(args) {},

		next: function next(elem) {
			if (!elem.hasAttribute('data-group')) {
				return;
			}

			var group = elem.getAttribute('data-group'),
			    index = [].slice.call(document.querySelectorAll('[data-group="' + group + '"]')).indexOf(elem);
		},

		init: function init(elementStr) {
			var _this2 = this;

			document.addEventListener('click', function (e) {
				var element = e.target.closest(elementStr);

				if (!element) {
					return;
				}

				e.preventDefault();

				var type = element.getAttribute('data-type'),
				    args = {
					href: element.href,
					caption: element.getAttribute('data-caption'),
					group: element.getAttribute('data-group'),
					popupStr: element.getAttribute('data-popup')
				};

				if (type == 'image') {
					_this2.image(args);
				} else if (type == 'video') {
					_this2.video(args);
				}

				_this2.next(element);
			});
		}
	};
})();

/*var pPopup = {
	closeCallback: function() {},
	play: null,
	ind: 0,
	group: null,
	position: 0,

	show: function(id, fun) {
		var _ = this,
		$popWin = $(id),
		$popup = $popWin.closest('.popup');
		
		if ($popWin.length && $popWin.hasClass('popup__window')) {

			_.position = $(window).scrollTop();
			$popup.fadeIn(321).scrollTop(0);
			$('.popup__window').removeClass('popup__window_visible');
			$popWin.addClass('popup__window_visible');
			$('body').css('top', -_.position).addClass('is-popup-opened');

			setTimeout(function() {
				CoverImg.reInit('#media-popup');
			}, 721);

		}

		_.closeCallback = fun || function() {};
	},

	hide: function() {
		var _ = this;
		$('.popup__window').removeClass('popup__window_visible');
		$('.popup').fadeOut(321);
		$('.popup__message').remove();
		$('body').removeClass('is-popup-opened').removeAttr('style');
		$('html, body').scrollTop(_.position);
		_.closeCallback();
	},

	message: function(id,msg,fun) {
		var _ = this;
		$(id).find('.popup__inner').prepend('<div class="popup__message">'+ msg +'</div>');
		_.show(id);
		_.closeCallback = fun || function() {};
	},

	resize: function($pop, $img) {
		var popH = $pop.innerHeight();
		if (popH > window.innerHeight) {
			$pop.css('max-width', (window.innerHeight * ($pop.innerWidth() / popH)));
		}
	},

	media: function(_$,args,show) {
		var _ = this,
		id = $(_$).attr('data-popup'),
		Pop = $(id),
		$box = Pop.find('.popup-media__box'),
		Img = Pop.find('.popup-media__image'),
		BtnPlay = Pop.find('.popup-media__play'),
		Iframe = Pop.find('.popup-media__iframe');

		if (args.data) {
			Pop.find('.popup-media__bar').css('display', 'block');
			var data = JSON.parse( args.data );
			for (var i = 0; i < data.length; i++) {
				Pop.find('.popup-media__data-'+ i).html(data[i]);
			}
		}

		if (args.imgSize) {
			var imgSize = JSON.parse(args.imgSize);
			Img.attr('width', imgSize[0]).attr('height', imgSize[1]);
		} else {
			Img.attr('width', '').attr('height', '');
		}

		if (args.img) {
			Img.css({visibility: 'visible', marginLeft: '', marginTop: ''}).removeClass('cover-img_w cover-img_h').attr('src', args.img);
		}
		
		//Pop.css('max-width', '');
		Iframe.css('visibility', 'hidden').attr('src', '');
		BtnPlay.css('visibility', 'hidden');
		
		if (args.vid) {
			$box.removeClass('middle').addClass('cover-img-wrap');
			Img.removeClass('middle__img').addClass('cover-img');
			BtnPlay.css('visibility', 'visible').attr('href', args.vid);

			_.play = function() {
				var utm = args.vid.match(/(?:youtu\.be\/|youtube\.com\/watch\?v\=|youtube\.com\/embed\/)+?([\w-]+)/i),
				ifrSrc = 'https://www.youtube.com/embed/'+ utm[1] +'?autoplay=1';
				BtnPlay.css('visibility', 'hidden');
				Img.css('visibility', 'hidden');
				Iframe.css('visibility', 'visible').attr('src', ifrSrc);
			}

			if (!args.img) {
				_.play();
			} else {
				setTimeout(function() {
					CoverImg.init(id);
					Img.attr('src', args.img);
				}, 721);
			}

			

		} else {
			$box.removeClass('cover-img-wrap').addClass('middle');
			Img.removeClass('cover-img').addClass('middle__img');
		}



		if (args.group) {
			Pop.find('.popup-media__arr').css('display', 'block');
			_.group =  $(_$).attr('data-group');
			_.ind = $('[data-group="'+ _.group +'"]').index(_$);
		}

		if (show) {
			_.show(id);
		}

		if (!args.vid) {
			setTimeout(function() {
				_.resize(Pop, Img);
			}, 721);
		}

		_.closeCallback = function() {
			Img.css('visibility', 'hidden').attr('src', '');
			Iframe.css('visibility', 'hidden').attr('src', '');
			BtnPlay.css('visibility', 'hidden');
		}

	},

	next: function(dir) {
		var _ = this,
		$next,
		ind = _.ind;

		if (dir == 'next') {
			ind++;
			if ($('[data-group="'+ _.group +'"]').eq(ind).length) {
				$next = $('[data-group="'+ _.group +'"]').eq(ind);
			}
		} else if (dir == 'prev' && ind > 0) {
			ind--;
			if ($('[data-group="'+ _.group +'"]').eq(ind).length) {
				$next = $('[data-group="'+ _.group +'"]').eq(ind);
			}
		}

		if ($next) {
			var args;

			if ($next.hasClass('js-open-popup-image')) {
				args = {
					img: $next.attr('href'),
					imgSize: $next.attr('data-image-size'),
					group: $next.attr('data-group'),
					data: $next.attr('data-data')
				};
			} else if ($next.hasClass('js-open-popup-video')) {
				args = {
					vid: $next.attr('href'),
					img: $next.attr('data-preview'),
					imgSize: $next.attr('data-preview-size'),
					group: $next.attr('data-group'),
					data: $next.attr('data-data')
				};
			}

			_.media($next, args);
			
		}

	}

};*/

/*$(document).ready(function() {
	$('body').on('click', '.js-open-popup', function () {
		Popup.show($(this).attr('data-popup'));
		return false;
	});

	$('body').on('click', '.js-open-popup-image', function () {
		var args = {
			img: $(this).attr('href'),
			imgSize: $(this).attr('data-image-size'),
			group: $(this).attr('data-group'),
			data: $(this).attr('data-data')
		};
		Popup.media(this, args, true);
		return false;
	});

	$('body').on('click', '.js-open-popup-video', function () {
		var args = {
			vid: $(this).attr('href'),
			img: $(this).attr('data-preview'),
			imgSize: $(this).attr('data-preview-size'),
			group: $(this).attr('data-group'),
			data: $(this).attr('data-data')
		};
		Popup.media(this, args, true);
		return false;
	});

	$('body').on('click', '.popup-media__play', function () {
		Popup.play();
		return false;
	});

	$('body').on('click', '.popup-media__arr', function () {
		Popup.next($(this).attr('data-dir'));
		return false;
	});

	$('body').on('click', '.js-open-msg-popup', function () {
		Popup.message('#message-popup', 'Это всплывашка с сообщением.<br> вызов: <span class="c-red">Popup.message("#id", "Текст или html");</span>', function() { alert('После закрытия'); });
		return false;
	});

	$('body').on('click', '.popup__close', function () {
		Popup.hide();
		return false;
	});

	$('body').on('click', '.popup', function(e) {
		if (!$(e.target).closest('.popup__window').length) {
			Popup.hide();
		}
	});


	if (window.location.hash) {
		var hash = window.location.hash;
		if($(hash).length && $(hash).hasClass('popup__window')){
			Popup.show(hash);
		}
	}

});*/
/*
Anchor.init(Str anchor selector[, Int duration ms[, Int shift px]]);
*/

var Anchor;

(function () {
	"use strict";

	Anchor = {
		duration: 1000,
		shift: 0,

		scroll: function scroll(anchorId, e) {
			var anchorSectionElem = document.getElementById(anchorId + '-anchor');

			if (!anchorSectionElem) {
				return;
			}

			if (e) {
				e.preventDefault();
			}

			var scrollTo = anchorSectionElem.getBoundingClientRect().top + window.pageYOffset,
			    scrollTo = scrollTo - this.shift;

			animate(function (progress) {
				window.scrollTo(0, scrollTo * progress + (1 - progress) * window.pageYOffset);
			}, this.duration, 'easeInOutQuad');
		},

		init: function init(elementStr, duration, shift) {
			var _this = this;

			if (duration) {
				this.duration = duration;
			}

			if (shift) {
				this.shift = shift;
			}

			//click anchor
			document.addEventListener('click', function (e) {
				var elem = e.target.closest(elementStr);

				if (elem) {
					_this.scroll(elem.getAttribute('href').split('#')[1], e);
				}
			});

			//hash anchor
			if (window.location.hash) {
				window.addEventListener('load', function () {
					_this.scroll(window.location.hash.split('#')[1]);
				});
			}
		}
	};
})();
/*
new Alert({
	content: 'We use coockie',
	position: 'top', // default - bottom
	showOnce: true // default - false
});
*/

;var Alert;

(function () {
	'use strict';

	var alertIndex = 0;

	Alert = function Alert(opt) {
		opt = opt || {};

		var alertId = 'alert-id-' + alertIndex++;

		if (opt.showOnce) {
			var hiddenAlert = window.localStorage.getItem('notShowAlert=' + alertId);

			if (hiddenAlert !== null && hiddenAlert === 'true') {
				return false;
			}
		}

		//add alert to DOM
		var alertElem = document.createElement('div');

		alertElem.className = 'alert';

		alertElem.id = alertId;

		alertElem.innerHTML = '<div></div><button class="alert-close-btn"></button>';

		document.body.appendChild(alertElem);

		if (opt.position == 'top') {
			alertElem.classList.add('alert_top');
		}

		// set content
		this.setContent = function (content) {
			alertElem.querySelector('div').innerHTML = content;
		};

		if (opt.content) {
			this.setContent(opt.content);
		}

		// hide permanently
		function hidePermanently() {
			window.localStorage.setItem('notShowAlert=' + alertId, 'true');
		}

		// hide
		function hide() {
			alertElem.classList.add('alert_hidden');

			if (opt.showOnce) {
				hidePermanently();
			}
		}

		alertElem.querySelector('.alert-close-btn').addEventListener('click', hide);
	};
})();
;var GetContentAjax;

(function () {
	"use strict";

	GetContentAjax = function GetContentAjax(options) {
		var _this = this;

		if (!document.querySelector(options.eventBtn)) {
			return;
		}

		this.output = null;

		var getContent = function getContent(eventBtnElem) {
			var outputDivElem = document.querySelector(options.outputDiv);

			ajax({
				url: options.sourceFile,
				send: eventBtnElem.getAttribute('data-send'),
				success: function success(response) {
					if (_this.output === null) {
						outputDivElem.innerHTML = response;
					} else {
						outputDivElem.innerHTML = _this.output(response);
					}
				},
				error: function error(response) {
					console.log(response);
				}
			});
		};

		if (options.event == 'click') {
			document.addEventListener('click', function (e) {
				var eventBtnElem = e.target.closest(options.eventBtn);

				if (eventBtnElem) {
					e.preventDefault();

					getContent(eventBtnElem);
				}
			});
		}
	};
})();

/*var Ajax = {
	take: function(url,data,id,fun) {
		var _ = this;

		$.ajax({
			url: url,
			type:"POST",
			dataType:"html",
			data: data,
			success: function(response){
				if (response) {
					_.put(response, id);
					setTimeout(fun, 721);
				}
			},
			error: function() {
				alert('Send Error');
			}
		});
	},
	put: function(resp,id) {
		var Block = $(id);
		if (Block.hasClass('popup__window')) {
			Block.find('.popup__inner').html(resp);
			Popup.show(id);
		} else {
			Block.append(resp);
			coverImg();
		}
	}

};

$(document).ready(function() {

	$('body').on('click', '.js-ajax', function () {
		var _$ = $(this);

		if (!_$.hasClass('lock')) {
			_$.addClass('lock');

			var id = _$.attr('href') || '#'+ _$.attr('data-id'),
			url = _$.attr('data-url'),
			data = _$.attr('data-data');

			if (_$.attr('data-page')) {
				var page = +_$.attr('data-page');

				data += '&page='+ page;

				Ajax.take(url, data, id, function() {
					page++;
					_$.attr('data-page', page).removeClass('lock');
				});

			} else {
				Ajax.take(url, data, id, function() {
					_$.removeClass('lock');
				});
			}
		}

		return false;
	});

	if ($('.js-ajax-scroll').length && $(window).width() > 1000) {
		var i = 0;

		$(window).scroll(function() {
			var winScrTop = $(window).scrollTop(),
			Point = $('.js-ajax-scroll');

			if (Point.offset().top < window.innerHeight && !Point.hasClass('lock')) {
				Point.addClass('lock');

				var id = '#'+ Point.attr('data-id'),
				url = Point.attr('data-url'),
				data = Point.attr('data-data'),
				page = +Point.attr('data-page');

				data += '&page='+ page;

				Ajax.take(url, data, id, function() {
					page++;
					Point.attr('data-page', page).removeClass('lock');
				});

			}

		});

	}

	

});*/
//# sourceMappingURL=script.js.map
