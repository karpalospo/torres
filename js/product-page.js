async function page_init() {

    search_product(getParameterByName("c"))

    await search_products2("carrusel", "[code]058167 058092 058057 058003 058091 058004 086038 086456 086521 086522", $("#prod-estrella").find(".swiper-wrapper"), {hcarrusel: true, shuffle:true, sort: {field:"descuento", mode:"desc"}})
    
    new Swiper($("#prod-estrella")[0], 
    {
        direction: 'horizontal',
        slidesPerView: productBounces.rowCount,
        slidesPerGroup: productBounces.rowCount,
        loop: true,
        autoplay: {delay: 6000},
        preloadImages: false,
        lazy: true,
        navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}
    })

    let $window = $(window)

    var $scrollingDiv = $("#porta-foto");
    let currentTopGlobal = parseInt($scrollingDiv.offset().top)
    let ceilTop = currentTopGlobal
    let currentH = $scrollingDiv.height()
    let compareH = $scrollingDiv.parent().height()

    $scrollingDiv.width($scrollingDiv.parent().width())

    $window.scroll(function(){     

        if ($window.scrollTop() + ceilTop > currentTopGlobal) {
            if($window.scrollTop() + currentH < compareH) {
                $scrollingDiv.css({position: 'fixed', top:`${ceilTop}px`, bottom: ''})
            } else {
                $scrollingDiv.css({position: 'absolute', top:'', bottom: 0})
            }
        } else $scrollingDiv.css({position: '', top:'', bottom: ''})
    });
}

async function search_products2(collection, str, $target, options) {
    res = await pLog("search", str)
    if(!res.error) showProducts($target, res.data.products, collection, options)
}

async function search_product(id) {
    

    res = await getProductsFullInfo([{id}])

    currentProductDetail = res[res.stock.length > 0 ? "stock" : "soldout"][0]
    cargarFoto(currentProductDetail)
    $("#basic-info").html(renderProductItem(currentProductDetail, currentProductDetail.stock ? "detail" : "no-detail")) 
    $("#add-info").html(renderExtrainfo(currentProductDetail))
    

    calculateCart()

    if(!currentProductDetail.sub) return

    res = await pLog("search", "[cats]" + currentProductDetail.cat + "/" + currentProductDetail.sub)
    if(!res.error) {
        showProducts($('#relacionados-list'), res.data.products, "relacionados", {itemsPerRows: "auto", rows: 2, horizontal:true, shuffle: true})
        $("#relacionados-cont").show(0)
    }
    
}


function productDetailClick(elem) {
    
    let id = currentProductDetail.id, $elem = $(elem);

    if($elem.hasClass("add")) return pLog("cart", {id, product: currentProductDetail, value: 1});
    if($elem.hasClass("cantidad")) return
    if($elem.hasClass("fa-plus")) return pLog("cart", {id, sum: 1});
    if($elem.hasClass("fa-minus") || $elem.hasClass("fa-trash-alt")) return pLog("cart", {id, sum: -1});


}

async function cargarFoto(product) {

    $("#preview").attr("src", "")

    let $wrapper = $("#thumbnails").find(".wrapper"),
        breakloop = false
    ;

    $wrapper.hide(0).html(`<img src="https://www.droguerialaeconomia.com/economia/site/img/1x/${product.id}.jpg" alt="" class="thumbnail" />`)
    $(".prev, .next").hide(0)
    
    initGallery()


    for(i = 1; i <= 10; i++) {
        if(breakloop) continue
        try {
            res = await CheckImage(`https://www.droguerialaeconomia.com/economia/site/img/galeria/${product.id}-${i}.jpg`)
            if(res[0] > 0) $wrapper.addImage(res[1], `${product.id}-${i}`);
        } catch(e) {
            breakloop = true
        }
    }

    if($wrapper.find(".thumbnail").length > 1) {
        $wrapper.show(0)
        $(".prev, .next").hide(0)
    }
    
}

function initGallery() {

    // load images
    $.fn.addImage = function (url, link, description) {
        var img = document.createElement('img');
        img.src = url;
        img.dataset.link = link;
        img.alt = description;
        img.className = "thumbnail";
        $(this).append(img);
    }

    // check if element is hidden after scrollbar
    $.fn.overflown = function () {
        var limitLeft = $('.wrapper').offset().left;
        var limitRight = limitLeft + $('.wrapper').width();
        var elemOffsetLeft = $(this[0]).offset().left;
        var elemOffsetRight = elemOffsetLeft + $(this[0]).width() / 2;
        return (elemOffsetRight > limitRight || elemOffsetLeft < limitLeft) ? true : false;
    }

    // scroll to the end of element
    function scrollToElement(el, direction) {
        element_width = el.width();
        scroll_left = $('.wrapper')[0].scrollLeft;
        if (direction == 'next')
            $('.wrapper')[0].scrollTo(scroll_left + element_width, 0);
        else if (direction == 'prev')
            $('.wrapper')[0].scrollTo(scroll_left - element_width, 0);
    }

    function showNextImg() {
        //clearInterval(interv);
        //interv = setInterval(showNextImg, 10000);
        var el = $('.selected');
        var counter = $('.counter');
        if (el.next().length != 0) {
            counter.text(el.index() + 1);
            if (el.next().overflown())
                scrollToElement(el, 'next');
            el.fadeOut(200, () => {
                el.next().trigger('click');
                el.show();
            });
        }
        else {
            $('.thumbnail:first').trigger('click');
            $('.wrapper')[0].scrollTo(0, 0);
            counter.text('1');
        }
        $('.toggleDiapo').attr('src', 'icons/pause_diapo.png');
    }

    function showPrevImg() {
        //clearInterval(interv);
        //interv = setInterval(showNextImg, 10000);
        var el = $('.selected');
        var counter = $('.counter');
        if (el.prev().length != 0) {
            counter.text(el.index() + 1);
            if (el.prev().overflown())
                scrollToElement(el, 'prev');
            el.prev().trigger('click');
        }
        else {
            $('.thumbnail:last').trigger('click');
            $('.wrapper')[0].scrollTo($('.wrapper')[0].scrollWidth, 0);
            counter.text($('.thumbnail:last').index() + 1);
        }
        $('.toggleDiapo').attr('src', 'icons/pause_diapo.png');
    }

    function previewImg(e) {
        if (e.originalEvent !== undefined) {
            $('.toggleDiapo').attr('src', 'icons/play_diapo.png');
        }
        var index = $(this).index();
        $('.selected').toggleClass('selected');
        $(this).toggleClass('selected')
        $("#caption").text($('.selected').attr('alt'));
        $('.counter').text(index + 1);
        var src = $(this).attr('src');
        $('#preview').fadeOut('fast', () => {
            $('#preview').attr('src', src);
            $('#preview').fadeIn('fast');
        });
    }

    // show first image
    var first = $('.thumbnail:first').toggleClass('selected');
    $('.counter').text('1');
    $('#preview').attr('src', first.attr('src'));
    $("#caption").text(first.attr('alt'));


    // setup event listeners
    $('.next').on('click', showNextImg);
    $('.prev').on('click', showPrevImg);
    $("#thumbnails").on('click', ".thumbnail", previewImg);

}

function setZoom(zoom, el) {
    
    transformOrigin = [0,0];
    el = el || instance.getContainer();
    var p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;
    }

    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;
    
}

async function CheckImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve([img.width, img.src])
        img.onerror = reject
        img.src = url
    })
}

$("#slide").on("mouseenter", function(e) {
    setZoom(2, $("#slide")[0])
    $("#slide").css("cursor", "crosshair")
})

$("#slide").on("mousemove", function(e) {

    const { left, top, width, height } = $("#slide")[0].getBoundingClientRect()
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    $("#preview").css("transform", `translate(${-x}%, ${-y}%)`)
})

$("#slide").on("mouseleave", function(e) {
    setZoom(1, $("#slide")[0])
    $("#slide").css("cursor", "default")
    $("#preview").css("transform", `translate(0%, 0%)`)
})