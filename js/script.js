$(window).on("load", function() {
    $(".loader .inner").fadeOut(500, function() {
        $(".loader").fadeOut(750)
    });
});

$(document).ready(function() {
    // add a blur animation for about and stats section loading
    var statsSection = $('div.sqaureIcon'),
        statsSectionOffset = (statsSection.offset().top + 300) / 2;
    var aboutElement = $('div.about-me'),
        aboutElementoffset = aboutElement.offset().top / 2,
        documentElement = $(document);
    documentElement.on('scroll', function() {
        if (documentElement.scrollTop() > aboutElementoffset + 500 && aboutElement.hasClass('hidden')) aboutElement.removeClass('hidden');
        else if (documentElement.scrollTop() > statsSectionOffset && statsSection.hasClass('hidden'))
            statsSection.removeClass('hidden');
    });
    //scroll to top when page refreshes
    $(this).scrollTop(0);
    //calling the scroll function for the navbar highlight effect
    $(document).on("scroll", onScroll);
    //super slides
    $('#slides').superslides({
        animation: 'fade',
        play: 5000
    });
    //For Typed Effect
    var typed = new Typed(".typed", {
        strings: ["Engineering Student,", "Web Developer,", "Scroll Down,", "Stay Connected."],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false,
    });
    console.log(typed)
        // Owl-carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 4,
        autoplay: true,
        startDelay: 3000,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            938: {
                items: 4
            }
        }
    });
    //to scroll to a particular ID smoothly
    $("#navigation a").click(function(e) {
        e.preventDefault();

        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        $("html, body").animate({ scrollTop: targetPosition - 75 }, "slow");

    });
    //to start the pie chart animation.
    var skillsTopOffset = $(".skillsSection").offset().top;

    $(window).scroll(function() {
        if (window.pageYOffset > skillsTopOffset - $(window).height() + 300) {
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#fff',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function(_from, _to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }
    });

    $("[data-fancybox]").fancybox();

});
// make the nav link active on scroll
function onScroll(event) {
    event.preventDefault();
    var scrollPos = $(document).scrollTop();
    $('nav#navigation a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top - 100 <= scrollPos && refElement.position().top + refElement.height() + 100 > scrollPos) {
            $('nav#navigation a').removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}