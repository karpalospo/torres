store.page = "cats"
   
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
    search_cats("[cats]" + cat + (sub ? "/" + sub : ""))

}

function search_cats(str) {

    (async function () {

        search_str = str.trim().toLowerCase()

        $("#content").scrollTo(0 ,0)

        let res = await pLog("search", search_str)

        let result = res.error ? 0 : res.data.products.length,
            products = res.data.products,
            brand = res.data.brand, 
            banners = []
            p = {}
        ;

        result_search_str = res.data.search_label

        // productos
        if(result > 0) {

            p = await showProducts($resultado_list, products, 'search', {renderFilters: true, rows: "auto", cols: 70, page:0, sort: $("#sort").val()})

            $resultado_list.prepend(
`<div class="results-cont row row-center">
    <div id="result-label"></div>
    <div class="row row-center">
        <div class="selectdiv" style="min-width: 170px;">
            <select id="sort" onchange="showProducts($resultado_list, store.collections['search'], null, {renderFilters: true, cache: true, sort:$(this).val()})">
                <option value="rel">Orden automático</option>
                <option value="men">Menor precio primero</option>
                <option value="may">Mayor precio primero</option>
                <option value="des">Mayor descuento primero</option>
            </select>
        </div>
    </div>
</div>
<div id="filter-cont"></div>
<div id="banner" style="margin-bottom:10px"></div>
<div id="no-resultado" class="no-products-result">¡No hay productos!<br><small>Intenta quitar uno o más filtros.</small></div>`)

            if(p.noProducts) NoResults(result_search_str)
            else {
                renderLeftCategorias($("#categorias-filter"), res.data.cat_id, res.data.sub_id)
                renderFiltros(p)

                // banners
                if(res.data.banners) {
                    banners = res.data.banners.filter(item => ((item.data.banner_cat && item.data.banner_cat.split(" ").includes(res.data.cat_id)) || (item.data.banner_sub && item.data.banner_sub.split(" ").includes(res.data.sub_id))))
                    if(renderBanners($("#banner"), banners) === false) $("#banner").hide(0)
                }
        
                // popups
                if(store.popups) showPagePopup(store.popups.cats.filter(item => (res.data.cat_id == item.data.popup_cat_id) || (res.data.sub_id == item.data.popup_subcat_id)))
            }
        } else if(result == 0) NoResults(result_search_str)
        
    })()

}

function NoResults(search_str) {
    $resultado_list.html(`<div id="no-resultado" class="no-products-result">¡No hay resultados para <b>${search_str}</b>!<br><small>Intenta con otro término de búsqueda.</small></div>`)
    $("#no-resultado").show(100)
    $("#filtros").hide(300)
}

function renderLeftCategorias($target, cat_id, sub_id) {

    let s = "", open = "", subopen = ""

    $target.html("")

    forEach(store.grupos, grupo => {
        
        s = open = ""

        forEach(store.categorias, cat => {
            subopen = ""
            if(cat.grupo != grupo.id) return
            if(cat_id == cat.id) {
                open = " open"
                subopen = " open"
            }
            s += `
<div class="accordion2">
<div class="title${subopen}"><i class="fas fa-caret-right"></i><i class="fas fa-caret-down"></i> &nbsp;${cat.title}</div>
<div class="content${subopen}">
    <div>`
            forEach(cat.subs, sub => s += `<div ${sub_id == sub.id ? `class="active"` : ""}><a href="${ABS_URL}/categoria/${cat.id_title}/${sub.id_title}">${sub.title}</a></div>`)
            s += `
    </div>
</div>
</div>`
        })

        $target.append(`
<div class="title${open}"><i class="fas fa-caret-right"></i><i class="fas fa-caret-down"></i> &nbsp;${grupo.title}</div>
<div class="content${open}">${s}</div>
        `)
        
    })

    initAccordeon($target, true)
    initAccordeon($target.find(".accordion2"), true)

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
    $target.html(`
<div class="row mini-price"><span>Min. ${f(precios.minPrice)}</span><span>Max. ${f(precios.maxPrice)}</span></div>
<div id="range"></div>`)

    
    priceRange = noUiSlider.create($target.find("#range")[0], {
        start: [precios.minPrice, precios.maxPrice],
        connect: true,
        range: {
            'min': precios.minPrice,
            'max': precios.maxPrice
        },
        format: wNumb({
            decimals: 0
        }),
        margin: precios.minPrice,
    });

    priceRange.on('slide', function (values) {
        $(".mini-price").html(`<span>Min. ${f(values[0])}</span><span>Max. ${f(values[1])}</span>`)
    });

    priceRange.on('change.one', function (values) {
        filterProduct([parseInt(values[0]), parseInt(values[1])], null, "precio")
        $(".mini-price").html(`<span>Min. ${f(values[0])}</span><span>Max. ${f(values[1])}</span>`)
    });

    
}

function renderFiltros(p) {

    $resultado_list.find("#result-label").html(`Mostrando <strong>${p.filtered_count}</strong> producto${p.filtered_count == 1 ? "" : "s"} para <b>${result_search_str}</b>`)

    renderMarcas($("#marcas-filter"), p.marcas)
    renderProveedores($("#laboratorio-filter"), p.proveedores)
    renderPrecios($("#precio-filter"), p)

    $(".left-menu").off("click").on("click", "> div", function(e) {
        let $this = $(e.currentTarget)
        filterProduct($this.data("value"), $this[0], $this.data("filter"))
    })

    $("#filtros").show(300)

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