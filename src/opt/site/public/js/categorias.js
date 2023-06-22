let $resultado_list = $("#resultado-list"),
    search_str = "",
    result_search_str = "",
    priceRange,
    rangeValues = []
;

function page_init() {

    resize()
    renderLoading($resultado_list)
    $("#categorias-filter, #marcas-filter, #laboratorio-filter, #precio-filter").html(`<div class="tx-c"><img src="${ABS_URL}/assets/loader.gif" style="width: 25px; opacity: 0.3;" /></div>`)
    
    if(sub != undefined && sub != "") search_cats(sub)

}

async function search_cats(sub) {

    res = await API.POST.getCategorias(store.location, sub)

    let result = res.error ? 0 : res.data.length,
        p = {},
        currentCat = store.categorias[sub.substring(0, sub.length - (sub.length > 5 ? 2 : 0))],
        currentSub = currentCat.subs[sub]
        
        if(!currentSub) currentSub = currentCat

        console.log(currentCat, currentSub)
    ;

    // productos
    if(result > 0) {

        p = await showProducts($resultado_list, HomologarProductos(res.data), {collection: 'cats', filter: true, rows: "auto", cols: 100, headerExact: currentSub.title, section: 0})

        if(p.noProducts) NoResults(currentSub.title)

        else {

            // popups
            if(store.popups) showPagePopup(store.popups.search.filter(item => (item.data.popup_keywords.split(" ").includes(search_str))))

            renderFiltros(p)
        }

        $("#sort-div").html(orderStr)
        $resultado_list.prepend(/*html*/`
        <div id="crumbs">
            <div><a href="/" title="Inicio"><i class="fas fa-home" style="font-size: 1.1em;"></i></a></div>
            <div class="separator"><i class="fas fa-chevron-right"></i></div>
            <div><a href="${ABS_URL}/categorias/${currentCat.id}" title="${currentCat.title}">${currentCat.title}</a></div>
            <div class="separator"><i class="fas fa-chevron-right"></i></div>
            <div><a href="${ABS_URL}/categorias/${currentSub.id}" title="${currentSub.title}">${currentSub.title}</a></div>
        </div> `)

    } else if(result == 0) {
        NoResults(currentSub.title)
    }


}

function renderCategoriasLocal($target, cats, subs) {

    let s = "", s2, categoria
    forEach(sortObject(cats), item => {
        
        categoria = store.categorias[item.id]
        
        s2 = ""
        forEach(subs, (item2, key) => {
            let subcat = categoria.subs[key]
            if(subcat) s2 += `<div data-value="${key}" data-filter="subcategorias"><i class="far fa-square"></i><i class="fas fa-check-square"></i> &nbsp;${subcat.title}<b>${item2.count}</b></div>`
        })
        
        s += /*html*/`
<a data-id="${item.id}" class="title">&#9656; ${categoria.title}<span>${item.count}</span></a>
<div class="content">
    <div class="left-menu">${s2}</div>
</div>`})

    $target.html(s)

    initAccordeon($target, true)

}

function NoResults(search_str) {
    $resultado_list.html(`<div id="no-resultado" class="no-products-result">¡No hay resultados para <b>${search_str}</b>!<br><small>Intenta con otro término de búsqueda.</small></div>`)
    $("#no-resultado").show(100)
}

function renderMarcas($target, marcas) {
    let s = ""
    forEach(sortObject(marcas), item => {
        s += `<div data-value="${item.id}" data-filter="marcas"><i class="far fa-square"></i><i class="fas fa-check-square"></i> &nbsp;${item.id}<b>${item.count}</b></div>`
    })
    $target.html(`<div class="left-menu">${s}</div>`)
}

function renderProveedores($target, proveedores) {
    let s = ""
    forEach(sortObject(proveedores), item => {
        s += `<div data-value="${item.id}" data-filter="proveedores"><i class="far fa-square"></i><i class="fas fa-check-square"></i> &nbsp;${item.id.toLowerCase()}<b>${item.count}</b></div>`
    })
    $target.html(`<div class="left-menu">${s}</div>`)
}

function renderPrecios($target, precios) {

    rangeValues = [precios.minPrice, precios.maxPrice]
    if(precios.maxPrice == precios.minPrice) precios.maxPrice++

    $target.html(/*html*/`
<div class="row mini-price">
    <span>Min. ${f(precios.minPrice)}</span>
    <span>Max. ${f(precios.maxPrice)}</span>
</div>
<div id="range" style="margin-top:10px"></div>`)

    priceRange = noUiSlider.create($target.find("#range")[0], {
        start: [precios.minPrice, precios.maxPrice],
        connect: true,
        range: {'min': precios.minPrice, 'max': precios.maxPrice},
        format: wNumb({decimals: 0}),
        margin: precios.minPrice,
    });

    priceRange.on('update', function (values) {
        $(".mini-price").html(`<span>Min. ${f(values[0])}</span><span>Max. ${f(values[1])}</span>`)
    });

    priceRange.on('change', function (values) {
        filterProduct([parseInt(values[0]), parseInt(values[1])], null, "precio")
        $(".mini-price").html(`<span>Min. ${f(values[0])}</span><span>Max. ${f(values[1])}</span>`)
    });
    
}

function renderFiltros(p) {
    
    //renderCategoriasLocal($("#categorias-filter"), p.cats, p.subs)
    //renderMarcas($("#marcas-filter"), p.marcas)
    //renderProveedores($("#laboratorio-filter"), p.proveedores)
    renderPrecios($("#precio-filter"), p)

    $(".left-menu").off("click").on("click", "> div", function(e) {
        let $this = $(e.currentTarget)
        filterProduct($this.data("value"), $this[0], $this.data("filter"))
    })

}

function filterClick(value, key) {
    let item;
    
    $(`[data-value="${value}"]`).each(function(){
        if($(this).data("filter") == key) item = this
    })
    filterProduct(value, item, key)
}

async function filterProduct(value, elem, type) {
    $(elem).toggleClass("active")
    await showProducts($resultado_list, 'currentCollection', {filter: true, type, value, append: false, headerFilter: true })
}

function resetPrice() {
    priceRange.reset()
    filterProduct([rangeValues[0], rangeValues[1]], null, "precio")
    $(".mini-price").html(`<span>Min. ${f(rangeValues[0])}</span><span>Max. ${f(rangeValues[1])}</span>`)
}