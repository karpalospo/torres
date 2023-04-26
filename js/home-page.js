store.page = "home"

 async function page_init() {
    

    // banners
    /* renderBanners($("#banner"), store.banners.superior)
    renderBanners($("#banner_inferior"), store.banners.inferior)
    renderBanners($("#destacados"), store.banners.destacados, {itemsPerRows: "auto", pagination: false, navigation: false}) */

    // popups
    //if(store.popups) showPagePopup(store.popups.home)
    //showModal(true, $("#popupiro"), false, "fade")

    let res = await API.POST.getOfertas(store.location, {convenio: store.user.convenio})

    if(!res.error) {
        store.collections["[sales]"] = HomologarProductos(res.data)
    }

    renderLoading($("#resultado-list"))
    showProducts($("#resultado-list"), HomologarProductos(res.data), "[sales]", {cache:true, rows: "auto", cols: 2, shuffle:true, sort: {field:"descuento", mode:"desc"}})

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


