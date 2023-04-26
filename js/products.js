// ========================================================================== //
// PRODUCTOS

let filter = {categorias: [], subcategorias: [], marcas: [], precio: [], proveedores: []},
    continueAnim, 
    currentHeader
;

let orderStr = `
<div class="row row-center">
<div class="selectdiv" style="min-width: 170px;">
    <select id="sort" onchange="showProducts($resultado_list, store.collections['search'], null, {renderFilters: true, cache: true, sort:$(this).val()})">
        <option value="rel">Orden automático</option>
        <option value="men">Menor precio primero</option>
        <option value="may">Mayor precio primero</option>
        <option value="des">Mayor descuento primero</option>
    </select>
</div>
</div>`

async function showProducts($target, products, collection, options = {}){

    let ret = { marcas: {}, cats: {}, subs: {}, minPrice: Number.MAX_SAFE_INTEGER, maxPrice: 0, prod_rendered: [], fullProducts: [], filtered: false}

    if(options.cache === true) {
        ret.fullProducts = products
        forEach(ret.fullProducts, item => store.collections[collection].push((store.products[item.id] = item)))
    } else {
        ret.fullProducts = await getProductsFullInfo(products)
        ret.fullProducts = ret.fullProducts.stock

        if(!options.append) {
            store.collections[collection] = []
            $target.html("")
        }
        forEach(ret.fullProducts, item => store.collections[collection].push((store.products[item.id] = item)))
    }
    
    if(options.limit) ret.fullProducts = ret.fullProducts.slice(0, options.limit)

    if(options.renderFilters) {

        ret.filtered = true,
        ret.filters = {}

        if(options.type == "precio") {
            filter.precio = options.value
        } else if(options.value != undefined) {
            index = filter[options.type].findIndex(elem => elem == options.value)
            if(index > -1) filter[options.type].splice(index, 1)
            else filter[options.type].push(options.value)
        }

        forEach(ret.fullProducts, item => {

            // filters
            if(filter.precio.length > 0 && (item.precio < filter.precio[0] || item.precio > filter.precio[1])) return;
            if(filter.marcas.length > 0 && !filter.marcas.includes(item.marca)) return;
            if(filter.subcategorias.length > 0 && !filter.subcategorias.includes(item.sub)) return;
            if(filter.proveedores.length > 0 && !filter.proveedores.includes(item.proveedor)) return;

            // stats
            if(item.precio < ret.minPrice) ret.minPrice = item.precio
            if(item.precio > ret.maxPrice) ret.maxPrice = item.precio
            if(item.marca) set(ret, "marcas", item.marca, "count")
            if(item.proveedor) set(ret, "proveedores", item.proveedor, "count")
            if(item.cat && item.sub) {set(ret, "cats", item.cat, "count"); set(ret, "subs", item.sub, "count")}

            ret.prod_rendered.push(item)
        })

        // sort
        if(options.sort) store.sort = options.sort
        switch(store.sort) {
            case "men": renderProducts($target, sortByKey(ret.prod_rendered, "precio", "asc"), options); break;
            case "may": renderProducts($target, sortByKey(ret.prod_rendered, "precio", "desc"), options); break;
            case "des": renderProducts($target, sortByKey(ret.prod_rendered, "descuento", "desc"), options); break;
            default: {
                if(options.banners_data) {
                    //options.banners_data.forEach(item => console.log(item))
                }
                renderProducts($target, ret.prod_rendered.sortOnDesc("score2", "descuento"), options, ret)
            }
        }
    } else {
        ret.prod_rendered = ret.fullProducts
        if(options.sort) sortByKey(ret.prod_rendered, options.sort.field, options.sort.mode)
        renderProducts($target, options.shuffle ? ret.prod_rendered.sort(function(){return 0.5 - Math.random()}) : ret.prod_rendered, options)
    }

    return {total_count: products.length, founded_count: ret.fullProducts.length, filtered_count: ret.prod_rendered.length, noProducts: ret.prod_rendered.length == 0, ...ret}
}

function renderProducts($target, products, options = {}, ret) {

    $target.find(".products-loading").remove()

    if(!products) return
    
    let items_per_page = options.items_per_page || 200

    options = Object.assign({
        limit: false,
        page: 0,
        rows: false,
        cols: false,
        section: options.section || 1,
        autoRenderPage: 1
    }, options)
    
    if(options.limit) products = products.slice(0, options.limit)

 
    if(options.rows != undefined && options.cols != undefined) {
        if(options.rows == "auto") items_per_page = productBounces.rowCount * options.cols
        else if(options.rows && options.cols) items_per_page = options.rows * options.cols
    }

    if(options.hcarrusel){
        renderPage($target, products, items_per_page, true)
    } else {

        if(!options.append) {
            $target.find(".section0, .section1, .section2, .section3, .section4, .section5, .section6, .section7").remove()
        }

        if(options.headerFilter) {

            let s = "", labels = {subcategorias: "categoría", marcas: "marca", proveedores: "laboratorio"};

            $target.append(`<div class="section${options.section}">${options.headerFilter ? `<div class="products-header">Mostrando <b>${ret.prod_rendered.length}</b> productos filtrados por</div>` : ""}<div id="filter-cont"></div><div class="products-page"></div></div>`)
            

            forEach(filter, (item, key) => {
                if(key == "precio") {
                    if(item.length > 0 && (rangeValues[0] != item[0] || rangeValues[1] != item[1])) s += `<div class="filter-item">de ${f(item[0])} a ${f(item[1])}<span>precio</span><div onclick="resetPrice()"></div></div>`
                } else {
                    forEach(item, f => {
                        label = f.toLowerCase()
                        if(key == "subcategorias") label = store.categorias[label.substr(0, label.length -2)].subs[label].title
                        s += `<div class="filter-item">${label}<span>${labels[key]}</span><div onclick="filterClick('${f}', '${key}')"></div></div>`
                    })
                }
            })
   
            if(s == "") $target.find(".products-header").html(currentHeader)
            $("#filter-cont").html(s + `<div style="clear:both"></div>`)

            if(ret.prod_rendered.length == 0) $("#no-resultado").show(0)
            else $("#no-resultado").hide(0)
            $content.scrollTop(0)
            
        } else if(options.header) {
            currentHeader = options.header
            $target.append(`<div class="section${options.section}">${options.header ? `<div class="products-header">${options.header}</div>` : ""}<div class="products-page"></div></div>`)
        } else if(options.headerLike) {
            currentHeader = `Mostrando <b>${ret.prod_rendered.length}</b> resultados parecidos a <b>${options.headerLike}</b>`
            $target.append(`<div class="section${options.section}"><div class="products-header">${currentHeader}</div><div class="products-page"></div></div>`)
        } else if(options.headerExact) {
            currentHeader = `Mostrando <b>${ret.prod_rendered.length}</b> resultados para <b>${options.headerExact}</b>`
            $target.append(`<div class="section${options.section}"><div class="products-header">${currentHeader}</div><div id="banner" style="margin-bottom:10px"></div><div class="products-page"></div></div>`)
        } else {
            $target.append(`<div class="section${options.section}">${currentHeader ? `<div class="products-header">${currentHeader}</div>` : ""}<div class="products-page"></div></div>`)
        }
        
        renderPage($target.find(`.section${options.section}`), products, items_per_page, false)
    }
   
    
}

function renderPage($target, products, items_per_page, isCarrusel) {

    if(isCarrusel) {
        forEach(products, (item, index) => {if(index < items_per_page) $target.append(`<div class="swiper-slide slide-product">${renderProductItem(item, item.noStock, false, index + 1)}</div>`)})
    } else {
        $target.find(`.products-page`).html(`<div class="products-list"></div>`)
        let $child = $target.find(".products-list")
        forEach(products, (item, index) => {if(index < items_per_page) $child.append(renderProductItem(item, item.noStock, false, index + 1))})
    }
    
    $target.off("click").on("click", ".product-item", function(e) {
        e.preventDefault();
        productClick($(e.currentTarget), $(e.target))
    })

}

function renderExtrainfo(item) {

    let lineas = [], s = `<tr><td class="title">Código</td><td>${item.id}</td></tr>`

    if(item.valor_contenido) s += `<tr><td class="title">Valor por Unidad</td><td>${item.valor_contenido}</td></tr>`
    if(item.stock > 0) s += `<tr><td class="title">Disponibles</td><td>${item.stock == 1 ? item.stock + " Unidad" : item.stock + " Unidades"}</td></tr>`
    if(item.proveedor) s += `<tr><td class="title">Proveedor</td><td>${item.proveedor}</td></tr>`

    if(item.datasheet) {
        lineas = item.datasheet.split("\n")
        lineas.forEach((item, index) => {
            if(item.toLowerCase().indexOf("profundidad") > -1) return
            if(item.toLowerCase().indexOf("ancho") > -1) return
            if(item.toLowerCase().indexOf("país") > -1) return
            if(item.toLowerCase().indexOf("paquete") > -1) return
            if(item.indexOf(":") > -1) s += `<tr><td class="title">${item.replace(":", "")}</td><td>${lineas[index + 1] || ""}</td></tr>`
        })
    }

    return `
<div>${item.aditional ? `<h2 style="color:#333; font-size: 1.2em">Información Adicional</h2><div class="info-add">${item.aditional}</div><br><br>` : ""}</div>
<table class="table-ficha">${s}</table>`

}

function renderProductItem(item, type, lazy_img = false) {

    let hasDiscount = false, 
        precioCondicion = false,
        cart = store.cart[item.id]
    ;
    
    switch(type) {

        case "loading":
            return `
<div class="product-item" style="pointer-events:none">
    <div class="item">
        <div class="image"></div>
        <div class="info">
            <div class="placeholder"></div>
            <div class="placeholder"></div>
            <div class="placeholder"></div>
        </div>
    </div>
</div>`

        case "detail":
            hasDiscount = item.descuento > 0 && !store.noPromoCats.includes(item.cat) && !store.noPromoSubs.includes(item.sub)
            if(item.VlrMinimo > 0) {
                hasDiscount = false
                precioCondicion = true
            }
            return `

<div class="detalle-titulo">${item.nombre2}</div>
${item.description ? `<div class="descripcion">${item.description}</div>` : ""}

<div class="precio-cont">
    ${hasDiscount ? `<div class="descuento"><div class="label">${item.descuento}%</div></div>` : ""}
    ${hasDiscount ? `<span class="antes">${f(item.antes)}</span>` : `<span class="antes"></span>`}
    <span class="precio ${hasDiscount ? "rojo" : "" }">${f(item.precio)}</span>
    <div style="display:inline-block">
        ${cart ? `<div class="row row-center cantidad"><i class="fas ${cart._quanty == 1 ? "fa-trash-alt" : "fa-minus"}" onclick="productDetailClick(this)"></i><input type="text" value="${cart._quanty}" /><i class="fas fa-plus" onclick="productDetailClick(this)"></i></div>` : `<button class="add" onclick="productDetailClick(this)">AGREGAR</button>`}
    </div>
</div>
${precioCondicion ? `<span class="pcondicion">${f(item.ahora)} <i class="fas fa-info-circle"></i></span>` : ""}
${precioCondicion ? `<div class="info-precio"><span class="rojo"><i class="fas fa-info-circle"></i> El precio <b>${f(item.ahora)}</b> aplica si el monto de la compra es superior a ${f(item.VlrMinimo)}</span></div>` : ""}

<div class="rating-cont">
    <div id="rating">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
    </div>
    <span style="padding-left:12px; font-size:1.3em;"><b>4.6</b></span>
    <div id="back-opinar">
        <span style="color: #317ce7; padding: 0 12px;">27 opiniones</span>
        <div id="opinar-btn">Escribir Opinión</div>
    </div>
</div>`
        

        case "no-detail":
            return `
<div class="info" data-id="${item.id}" data-pid="${item.id}">
    <div class="row row-left row-center">
        <div class="precio rojo">PRODUCTO NO DISPONIBLE</div>
    </div>
    ${item.Categoria ? `<p><br><div>Categoría: ${item.Categoria}</div></p>` : ""}
    ${item.descripcion_adicional ? `<p><div>${item.descripcion_adicional}</div></p>` : ""}
</div>
`

    default:

        hasDiscount = item.descuento > 0 && (!store.noPromoCats.includes(item.cat) && !store.noPromoSubs.includes(item.sub) || store.proveedores.includes(item.nitproveedor))

        beneficio = item.beneficio != undefined

        if(item.VlrMinimo > 0) {
            hasDiscount = false
            precioCondicion = true
        }
        return `
    <div class="product-item" data-id="${item.id}">
    <div class="item">
    ${hasDiscount ? `<div class="descuento"><div class="label">${item.descuento}% descuento</div></div>` : ""}
    <div class="image"><img ${lazy_img ? `data-src=` : `src=`}"https://www.droguerialaeconomia.com/economia/site/img/${item.id}.png" alt="" /></div>
    <div class="info">
    <span class="titulo">${item.nombre}</span>
    ${beneficio ? `<div class="promocion"><i class="fas fa-gift"></i>&nbsp; paga <b>3</b> lleva <b>4</b>!</div>` : ""}
    <div style="padding:9px 0">
    ${hasDiscount ? `<span class="antes">${f(item.antes)}</span>` : `<span class="antes2">&nbsp;</span>`}
    <span class="precio ${hasDiscount || beneficio ? "rojo" : "" }">${f(item.precio)}</span>
    ${precioCondicion ? `<span class="pcondicion">${f(item.ahora)} <i class="fas fa-info-circle"></i></span>` : ""}
    </div>
    <span class="contenido">${item.valor_contenido ? item.valor_contenido : "&nbsp;"}</span>
    ${cart ? 
    `<div class="row row-center cantidad" data-pid="${item.id}">
        <i class="fas ${cart._quanty == 1 ? "fa-trash-alt" : "fa-minus"}"></i>
        <input type="text" value="${cart._quanty}" onchange="pLog('cart', {id: ${item.id}, value: this.value})" />
        <i class="fas fa-plus"></i>
    </div>`
    : 
    `<button class="add"><i class="fas fa-plus" style="pointer-events: none;"></i></button>`
    }
    
    </div>
    </div>
    </div>`
    }
}

function renderLoading($target) {

    let s = "";

    if(productBounces.rowCount == 0) productBounces.rowCount = 6

    for(let i = 0; i < productBounces.rowCount * 2; i++) {
        s += renderProductItem({}, "loading")
    }

    $target.html(`<div class="products-loading products-list">${s}</div>`)

    continueAnim = true;

    function animate1() {
        anime({
            targets: '.products-loading > div',
            opacity: 0.3,
            duration: 250,
            easing: 'linear',
            scale: 0.97,
            delay: anime.stagger(100),
            complete: () => {if(continueAnim) animate2()}
        });
    }

    function animate2() {
        anime({
            targets: '.products-loading > div',
            opacity: 1,
            duration: 250,
            easing: 'linear',
            scale: 1,
            delay: anime.stagger(100),
            complete: () => {if(continueAnim) animate1()}
        });
    }

    animate1()
}

function productClick($parent, $elem) {

    let id = $parent.data("id");

    if($elem.hasClass("add")) return pLog("cart", {id, product: store.products[id], value: 1});
    if($elem.hasClass("fa-plus")) return pLog("cart", {id, sum: 1});
    if($elem.hasClass("fa-minus") || $elem.hasClass("fa-trash-alt")) return pLog("cart", {id, sum: -1});
    if($elem.hasClass("cantidad")) return
    pLog("viewProduct", {id, name: store.products[id].nombre})

}

function renderProductUpdate(id) {
    
    $(".products-list:not(#medida)").each(function() {
        let $parent = $(this),
            $elem = $parent.find("[data-id='" + id + "']")
        ;
        if($elem.length > 0) $elem[0].outerHTML = renderProductItem(store.products[id])
    })

    if(currentProductDetail) $("#basic-info").html(renderProductItem(currentProductDetail, "detail"))
  
    
}