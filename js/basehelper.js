function initializeScrollWorker(selector) {
    let scrollWorking = false;
    let scrollUp = false;
    $(selector).each((i, value) => {
        $(value).css("opacity", "0")
    })
    function calcScroll(force) {
        if (force === undefined) force = false;
        if (scrollWorking && !force) return;
        scrollWorking = true;
        let result = false;
        let tmp = $(selector);
        console.log(scrollUp);
        if (scrollUp) tmp = $(tmp.get().reverse())
        tmp.each((i, value) => {
            var bounding = value.getBoundingClientRect();
            let displayed = bounding.top < window.innerHeight && bounding.bottom > 0;

            if (displayed && !$(value).hasClass("fadeAnimation")) {
                $(value).addClass("fadeAnimation")
                $(value).css("opacity", "");
                setTimeout(() => calcScroll(true), 30);
                result = true;
                return false;
            } else if (!displayed) {
                $(value).removeClass("fadeAnimation").css("opacity", "0")
            }
        })
        scrollWorking = result;
    }
    setTimeout(() => {
        let curTop = 0;
        $(window).scroll(() => {
            let top = $(this).scrollTop();
            if (top > curTop) {
                scrollUp = false;
            } else {
                scrollUp = true;
            }
            curTop = top;
            if (!scrollWorking) {
                calcScroll();
            }
        })
        calcScroll();
    }, 100)
}