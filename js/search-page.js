store.page = "search"
   

let $resultado_list = $("#resultado-list"),
    search_str = "",
    result_search_str = "",
    priceRange,
    rangeValues = []
;

function page_init() {
    resize()
    renderLoading($resultado_list)
    $("#categorias-filter, #marcas-filter, #laboratorio-filter, #precio-filter").html(`<div class="tx-center"><img src="${ABS_URL_SERVER}/assets/loader.gif" style="width: 25px; opacity: 0.3;" /></div>`)
    search_products(search_products(getParameterByName("b")))

}

function search_products(str) {

    if(str == undefined || str == "") return

    search_str = str.trim().toLowerCase()

    if(search_str.length < 2) return

    (async function () {

        noSearchCodes = ""

        res = await pLog("search", search_str)
        result_search_str = res.data.search_label

        let result = res.error ? 0 : res.data.products.length,
            banners = [],
            h = res.data.h || [],
            p = {},
            sumSection = 0
        ;

        // productos
        if(result > 0) {

            p = await showProducts($resultado_list, res.data.products, 'search', {renderFilters: true, rows: "auto", cols: 100, sort: $("#sort").val(), headerExact: result_search_str, section: sumSection})


            if(p.noProducts) {
                
                NoResults(result_search_str)

            } else {

                // banners
                if(res.data.banners) {
                    banners = res.data.banners.filter(banner => (banner.data && banner.data.banner_keywords && banner.data.banner_keywords.toLowerCase().split(" ").includes(search_str.toLowerCase())))
                    if(renderBanners($("#banner"), banners) === false) $("#banner").hide(0)
                }
        
                // popups
                if(store.popups) showPagePopup(store.popups.search.filter(item => (item.data.popup_keywords.split(" ").includes(search_str))))

                renderFiltros(p)

                return 

                // mas productos
                noSearchCodes = ""
                p.fullProducts.forEach(item => noSearchCodes += item.id + " ")

                // productos similares
                if(h && h.b) {
                    arr1 = [...h.b]
                    if(h.c) arr1 = [...arr1, ...h.c]
                    res = await pLog("search", {str: arr1.reduce((a, b) => a + " " + b), excludes: noSearchCodes, noLevenstein: true})
                    await showProducts($resultado_list, res.data.products, 'search', {append: true, header: `Productos similares a <b>${result_search_str}</b>`, renderFilters: true, rows: "auto", cols: 100, section: ++sumSection})
                }

                // productos complementarios
                if(h && h.d) {
                    res = await pLog("search", {str: h.d.reduce((a, b) => a + " " + b), excludes: noSearchCodes, noLevenstein: true})
                    await showProducts($resultado_list, res.data.products, 'search', {append: true, header: `Productos complementarios a <b>${result_search_str}</b>`, renderFilters: true, rows: "auto", cols: 100, section: ++sumSection})
                }

                
            }

        } else if(result == 0) {
            if(res.data.like.length > 0) {
                p = await showProducts($resultado_list, res.data.like, 'search', {renderFilters: true, rows: "auto", headerLike: result_search_str, cols: 100, sort: $("#sort").val()})
                if(p.noProducts) NoResults(result_search_str)
                else renderFiltros(p)
            } else NoResults(result_search_str)
        }
        
    })()

}

function NoResults(search_str) {
    $resultado_list.html(`<div id="no-resultado" class="no-products-result">¡No hay resultados para <b>${search_str}</b>!<br><small>Intenta con otro término de búsqueda.</small></div>`)
    $("#no-resultado").show(100)
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
        
        s += `
<a data-id="${item.id}" class="title">&#9656; ${categoria.title}<span>${item.count}</span></a>
<div class="content">
    <div class="left-menu">${s2}</div>
</div>`})

    $target.html(s)

    initAccordeon($target, true)

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
    $target.html(
`<div class="row mini-price"><span>Min. ${f(precios.minPrice)}</span><span>Max. ${f(precios.maxPrice)}</span></div>
<div style="height:10px"></div>
<div id="range"></div><div style="height:20px"></div>`)

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

    renderCategoriasLocal($("#categorias-filter"), p.cats, p.subs)
    renderMarcas($("#marcas-filter"), p.marcas)
    renderProveedores($("#laboratorio-filter"), p.proveedores)
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
    await showProducts($resultado_list, store.collections['search'], null, {renderFilters: true, cache:true, type, value, append: false, headerFilter: true })
}


function resetPrice() {
    priceRange.reset()
    filterProduct([rangeValues[0], rangeValues[1]], null, "precio")
    $(".mini-price").html(`<span>Min. ${f(rangeValues[0])}</span><span>Max. ${f(rangeValues[1])}</span>`)
}



