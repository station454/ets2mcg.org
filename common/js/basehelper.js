function loadSlideshowSlides() {
    return new Promise((resolve) => {
        var slideshowHome = "https://common.ets2mcg.org/img/slides/";
        var slideshowList = "show.json";
        var slideshowElem = "#slideshow";

        var element = $(slideshowElem);
        $.getJSON(slideshowHome + slideshowList, (data) => {
            data.forEach(o => {
                $("<img />").addClass("imgSlide").css("display", "none").attr("src", slideshowHome + o).appendTo(element);
            });
            resolve();
        });
    })
}