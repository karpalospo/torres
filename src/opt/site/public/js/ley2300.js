
let $img = $("#banner-img").find("img");


$(window).resize(e => {
    console.log("aja", $(window).width())
    if($(window).width() < 800) {
        $img.attr("src", "assets/bannermobile.jpg")
    } else {
        $img.attr("src", "assets/banner.jpg")
    }
})
$(window).trigger("resize");
