
$currentPage = "home"

async function page_init() {


    // let countDownDate = new Date("Sep 4, 2023 14:00:00").getTime();
    // function countdown() {
    //     let now = new Date().getTime(),
    //         distance = now < countDownDate ? countDownDate - now : 0,
    //         d = Math.floor(distance / 86400000),
    //         h = Math.floor(distance % 86400000 / 3600000),
    //         m = Math.floor(distance % 3600000 / 60000),
    //         s = Math.floor(distance % 60000 / 1000)
    //     ;
    //     document.getElementById("timer").innerHTML =
    //     "<div>" + (h < 10 ? "" : "") + h + "<span>horas</span></div>" +
    //     "<div>" + (m < 10 ? "" : "") + m + "<span>minutos</span></div>" +
    //     "<div>" + (s < 10 ? "" : "") + s + "<span>segundos</span></div>";
    // }
    // const x = setInterval(countdown, 1000);
    // countdown();

    //showModal(true, "popup-aniv")

    
    let productList = [];
    
    // banners
    renderBanners($("#banner"), store.banners.superior, {device})

    // popups
    if(store.popups) showPagePopup(store.popups.home)

    renderLoading($("#resultado-list"))

    res = await API.getOfertas(store.location, {convenio: store.user.convenio})
    
    if(!res.error) {
        productList = HomologarProductos(res.data)
        showProducts($("#resultado-list"), productList, {collection:'sales', rows: "auto", cols: 2, shuffle:true, sort: {field:"descuento", mode:"desc"}})

        showProductsHorizontal($("#recomendados"), productList, {shuffle:true, prevEl: _$("#recom-prev"), nextEl: _$("#recom-next")})
        showProductsHorizontal($("#prod-estrella"), productList, {shuffle:true, prevEl: _$("#estre-prev"), nextEl: _$("#estre-next")})
    }

}


