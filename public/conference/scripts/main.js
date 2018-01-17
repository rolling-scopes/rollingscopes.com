$(window).on('scroll touchmove', function () {

  if ($('.menu-btn:checked').length === 0) {

    var coloredSections = $('section[data-color]');

    const scrollTop = $(document).scrollTop() + $(window).height()/2;

    coloredSections.each(function (sectionIndex, sec) {
      var section = $(sec);
      if (scrollTop >= section.position().top) {
        $('.page-wrap').css('background', section.attr('data-color'));
      }
    });
  }
});


$(document).ready( function () {
  $('.menu-btn').click(function () {
    $('body').toggleClass('noscroll') ;
  })

// schedule tabs
  $('.first-day-btn').click(function () {
    $('.first-day').addClass('active');
    $('.first-day-btn').addClass('active');
    $('.second-day').removeClass('active');
    $('.second-day-btn').removeClass('active');
  })

  $('.second-day-btn').click(function () {
    $('.second-day').addClass('active');
    $('.second-day-btn').addClass('active');
    $('.first-day').removeClass('active');
    $('.first-day-btn').removeClass('active');
  })

})

