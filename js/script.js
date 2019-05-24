$(window).on("load", function() {
    $(".loader .inner").fadeOut(500, function() {
        $(".loader").fadeOut(750)
    });
});

$(document).ready(function() {
    $(this).scrollTop(0);
    $('#slides').superslides({
        animation: 'fade',
        play: 5000
    });

    var typed = new Typed(".typed", {
        strings: ["Engineering Student,", "Web Developer,", "Scroll Down,", "Stay Connected."],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false,
    });
    console.log(typed)
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

    $("#navigation a").click(function(e) {
        e.preventDefault();

        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        $("html, body").animate({ scrollTop: targetPosition - 50 }, "slow")

    });

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