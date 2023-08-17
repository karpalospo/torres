let carttime;

function setCart(id, payload) {

    //console.log(id, payload, store.cart[id])

    let item, show = false;

    payload.value = parseInt(payload.value)

    if((item = store.cart[id])) {

        if(payload.value == 0) delete store.cart[id]
        else if(payload.sum != undefined) {
            quanty = item._quanty + payload.sum
            if(quanty == 0) delete store.cart[id]
            if(quanty > item.stock) quanty = item.stock
            item._quanty = quanty
        }

    } else if(payload.product.stock >= 1 && payload.value >= 1) {
        show = true
        store.cart[id] = {
            ...payload.product, 
            _id: id,
            _date: new Date().getTime(), 
            _quanty: Math.min(payload.product.stock, payload.value), 
            _new: true
        }
    }
       
    cartCallback(show)
    renderProductUpdate(id)
}

function resetCart() {
    forEach(Arrayfy(store.cart), async item => {
        delete store.cart[item._id]
        renderProductUpdate(item._id)
    })
    cartCallback()
}

function calculateCart() {

    let items = 0,
        subtotal = 0,
        cart_array = Arrayfy(store.cart),
        discount = store.cuponDiscount + store.bonusDiscount,
        couponTotal = 0,
        itemsTotal = 0,
        itemsTotalDesc = 0,
        c = store.coupon,
        ret = false,
        products = []

    ;

    forEach(cart_array, item => {

        if(!item._date) ret = true

        itemsTotal = 0
        if(item._flag != 0) {
            itemsTotal = item._quanty * item.precio
        }
        subtotal += itemsTotal
        items += item._quanty
    })

    if(ret) return resetCart()

    itemsTotalDesc = subtotal
    subtotal = 0

    forEach(cart_array, item => {

        item._renderPrice = item.precio
        item._conditionalPrice = item.VlrMinimo > 0
        item._hasDiscountVlrMinimo = false
        item._hasDiscount = item.descuento > 0 && !store.noPromoCats.includes(item.cat) && !store.noPromoSubs.includes(item.sub)
        item._disabled = item._flag == 0
        item._newPrice = (item._flag && item._flag.precio != undefined) ? item._flag.precio : false
        item._newPrice = (item.VlrMinimo == 0 ? undefined : item._newPrice)
        item._cupon = undefined
        

        if(item.VlrMinimo > 0) {
            if(itemsTotalDesc > item.VlrMinimo) {
                item._renderPrice = item.ahora
                item._hasDiscountVlrMinimo = true
                item._conditionalPrice = false
                item._hasDiscount = true
            } else item._hasDiscount = false
        }

        if(item._newPrice == item._renderPrice) item._newPrice = false

        itemsTotal = 0
        if(item._flag != 0) {
            if(item.isCombo && item.productos) {
                item.productos.forEach(combo_item => {
                    const product_item = {
                        idoferta: item.id,
                        id: combo_item.codigo,
                        nombre: combo_item.descripcion,
                        stock: combo_item.stock,
                        IdUnidad: 1,
                        descuento: item.descuento,
                        _quanty: combo_item.minCompra * item._quanty,
                        precio: Math.ceil(combo_item.valor_unitario * (1 - (item.descuento ? item.descuento : 0) / 100))
                    }
                    itemsTotal += product_item._quanty * product_item.precio
                    products.push({item: product_item, price: product_item.precio})
                })
                
            } else products.push({item, price: item._renderPrice})

            itemsTotal = item._quanty * item._renderPrice
            
        }
        subtotal += itemsTotal

        // cupon
        if(c && c.condicion != undefined) {
            
            if(c.condicion == 0) couponTotal += itemsTotal
            else if(c.itemsCondicion) {
                
                forEach(c.itemsCondicion, cond => {
                    if(item._cupon == undefined) item._cupon = false;
                    switch(cond.tipo) {
                        case "SC": if(item.sub == cond.AplicadoA) {couponTotal += itemsTotal; item._cupon = true;} break;
                        case "CD": if(item.id == cond.AplicadoA) {couponTotal += itemsTotal; item._cupon = true;} break;
                        case "CT": if(item.cat == cond.AplicadoA) {couponTotal += itemsTotal; item._cupon = true;} break;
                        case "GR": if(item.cat.substring(0, 2) == cond.AplicadoA) {couponTotal += itemsTotal; item._cupon = true;}
                    }
                })
                
            }
        }
    })

    store.order = {...store.order, couponTotal, subtotal, items, discount}

    return products
}

function renderCart() {

    let $cart_list = $("#cart-list"),
        $cart_icon_badge = $("#cart-badge"),
        cart_array = Arrayfy(store.cart),
        c = store.coupon
    ;

    calculateCart()

    $cart_list.html("")

    forEach(cart_array.sortOnDesc("_date"), async item => {

        $cart_list.append($(renderCartItem(item)))

        if(item._new) {delete item._new}
    })

    $cart_icon_badge.html(store.order.items < 100 ? store.order.items : "99+")

    if(store.order.items == 0) $cart_list.html(renderCartItem(null, "nocart"))

    // cupon
    if(c && c.VlrMinimo != undefined) {
        falta = c.VlrMinimo - store.order.couponTotal
        $cart_list.prepend(/*html*/`
<div data-id="0">
<img src="${ABS_URL_SERVER}/assets/cupon.png" alt="" />
<div class="f1">
    <div class="titulo" style="color:#ff2c6e">${c.NombreCupon}</div>
    <div>${store.coupon.condicionTexto}</div>
    <div class="row" style="padding:10px 0;">
        <div><div class="link2" onclick="showModal(true, $('#cupones'))" >Ver Condiciones</div></div>
        <div style="text-align: center">
            <div class="cantidad">
                <i onclick="borrarCupon()" class="fas fa-trash-alt"></i>
            </div>
        </div>
        <div class="precio-cupon">-${f(c.ValorCupon)}</div>
    </div>
    ${falta > 0 ?
    /*html*/`<div class="progressbar">
        <div style="width:${Math.round(store.order.couponTotal / c.VlrMinimo * 100)}%"></div>
    </div>
    <div style="padding:7px; font-size:0.9em; text-align:right">Faltan <b>${f(falta)}</b> para aplicar</div>`
    : 
    /*html*/`<div><i class="fas fa-check" style="color:green"></i> Aplica para redimir</div>`
    }
</div>
</div>`)
    }

    $cart_list.off("click").on("click", "> div", function(e) {
        e.preventDefault();
        productCartClick($(e.currentTarget), $(e.target))
    })

    // render values
    //$("#lbl-domicilio").text(f(store.order.shipping))
    $("#lbl-total").text(f(store.order.subtotal))

}

function productCartClick($parent, $elem) {

    let id = $parent.data("id");

    if($elem.hasClass("button-delete")) return pLog("cart", {id, value: 0});
    if($elem.hasClass("fa-plus")) return pLog("cart", {id, sum: 1});
    if($elem.hasClass("fa-minus") || $elem.hasClass("fa-trash-alt")) return pLog("cart", {id, sum: -1});

}

function renderCartItem(item, type) {

    switch(type) {
        case "order": 
            return /*html*/`
<div>
    ${_(item._hasDiscount, `<div class="descuento">${item.descuento}%</div>`)}    
    <img src="https://www.droguerialaeconomia.com/economia/site/img/${item.id}.png" alt="" />
    <div class="f1">
        <div class="titulo">${item.nombre.toLowerCase()}</div>
        <div><b>${item.cantidad}</b> ${item.cantidad == 1 ? "unidad" : "unidades"} x <b>${f(item.unitario)}</b></div>

    </div>
    <div class="precio ${item._hasDiscount ? "rojo" : ""}">${f(item.total)}</div>
</div>`       

        case "nocart": 
            return /*html*/`
<p class="no-products">
    <i class="fa fa-exclamation-circle"></i> No hay productos en tu carrito de compra.<br/> Agrega algunos para continuar.
</p>`

        default:
            let d = item._disabled
            return /*html*/`
<div data-id="${item._id}">
    ${item._hasDiscount && !d ? `<div class="descuento">${item.descuento}%</div>` : ""}

    <img src="https://www.droguerialaeconomia.com/economia/site/img/${item.id}.png" alt="" class="${_(d, "grey_img")}" />

    <div class="f1">

        <div class="titulo">${item.nombre2}</div>

        <div class="row">
            <div class="disponibles" ${d ? `style="background: #ec1616"` : ""} >${d ? "Producto Agotado" : `${item.stock} ${item.stock == 1 ? "Disponible " : "Disponibles"}`} </div>
            ${d ? 
            /*html*/`<button class="button-delete"><i class="fas fa-trash-alt" style="pointer-events: none;"></i> Remover</button>` :
            /*html*/`
            <!-- <div>${f(item._renderPrice)}</div> -->
            <div class="cantidad" data-pid="${item._id}">
                <i class="fas ${item._quanty == 1 ? "fa-trash-alt" : "fa-minus"}"></i>
                <input type="text" value="${item._quanty}" />
                <i class="fas fa-plus"></i>
            </div>
            <div class="precio ${item._hasDiscount || item._hasDiscountVlrMinimo ? "rojo" : ""}">${f(item._quanty * item._renderPrice)}</div>
            `}
        </div>

        ${_(item._newPrice, /*html*/`
        <div class="info">
            <span class="precio-antes"><i class="fas fa-exclamation-circle"></i> El precio anterior era <b>${f(item._newPrice)}</b></span>
        </div>`)}

        ${_(item._conditionalPrice, /*html*/`
        <div class="info">
            <span class="rojo"><i class="fas fa-info-circle"></i> El precio <b>${f(item.ahora)}</b> aplica si el monto de la compra es superior a ${f(item.VlrMinimo)}</span>
        </div>`)}

        ${_(item._cupon === true, /*html*/`<div class="no-aplica-cupon">No aplica para cupón de descuento</div>`)}

    </div>

</div>` 
    }
}

function showCartError(message) {
    showError($("#cart").find(".frm-error"), message)
}

async function initCart(products) {

    let fullProducts = await getProductsFullInfo(Arrayfy(products)),
       prod_found
    ;

    forEach(products, cart_item => {

        prod_found = false
        delete cart_item._flag

        forEach(fullProducts.stock, item => {
            
            if(cart_item._id != item.id) return

            prod_found = true
            if(cart_item._renderPrice != item.precio) {
                cart_item._flag = {precio: cart_item._renderPrice}
                cart_item.precio = item.precio
            }
            cart_item.stock = item.stock
            if(cart_item._quanty > item.stock) cart_item._quanty = item.stock
        })

        if(!prod_found) cart_item._flag = 0

        renderProductUpdate(cart_item._id)
    })

    store.cart = products
    cartCallback()
}

function cartCallback(autoclose) {
    write_cache("cart", store.cart)
    renderCart()
    if(typeof summaryCart == "function") summaryCart()
    if(autoclose) {  
        showCart(true)
        carttime = setTimeout(() => showCart(false), 2000)
    }
}

function showCart(show) {
    let $cart_cont = $("#cart-cont");
    showOverlay(show, {cb: () => showCart(false)})
    $cart_cont.css({transform: `translateX(${show ? "0" : "400"}px)`})

    $cart_cont.off("mouseenter").on("mouseenter", e => {
        clearTimeout(carttime)
    })
}

function shopNow($elem) {
    
    if(command($elem, true)) return
    
    if(store.location == "11001" && store.order.subtotal < 30000) {
        command($elem, false)
        return showCartError("El pedido mínimo sin incluir domicilio es: $30.000 pesos")
    }
    if(store.location != "11001" && store.order.subtotal < 15000) {
        command($elem, false)
        return showCartError("El pedido mínimo sin incluir domicilio es: $15.000 pesos")
    }
    
    if(!store.user.logged) {
        store.goOrder = true;
        command($elem, false) 
        showCart(false)
        showModal(true, 'signin')
    } else {
        // if(await showProductoEstrella(store.popups.pestrella)) {
        //     command($elem, false) 
        // } else parent.location = `${ABS_URL}/pedido`
        parent.location = `${ABS_URL}/pedido`
    }

}

