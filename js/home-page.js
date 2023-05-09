async function page_init() {
    

    // banners
    /* renderBanners($("#banner"), store.banners.superior)
    renderBanners($("#banner_inferior"), store.banners.inferior)
    renderBanners($("#destacados"), store.banners.destacados, {itemsPerRows: "auto", pagination: false, navigation: false}) */

    // popups
    //if(store.popups) showPagePopup(store.popups.home)
    //showModal(true, $("#popupiro"), false, "fade")

    renderLoading($("#resultado-list"))

    res = await API.POST.getOfertas(store.location, {convenio: store.user.convenio})

    if(!res.error) {
        showProducts($("#resultado-list"), HomologarProductos(res.data), {collection:'sales', rows: "auto", cols: 2, shuffle:true, sort: {field:"descuento", mode:"desc"}})
    }


    // new Swiper($("#recomendados")[0], 
    //     {
    //         direction: 'horizontal',
    //         slidesPerView: productBounces.rowCount,
    //         slidesPerGroup: productBounces.rowCount,
    //         loop: true,
    //         autoplay: {delay: 6000},
    //         preloadImages: false,
    //         lazy: true,
    //         navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}
    //     }
    // )

    // new Swiper($("#prod-estrella")[0], 
    // {
    //     direction: 'horizontal',
    //     slidesPerView: productBounces.rowCount,
    //     slidesPerGroup: productBounces.rowCount,
    //     loop: true,
    //     autoplay: {delay: 6000},
    //     preloadImages: false,
    //     lazy: true,
    //     navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}
    // })


    

}


