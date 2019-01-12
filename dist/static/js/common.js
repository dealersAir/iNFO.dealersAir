document.addEventListener('DOMContentLoaded', function () {
	(function initFun() {
		if (window.innerWidth < 1200) {}

		window.addEventListener('winResized', initFun);
	})();

	// init toggle button
	Toggle.init('.js-toggle');

	Toggle.onChange = function (tgl, state) {};

	// menu
	if (window.innerWidth < 1000) {
		Menu.init('.menu__item_has-children', '.menu__sub-menu');
	}

	// mobile nav
	MobNav.init({
		openBtn: '.js-open-menu',
		closeBtn: '.js-close-menu',
		headerId: 'header',
		menuLinkSelector: '.menu a'
	});

	// anchor
	Anchor.init('.js-anchor', 700, 100);

	// alert
	new Alert({
		content: 'На нашем веб-сайте используются файлы cookies, которые позволяют улучшить Ваше взаимодействие с сайтом.<br> Когда вы посещаете данный веб-сайт, Вы даете согласие на использование файлов cookies.',
		showOnce: true
	});

	// popup init
	Popup.init('.js-open-popup');
	MediaPopup.init('.js-open-media-popup');

	// get content via Ajax
	var getCont = new GetContentAjax({
		eventBtn: '.js-get-content-ajax',
		event: 'click',
		outputDiv: '#output-ajax',
		sourceFile: '/get-content-ajax.php'
	});

	getCont.output = function (response) {
		var result = response.match(/\<div id\="source"\>([\s\S]*?)\<\/div\>/);

		return result[1];
	};
});