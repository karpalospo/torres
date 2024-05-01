
$currentPage = "home"

async function page_init() {

    // let video = document.querySelector("#videoplay");
    // console.log(device)
    // if(device == "PHONE") video = document.querySelector("#videoplay2"); 
    // if(video) {
    //     showSuperModal(true, device == "PHONE" ? "videoplay2" : "videoplay", () => {video.play()})        
    //     video.addEventListener("ended", (event) => {showSuperModal(false, device == "PHONE" ? "videoplay2" : "videoplay")});
    // }
    
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


