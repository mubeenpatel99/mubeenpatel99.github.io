AOS.init({
    duration: 800,
    easing: 'slide',
    once: true
});

$(document).ready(function() {
    var scrollLink = $('.scroll');

    // smooth scrolling
    scrollLink.click(function(event) {
        event.preventDefault();
        var offset = $(this.hash).offset().top - 60;
        $('body, html').animate({
            scrollTop: offset
        }, 1000);
    });

    //active link switch
    $(window).scroll(function() {
        var scrollBarLocation = $(this).scrollTop();

        scrollLink.each(function() {
            var sectionOffset = $(this.hash).offset().top - 60;

            if (sectionOffset <= scrollBarLocation) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        });
    });

});