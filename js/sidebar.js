$(function () {

	function toggle_sidebar() {

		var viewport_width = $(window).width();

		if (viewport_width < 769) {
			$('.btn-memu').unbind('click').click(function () {
				$('.sidebar').toggleClass('sidebar-open');
				$('.main').toggleClass('main-open');
				$('.header').toggleClass('header-open');
			});
		} // end if

		if (viewport_width >= 769) {
			$('.sidebar').removeClass('sidebar-open');
			$('.main').removeClass('main-open');
			$('.header').removeClass('header-open');
		} // end if
	} // end function

	toggle_sidebar();

	$(window).resize(function () {
		toggle_sidebar();
	});

});
