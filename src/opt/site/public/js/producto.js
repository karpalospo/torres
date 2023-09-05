async function page_init() {

    await search_product(id)

}

async function search_product(id) {
    
    res = await API.getFromCodes([id], store.location, {convenio: store.user.convenio})

    currentProductDetail = HomologarProductos([res.data[0]])[0]
    cargarFoto(currentProductDetail)
    $("#basic-info").html(renderProductItem(currentProductDetail, currentProductDetail.stock ? "detail" : "no-detail")) 
    $("#add-info").html(renderExtrainfo(currentProductDetail))

    // render crumb
    let cat = store.categorias[currentProductDetail.cat],
        sub = store.categorias[currentProductDetail.cat].subs[currentProductDetail.sub]
    ;

    $("#crumbs").html(/*html*/`
<div><a href="${ABS_URL}" title="Inicio" >Inicio</a></div>
<div class="separator"><i class="fas fa-chevron-right"></i></div>
<div><a href="${ABS_URL}/categorias/${cat.id}" title="${cat.title}" >${cat.title}</a></div>
<div class="separator"><i class="fas fa-chevron-right"></i></div>
<div><a href="${ABS_URL}/categorias/${sub.id}" title="${sub.title}" >${sub.title}</a></div>
`)

    calculateCart()

    if(!currentProductDetail.sub) return

    res = await API.getSubcategorias(store.location, store.categorias[currentProductDetail.cat].subs[currentProductDetail.sub].id)
    p = await showProducts($("#prod-relacionados"), HomologarProductos(res.data), {collection: 'relacionados', rows: "auto", cols: 100, limit:30, section: 0})
   
}


function productDetailClick(elem) {
    
    let id = currentProductDetail.id, $elem = $(elem);

    if($elem.hasClass("add")) return pLog("cart", {id, product: currentProductDetail, value: 1});
    if($elem.hasClass("cantidad")) return
    if($elem.hasClass("fa-plus")) return pLog("cart", {id, sum: 1});
    if($elem.hasClass("fa-minus") || $elem.hasClass("fa-trash-alt")) return pLog("cart", {id, sum: -1});


}

async function cargarFoto(product) {
console.log(product)
    $("#preview").attr("src", "")

    let $wrapper = $("#thumbnails").find(".wrapper"),
        breakloop = false
    ;

    $wrapper.hide(0).html(`<img src="https://www.droguerialaeconomia.com/economia/site/img/1x/${product.id}.jpg" alt="" class="thumbnail" />`)
    $(".prev, .next").hide(0)
    
    initGallery()


    // for(i = 1; i <= 10; i++) {
    //     if(breakloop) continue
    //     try {
    //         res = await CheckImage(`https://www.droguerialaeconomia.com/economia/site/img/galeria/${product.id}-${i}.jpg`)
    //         if(res[0] > 0) $wrapper.addImage(res[1], `${product.id}-${i}`);
    //     } catch(e) {
    //         breakloop = true
    //     }
    // }

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