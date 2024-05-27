// ========================================================================== //
// PRODUCTOS

let filter = {categorias: [], subcategorias: [], marcas: [], precio: [], proveedores: []},
    continueAnim, 
    currentHeader
;

let orderStr = /*html*/`
<div class="selectdiv">
    <select id="sort" onchange="showProducts($resultado_list, 'currentCollection', {filter: true, sort:$(this).val()})">
        <option value="rel">Orden automático</option>
        <option value="men">Menor precio primero</option>
        <option value="may">Mayor precio primero</option>
        <option value="des">Mayor descuento primero</option>
    </select>
</div>`


function getProduct(id) {
    let index, ret;
    forEach(store.collections, collection => {
        index = collection.findIndex(item => item.id == id)
        if(index >= 0) ret = collection[index]
    })
    return ret
}

function showProducts($target, products, options = {}){

    let ret = {
        marcas: {}, 
        cats: {}, 
        subs: {}, 
        minPrice: Number.MAX_SAFE_INTEGER, 
        maxPrice: 0, 
        rendered: [], 
        filtered: false
    }

    if(products == 'currentCollection') products = store.collections[store.currentCollection]

    if(options.collection) {
        store.collections[options.collection] = products
        store.currentCollection = options.collection
    }

    if(options.limit) products = products.slice(0, options.limit)

    if(options.filter) {

        ret.filtered = true,
        ret.filters = {}

        if(options.type == "precio") {
            filter.precio = options.value
        } else if(options.value != undefined) {
            index = filter[options.type].findIndex(elem => elem == options.value)
            if(index > -1) filter[options.type].splice(index, 1)
            else filter[options.type].push(options.value)
        }

        forEach(products, item => {

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

            ret.rendered.push(item)
        })

        // sort
        if(options.sort) store.sort = options.sort
        switch(store.sort) {
            case "men": renderProducts($target, sortByKey(ret.rendered, "precio", "asc"), options, ret); break;
            case "may": renderProducts($target, sortByKey(ret.rendered, "precio", "desc"), options, ret); break;
            case "des": renderProducts($target, sortByKey(ret.rendered, "descuento", "desc"), options, ret); break;
            default: {
                renderProducts($target, ret.rendered.sortOnDesc("score2", "descuento"), options, ret)
            }
        }

    } else {
        ret.rendered = products
        if(options.sort) sortByKey(ret.rendered, options.sort.field, options.sort.mode)
        renderProducts($target, options.shuffle ? ret.rendered.sort(() => (0.5 - Math.random())) : ret.rendered, options, ret)
    }

    return {
        total_count: products.length, 
        founded_count: products.length,
        filtered_count: ret.rendered.length, 
        noProducts: ret.rendered.length == 0,
        products,
        ...ret
    }
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

    if(!options.append) {
        $target.find(".section0, .section1, .section2, .section3, .section4, .section5, .section6, .section7").remove()
    }

    if(options.headerFilter) {

        let s = "", labels = {subcategorias: "categoría", marcas: "marca", proveedores: "laboratorio"};
 
        $target.append(/*html*/`<div class="section${options.section}">${options.headerFilter ? `<div class="products-header">Mostrando <b>${ret.rendered.length}</b> productos filtrados por</div>` : ""}
            <div id="filter-cont"></div>
            <div class="products-page"></div>
        </div>`)
        
        forEach(filter, (item, key) => {
            if(key == "precio") {
                if(item.length > 0 && (rangeValues[0] != item[0] || rangeValues[1] != item[1])) s += `<div class="filter-item">de ${f(item[0])} a ${f(item[1])}<span>precio</span><div onclick="resetPrice()"></div></div>`
            } else {
                forEach(item, f => {
                    let label = f.toLowerCase()
                    if(key == "subcategorias") label = store.categorias[label.substr(0, label.length -2)].subs[label].title
                    s += `<div class="filter-item">${label}<span>${labels[key]}</span><div onclick="filterClick('${f}', '${key}')"></div></div>`
                })
            }
        })

        if(s == "") $target.find(".products-header").html(currentHeader)
        $("#filter-cont").html(`<button class="addFiltro" onclick="mostrarFiltros(true)"><i class="fas fa-filter"></i> Agrega un filtro</button>` + s + `<div style="clear:both"></div>`)

        if(ret.rendered.length == 0) $("#no-resultado").show(0)
        else $("#no-resultado").hide(0)

        
    } else {
        if(options.header) {
            currentHeader = options.header
        } else if(options.headerLike) {
            currentHeader = `Mostrando <b>${ret.rendered.length}</b> resultados parecidos a <b>${options.headerLike}</b>`
        } else if(options.headerExact) {
            currentHeader = `Mostrando <b>${ret.rendered.length}</b> resultados para <b>${options.headerExact}</b>`
        }

        $target.append(/*html*/`<div class="section${options.section}">
            ${currentHeader ? `<div class="products-header">${currentHeader}</div>` : ""}
            <div><button class="addFiltro" onclick="mostrarFiltros(true)"><i class="fas fa-filter"></i> Agrega un filtro</button><div style="clear:both"></div></div>
            <div id="banner" style="margin-bottom:20px; position: relative; overflow: hidden; border-radius: 8px;"></div>
            <div class="products-page"></div>
        </div>`)
        
    }

    $(".addFiltro").hide(0)
    $("#banner").width($target.width())

    if($(window).width() < 800 && options.filter) $(".addFiltro").show(0)

    
    renderPage($target.find(`.section${options.section}`), products, items_per_page)
    
}


function showProductsHorizontal($target, products, options = {}){

    let ret = {
        marcas: {}, 
        cats: {}, 
        subs: {}, 
        minPrice: Number.MAX_SAFE_INTEGER, 
        maxPrice: 0, 
        rendered: [], 
        filtered: false
    }

    if(products == 'currentCollection') products = store.collections[store.currentCollection]

    if(options.collection) {
        store.collections[options.collection] = products
        store.currentCollection = options.collection
    }

    if(options.limit) products = products.slice(0, options.limit)

    $target.html(`<div class="swiper-wrapper"></div>`)
    renderProductsHorizontal($target.find(".swiper-wrapper"), options.shuffle ? products.sort(() => (0.5 - Math.random())) : products, options, ret)

    new Swiper($target[0], 
        {
            direction: 'horizontal',
            slidesPerView: productBounces.rowCount,
            slidesPerGroup: productBounces.rowCount,
            loop: true,
            autoplay: {delay: 6000},
            preloadImages: false,
            lazy: true,
            navigation: {nextEl: options.nextEl, prevEl: options.prevEl}
        }
    )

    return {
        total_count: products.length, 
        founded_count: products.length,
        filtered_count: ret.rendered.length, 
        noProducts: ret.rendered.length == 0,
        products,
        ...ret
    }
}

function renderProductsHorizontal($target, products, options = {}, ret) {


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

    renderPage($target, products, items_per_page, true)
   
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

    let lineas = [], s = `<div><div class="title">Código</div><div>${item.id}</div></div>`

    if(item.valor_contenido) s += `<div><div class="title">Valor por Unidad</div><div>${item.valor_contenido}</div></div>`
    if(item.stock > 0) s += `<div><div class="title">Disponibles</div><div>${item.stock == 1 ? item.stock + " Unidad" : item.stock + " Unidades"}</div></div>`
    if(item.proveedor) s += `<div><div class="title">Proveedor</div><div>${item.proveedor}</div></div>`

    if(item.datasheet) {
        lineas = item.datasheet.split("\n")
        lineas.forEach((item, index) => {
            if(item.toLowerCase().indexOf("profundidad") > -1) return
            if(item.toLowerCase().indexOf("ancho") > -1) return
            if(item.toLowerCase().indexOf("país") > -1) return
            if(item.toLowerCase().indexOf("paquete") > -1) return
            if(item.indexOf(":") > -1) s += `<div><div class="title">${item.replace(":", "")}</div><div>${lineas[index + 1] || ""}</div></div>`
        })
    }
    //if(item.patrocina && item.patrocina == "S") $(".detail-patro").html(`<img src="${ABS_URL}/assets/patro.png" alt="" style="width:100%" />`)
    
    if(currentProductDetail.mostrarDescripcion !== false) {
        return `
<div class="table-ficha">${s}</div>
<div>${item.aditional ? `<div class="titulo-mediano">Información Adicional</div><div class="descripcion max50">${item.aditional}</div>` : ""}</div>`
    }

    return `<div class="table-ficha">${s}</div>`

}

function renderProductItem(item, type) {

    let hasDiscount = false, 
        precioCondicion = false,
        hasBeneficio = false,
        extraProducto = 0,
        pagaProducto = 0,
        cart = store.cart[item.id]
    ;

    if(item.beneficio && item.beneficio.idUnidadB && item.beneficio.idUnidadB != 0) {
        hasBeneficio = true
        extraProducto = Math.floor(item.beneficio.cntBeneficio / item.beneficio.idUnidadB)
        pagaProducto = Math.floor(item.beneficio.minCompra / item.beneficio.idUnidadB)
    }
    hasDiscount = item.descuento > 0 && !item.beneficio
    
    switch(type) {

        case "loading":
            return /*html*/`
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
            hasDiscount = item.descuento > 0;
            isMedicamento = store.noPromoCats.includes(item.cat) || store.noPromoSubs.includes(item.sub);
            if(item.VlrMinimo > 0) {hasDiscount = false; precioCondicion = true}

            return /*html*/`
<div class="titulo">${item.nombre2}</div>
<div class="descripcion">${item.description && item.mostrarDescripcion && !item.requiereFormula && !item.tipo ? item.description : ""}</div>
${item.requiereFormula && !item.tipo ? `<div class="descripcion" style="background: #fffe8b;padding: 8px;border-radius: 10px;border: 1px solid #c3c337;color: #933905;font-weight: 500;">&nbsp;  <i class="far fa-file-alt"></i> &nbsp;Este medicamento requiere fórmula médica.</div>` : ``}

${item.tipo == "suplemento" ? `<div class="descripcion" style="background: #fffe8b;padding: 8px;border-radius: 10px;border: 1px solid #c3c337;color: #933905;font-weight: 500;">&nbsp;  <i class="far fa-file-alt"></i> &nbsp;ESTE PRODUCTO ES UN SUPLEMENTO DIETARIO. NO ES UN MEDICAMENTO Y NO SUPLE UNA ALIMENTACIÓN EQUILIBRADA.</div>` : ``}
${item.tipo == "coadyudante" ? `<div class="descripcion" style="background: #fffe8b;padding: 8px;border-radius: 10px;border: 1px solid #c3c337;color: #933905;font-weight: 500;">&nbsp;  <i class="far fa-file-alt"></i> &nbsp;COADYUVANTE EN EL MANEJO DE LAS RECIDIVAS DE INFECCIONES URINARIAS.</div>` : ``}
<br>

${_(hasDiscount, `<div class="antes">${f(item.antes)}</div>`)}
<div class="precio ${hasDiscount ? "rojo" : "" }">${f(item.precio)}</div>
${_(precioCondicion, /*html*/`&nbsp; / <div class="pcondicion">${f(item.ahora)} <i class="fas fa-info-circle"></i></div>`)}
${hasDiscount ? `<div class="descuento">Ahorra ${item.descuento}%</div>` : ""}
<div></div>
${cart ? /*html*/`
<div class="row r-l">
    <div class="row cantidad">
        <i class="fas ${cart._quanty == 1 ? "fa-trash-alt" : "fa-minus"}" onclick="productDetailClick(this)"></i>
        <input type="text" value="${cart._quanty}" />
        <i class="fas fa-plus" onclick="productDetailClick(this)"></i>
    </div>
    <div style="flex:1; font-weight: 300; padding-left: 15px">(${item.stock == 1 ? `1 disponible` : `${item.stock} disponibles`})</div>
</div>
`
: /*html*/`<button class="add" onclick="productDetailClick(this)">AGREGAR</button>`}
    
${_(precioCondicion, /*html*/`
    <div class="info-precio">
        <span class="rojo"><i class="fas fa-info-circle"></i> El precio <b>${f(item.ahora)}</b> aplica si el monto de la compra es superior a ${f(item.VlrMinimo)}</span>
    </div>
`)}

<!-- <div class="rating-cont">
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
</div> -->

`
        

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

        hasDiscount = item.descuento > 0 && (!store.noPromoCats.includes(item.cat) && !store.noPromoSubs.includes(item.sub) || (store.proveedores && store.proveedores.includes(item.nitproveedor)) )


        if(item.VlrMinimo > 0) {
            hasDiscount = false
            precioCondicion = true
        }

        return /*html*/`
<div class="product-item" data-id="${item.id}">
    <div class="item">
        ${_(hasDiscount, /*html*/`<div class="descuento"><div class="label">${item.descuento}%</div></div>`)}
        <div class="image">
            <img src="https://www.droguerialaeconomia.com/economia/site/img/${item.id}.png" alt="" />
        </div>
        ${item.patrocina && item.patrocina == "S" && false ? `<div class="patrocina">Marca Patrocinadora</div>` : `<div class="patrocina" style="opacity:0">&nbsp;</div>`}
        <div class="info">
            <span class="titulo">${item.nombre}</span>
            <div style="padding:9px 0">
            ${_(hasDiscount, /*html*/`<span class="antes">${f(item.antes)}</span>`, /*html*/`<span class="antes2">&nbsp;</span>`)}
            <span class="precio ${_(hasDiscount || hasBeneficio, "rojo")}">${f(item.precio)}</span>
            ${hasBeneficio ? `<div class="beneficio">Pague <b>${pagaProducto} lleve </b>${pagaProducto + extraProducto}</div><div style="height:20px"></div>` : `<div style="height:40px"></div>`}
            ${_(precioCondicion, /*html*/`<span class="pcondicion">${f(item.ahora)} <i class="fas fa-info-circle"></i></span>`)}
        </div>
        <span class="contenido">${item.valor_contenido ? item.valor_contenido : "&nbsp;"}</span>

        ${cart ? /*html*/`
        <div class="row row-center cantidad" data-pid="${item.id}">
            <i class="fas ${cart._quanty == 1 ? "fa-trash-alt" : "fa-minus"}"></i>
            <input type="text" value="${cart._quanty}" onchange="pLog('cart', {id: ${item.id}, value: this.value})" />
            <i class="fas fa-plus"></i>
        </div>`
        : 
        /*html*/`<button class="add">AGREGAR</button>`
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
            opacity: 0.5,
            duration: 150,
            easing: 'linear',
            delay: anime.stagger(100),
            complete: () => {if(continueAnim) animate2()}
        });
    }

    function animate2() {
        anime({
            targets: '.products-loading > div',
            opacity: 1,
            duration: 150,
            easing: 'linear',
            delay: anime.stagger(100),
            complete: () => {if(continueAnim) animate1()}
        });
    }

    animate1()
}

function productClick($parent, $elem) {

    
    let id = $parent.data("id");

    console.log(id, getProduct(id))
    if($elem.hasClass("add")) return pLog("cart", {id, product: getProduct(id), value: 1});
    if($elem.hasClass("fa-plus")) return pLog("cart", {id, sum: 1});
    if($elem.hasClass("fa-minus") || $elem.hasClass("fa-trash-alt")) return pLog("cart", {id, sum: -1});
    if($elem.hasClass("cantidad")) return
    pLog("viewProduct", {id, name: getProduct(id).nombre})

}

function renderProductUpdate(id) {

    $$("[data-id='" + id + "']").forEach(item => {
        if(item.classList.contains('product-item')) {
            item.outerHTML = renderProductItem(getProduct(id))
        }
    })
    if(currentProductDetail) $("#basic-info").html(renderProductItem(currentProductDetail, "detail"))
   
}