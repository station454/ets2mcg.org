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