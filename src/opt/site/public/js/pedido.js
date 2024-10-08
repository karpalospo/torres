let redimir = false, 
    p = {}, 
    maxValue, 
    minValue, 
    range,
    range2,
    format = wNumb({encoder: function( value ){return Math.ceil(value)}, thousand: '.', prefix: '$ '}),
    productosTag = [],
    resAddress
;

let $button_order = $("#button-order, #button-order2"),
    $lblTotal = $("#lbl-total"),
    $order = $("#order2"),
    $input = $("#txt-cupon")
;

async function page_init() {

    if(!store.user.logged) $("#button-order").hide()

    if(store.coupon) $("#txt-cupon").val(store.coupon.NombreCupon)

    if((resAddress = getUserAddresses($("#address-list"))) === false) {
        showModalMessage("error-login", {
            label:"INICIAR SESIÓN",
            title: "Error de Sesión",
            callback: () => {showModal(true, 'signin')},
            closeCallback: () => {showModal(true, 'signin')
        }})
        if(typeof showOrderError == "function") showOrderError("Hay un problema de sesión que no permite continuar", true)

    } else {

        if(typeof showOrderError == "function") showOrderError("") 

        initList($("#payment-list"), "payment", checkPse)

        stickyScroll($("#stickybox"), $(".trackrail"), 20) 
        store.address = undefined


    }

    // popups
    if(store.popups) showPagePopup(store.popups.order)

} 

function checkPse($elem){

    let day = moment().day()

    if($elem.data("value") == "PSE") $("#button-order").text("PAGAR AHORA")
    else $("#button-order").text("CONFIRMAR PEDIDO")

    if(store.payment == "TCO" && day == 4) {
        $("#TCO-alert").show(200)
    } else {
        $("#TCO-alert").hide(200)
    }
}


function summaryCart(bono = true) {
    
    let puntos = 0
    if(bono) buscarBono()
    if(bono) initPuntos()
    
    if(range && device == "DESKTOP") puntos = format.from(range.get())
    if(range2 && device == "PHONE") puntos = format.from(range2.get())

    $("#sumario, #sumario2").html(/*html*/`
<tr>
    <td>Subtotal</td><td style="font-weight:500">${f(store.order.subtotal)}</td>
</tr>
<tr>
    <td>Descuentos</td>
    ${store.order.discount <= 0 ? `<td style="font-weight:500">${f(0)}</td>` : `<td class="rojo" style="font-weight:500">${f(store.order.discount * -1)}</td>`}
</tr>
${redimir && puntos > 0 ? `<tr><td>Puntos</td><td class="rojo" style="font-weight:500">${f(puntos * -1)}</td></tr>` : ``}
<tr>
    <td>Domicilio</td>
    <td style="font-weight:500">${f(store.order.shipping)}</td>
</tr>
<tr>
    <td><b>A Pagar</b></td><td><b style="color:#222">${f(store.order.subtotal - store.order.discount - (redimir ? puntos : 0) + store.order.shipping)}</b></td>
</tr>`)
    
    $("#confirmar, #confirmar2").show(0)

}

function showOrderError(message, permanent = false) {
    showError($order.find(".frm-error"), message, permanent)
    command($button_order, false)
}

async function initPuntos() {

    res = await API.getPuntos(store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)

    if(res.data.success != false) {
        p = res.data[0]
        store.user.puntos = p
        max = Math.floor(store.order.subtotal * (p.porcentajeEquivalenteVenta / 100))
        maxValue = Math.min(
            max - max % 1000,
            p.maximoRedencionTransaccion, 
            p.puntos - p.puntos % 1000
        )
        minValue = parseInt(p.minimoRedencion)
    }

    if(Object.keys(p).length > 0 && p.puntos) {
      

        if(p.puntos < p.minimoRedencion) {
            $(".label-puntos").html(`<p>Tienes <b>${f(store.user.puntos.puntos, "")}</b> puntos equivalentes a ${f(store.user.puntos.puntos)} pesos para redimir en esta compra, pero el monto mínimo de redención es <b>$5.000</b>. <br><br>¡Sigue acumulando puntos en cada compra que realices!</p>`)
            $("#redimir, #redimir2").hide();
            $("#puntos2, #puntos3").show()
            return;
        }

        $("#puntos2, #puntos3").show()
        $(".label-puntos").html(`<p style="margin-top: 0px;font-size: 0.85em;color: #555;">Actualmente tienes <b>${f(store.user.puntos.puntos, "")}</b> puntos equivalentes a ${f(store.user.puntos.puntos)} pesos para redimir en esta compra.</p>`)
        
        if(!range) {
            
            range = noUiSlider.create($("#range")[0], {
                start: 0,
                connect: 'lower',
                range: {'min': 0, 'max': maxValue},
                step: 1000,
                format,
            });

            range.on('update', function (values) {
                $("#lbl-puntos").html(`<b>${values[0]}</b>`)
                if(format.from(values[0]) >= 5000) redimir = true
                else redimir = false
                summaryCart(false)
            });
        }

        if(!range2) {
            range2 = noUiSlider.create($("#range2")[0], {
                start: 0,
                connect: 'lower',
                range: {'min': 0, 'max': maxValue},
                step: 1000,
                format,
            });

            range2.on('update', function (values) {
                $("#lbl-puntos2").html(`<b>${values[0]}</b>`)
                if(format.from(values[0]) >= 5000) redimir = true
                else redimir = false
                summaryCart(false)
            });
        }


        summaryCart(false)
    }
}



// ========================================================================== //
// BONO

async function buscarBono() {

    if(!store.user.nit) return

    store.bonusDiscount = 0

    if(store.bono == undefined) {
        if((res = await API.getBono(store.user.nit)).error) return alert("Error al consultar el bono.")
        if(res.data && res.data.length > 0) await validarBono(res.data[0])
    } else {
        await validarBono()
    }
}

async function validarBono(bono) {

    let tempBono = bono != undefined ? bono : store.bono
    tempBono.valido = false
console.log(tempBono)
    if(tempBono && tempBono.Condicion == 0 && (tempBono.EsPorcentaje == "N" || tempBono.EsPorcentaje == 0) && (tempBono.VlrMinimoCompra <= store.order.subtotal))  {
        tempBono.valido = true
        console.log("SI")
    } else if(tempBono.VlrMinimoCompra <= store.order.subtotal) {
        if(!(res = await API.verificarBono(tempBono, calculateCart().map(prod => ({codigo: prod.item.id})))).error) tempBono.valido = true
        console.log("PASO 2")
    }
    
    store.bono = tempBono
    renderBono()
}

function renderBono() {
    
    let $target = $("#bono")
  console.log(store.bono.valido, "->", store.bonusDiscount)
    if(store.bono != undefined) {

        $target.html(/*html*/`
<div style="position: absolute; top:1px; left:12px;font-size: 1.3em;"><i class="fas fa-cut"></i></div>
<div class="fx">
${store.bono.valido ?
`<p>Tienes un bono de <b>${f(store.bono.VlrBono)}</b>
para una compra igual o superior a <b>${f(store.bono.VlrMinimoCompra)}</b></p>
<button onclick="aplicarBono()">${store.bonusDiscount > 0 ? "DESACTIVAR" : "ACTIVAR"}</button>`
:
`<p>Tiene un bono de <b>${f(store.bono.VlrBono)}</b> disponible pero no cumple las condiciones para aplicarlo. <p style="text-decoration: underline; margin-bottom: 0; cursor:pointer" onclick="showModal(true, 'bono-condiciones')">Ver Condiciones</p></p>`
}
</p></div>`)

        $("#bono-card").show(0) 

    } else {
        $("#bono-card").hide(0)
    }


    if(!store.bono.valido) $target.addClass("inactivo")
    else $target.removeClass("inactivo")


    $("#bono-condiciones").find(".float-content").html(/*html*/`
${store.bono.Condicion != 0 ?
`<p><i class="fas fa-check"></i> ${store.bono.Descripcion}</p>`
:
`<p><i class="fas fa-check"></i> Aplica para todas las categorias.</p>`
}
<p>
    <i class="fas fa-check"></i> Válido desde <b>${moment(store.bono.FchRdnDesde).format("MMMM DD YYYY, h:mm:ss a")}
    </b> hasta <b>${moment(store.bono.FchRdnHasta).format("MMMM DD YYYY, h:mm:ss a")}</b>.
</p>
<p>
    Descuento a aplicar: <b>${f(store.bono.VlrBono)}</b><br>
    Mínimo monto de compra: <b>${f(store.bono.VlrMinimoCompra)}</b>
</p>`)
}

function aplicarBono() {
    if(store.bonusDiscount > 0) store.bonusDiscount = 0;
    else store.bonusDiscount = store.bono.VlrBono;
    renderBono()
    renderCart()
    if(typeof summaryCart == "function") summaryCart(false)
}

// ========================================================================== //
// CHECKOUT

async function checkout() {

    if(command($button_order, true)) return
    
    // validaciones
    if(!store.user.logged) return
    let min = store.order.subtotal - store.order.discount
    if(store.location == "11001" && min < 30000) return showOrderError("El pedido mínimo sin incluir domicilio es: $30.000 pesos")
    if(store.location != "11001" && min < 30000) return showOrderError("El pedido mínimo sin incluir domicilio es: $30.000 pesos")
    if($("#txt-cupon").val() != "" && !store.order.cupon) return showOrderError("Tiene un cupón sin aplicar. Presione el botón APLICAR")
    if(!store.payment) return showOrderError("Seleccione una forma de pago")
    if(!store.address) return showOrderError("Seleccione una dirección de entrega")

    let bono = {aplica: false},
        cupon = {aplica: false},
        puntos = {aplica: false},
        productos = [{
            codigo: "999992", 
            descripcion: "domicilio", 
            price: store.order.shipping,
            stock:1,
            idOferta:0,
            cantidad: 1,
            descuento:0,
            idUnidad:1
        }],
        fPagos = {
            "Efectivo": 11,
            "Datáfono": 73,
            "TCO": 53,
            "PSE": 23
        }
    ;
    productosTag = [],

    calculateCart().forEach(product => {
        productos.push({
            codigo: product.item.id,
            descripcion: product.item.nombre,
            price: product.price,
            stock: product.item.stock,
            idUnidad: product.item.IdUnidad,
            cantidad: product.item._quanty,
            descuento: product.item.descuento,
            beneficio: product.item.beneficio,
            idOferta: product.item.idoferta != undefined ? product.item.idoferta : 0
        })

        productosTag.push({
            item_id: product.item.id,
            item_name: product.item.nombre,
            discount: product.item.descuento,
            price: product.price,
            currency: 'COP',
            quantity: product.item._quanty
        })
    })

    if(store.bono != undefined) {
        if(store.bonusDiscount) {
            bono.aplica = true
            bono.idBono = store.bono.Id
            bono.vlrBono = store.bono.VlrBono
        }
    }

    if(store.order.cupon) {
        cupon = store.order.cupon
        cupon.aplica = true
    }

    if(redimir && device == "DESKTOP") {
        puntos = {valorPuntos:format.from(range.get()), aplica: true}
    }

    if(redimir && device == "PHONE") {
        puntos = {valorPuntos:format.from(range2.get()), aplica: true}
    }

    const senddata = {
        formaPago: fPagos[store.payment],
        tipoPago:store.payment == "PSE" ? "OnLine" : "ContraEntrega",
        direccion:store.address,
        drogueria:store.location,
        vlrDomicilio:0,
        ciudad: store.location, 
        nombreCiudad:store.cc.Descripcion, 
        subtotal:store.order.subtotal - store.order.discount + store.order.shipping,
        id_Servicio: "WebDesktop", 
        nota: $("#nota-pedido").val() + ` -- Forma de pago: ${store.payment}`,
        bono,
        cupon,
        puntos,
        email: store.user.email,
        auth_token: store.user.auth_token,
        cliente: {nit: store.user.nit, nombres: store.user.nombres, email: store.user.email, auth_token: store.user.auth_token},
        productos
    }



    res = await API.checkout(senddata)

    let pedido, resPSE;
    if(res.data && res.data[0]) {
        pedido = res.data[0]
        resPSE = res.data[1]
    }

    
    if(pedido && pedido.numeroPedido) {

        dataLayer.push({
            event: 'purchase',
            currency: 'COP',
            items: productosTag,
            transaction_id: pedido.numeroPedido,
            shipping: store.order.shipping,
            value: store.order.subtotal - store.order.discount + store.order.shipping,
        });

        
        resetCart()
        if(store.payment == "PSE") return parent.location = resPSE.urlPayment
        else return parent.location = `${ABS_URL}/pedido-success/${pedido.numeroPedido}`

    } else if(res.message) showOrderError(res.message)

    command($button_order, false)

}

$input.on("keyup", e => {
    if(e.keyCode == 13) redimirCupon()
})
$input.on("input", () => borrarCupon())
$input.on("change", () => borrarCupon())