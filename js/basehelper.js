function initializeScrollWorker(selector) {
    let animating = false;
    let scrolledUp = false;
    $(selector).each((_, value) => {
        $(value).css("opacity", "0")
    })
    function calcScroll(ignoreCurrentWork) {
        if (ignoreCurrentWork === undefined) ignoreCurrentWork = false;
        if (animating && !ignoreCurrentWork) return;
        animating = true;
        let result = false;

        let temp = $(selector);
        if (scrolledUp) temp = $(temp.get().reverse())

        temp.each((_, value) => {
            var bounding = value.getBoundingClientRect();
            let displayed = bounding.top < window.innerHeight && bounding.bottom > 0;
            let val = $(value);

            if (displayed && !val.hasClass("fadeAnimation")) {
                val.addClass("fadeAnimation")
                val.css("opacity", "");
                setTimeout(() => calcScroll(true), 30);
                result = true;
                return false;
            } else if (!displayed) {
                val.removeClass("fadeAnimation").css("opacity", "0")
            }
        })
        animating = result;
    }
    setTimeout(() => {
        let curTop = 0;
        $(window).scroll(() => {
            let top = $(this).scrollTop();
            if (top > curTop) {
                scrolledUp = false;
            } else {
                scrolledUp = true;
            }
            curTop = top;
            if (!animating) {
                calcScroll();
            }
        })
        calcScroll();
    }, 100)
}

function loadSlideshowSlides() {
    var slideshowHome = "https://common.ets2mcg.org/img/slides/";
    var slideshowList = "show.json";
    var slideshowElem = "#slideshow";

    var element = $(slideshowElem);
    $.ajax(slideshowHome + slideshowList, {
        method: "GET",
        async: false,
        success: (data) => {
            data.forEach(o => {
                $("<img />").addClass("imgSlide").css("display", "none").attr("src", slideshowHome + o).appendTo(element);
            });
        }
    })
}