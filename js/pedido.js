let redimir = false, p = {}, maxValue, minValue, range, format = wNumb({encoder: function( value ){return Math.ceil(value)}, thousand: '.', prefix: '$ '})
const maxDomiGratis = 1
let productosTag = []
let resAddress;

async function page_init() {
    
    //if(!store.user.logged) return parent.location = `index.html`

    if(store.coupon) $("#txt-cupon").val(store.coupon.nombrecupon)

    if((resAddress = getUserAddresses($("#address-list"))) === false) {
        showModalMessage("error-login", {
            label:"INICIAR SESIÓN",
            title: "Error de Sesión",
            callback: () => {showModal(true, 'signin')},
            closeCallback: () => {showModal(true, 'signin')
        }})
        //pLog("logout", {noRedirect: true})
        if(typeof showOrderError == "function") showOrderError("Hay un problema de sesión que no permite continuar", $("<div></div>"), true)

    } else {

        if(typeof showOrderError == "function") showOrderError("", $("<div></div>")) // remover error

        initList($("#address-list"), "address")
        initList($("#payment-list"), "payment", checkPse)

        stickyScroll($("#stickybox"), $(".trackrail"), 20) 

        store.address = undefined

    }

    // popups
    if(store.popups) showPagePopup(store.popups.order)

} 

function checkPse($elem){

    if($elem.data("value") == "PSE") $("#button-order").text("PAGAR AHORA")
    else $("#button-order").text("CONFIRMAR PEDIDO")

    let day = store.day;

    if(store.payment == "TCO" && day == 4) {
        $("#TCO-alert").show(200)
    } else {
        $("#TCO-alert").hide(200)
    }
}


let $button_order = $("#button-order"),
    $lblTotal = $("#lbl-total"),
    $order = $("#order2"),
    $input = $("#txt-cupon")
;

$input.on("keyup", e => {
    if(e.keyCode == 13) redeemCoupon()
})
$input.on("input", () => resetCoupon())
$input.on("change", () => resetCoupon())


function summaryCart(_buscarBono = true) {
    
    let puntos = 0
    
    if(range) puntos = format.from(range.get())

    $("#sumario").html(/*html*/`
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
    <td style="font-weight:500">${store.order.subtotal > maxDomiGratis + store.order.discount ? `<span style="color:#ff2e2e">Gratis</span>` : f(store.order.shipping)}</td>
</tr>
<tr>
    <td><b>A Pagar</b></td><td><b style="color:#222">${f(store.order.subtotal + (store.order.subtotal > maxDomiGratis ? 0 : store.order.shipping) - store.order.discount - (redimir ? puntos : 0))}</b></td>
</tr>`)
    
    $("#confirmar").show(0)
}

function showOrderError(message, $flash_target, permanent = false) {
    showError($order.find(".frm-error"), message, permanent)
    command($button_order, false)
}

async function checkout() {

    if(command($button_order, true)) return
    
    // validaciones
    if(!store.user.logged) return
    let min = store.order.subtotal - store.order.discount
    if(store.location == "11001" && min < 30000) return showOrderError("El pedido mínimo sin incluir domicilio es: $30.000 pesos")
    if(store.location != "11001" && min < 15000) return showOrderError("El pedido mínimo sin incluir domicilio es: $15.000 pesos")
    if($("#txt-cupon").val() != "" && store.couponOrder.Aplica == undefined) return showOrderError("Tiene un cupón sin aplicar. Presione el botón APLICAR", $("#txt-cupon"))
    if(!store.payment) return showOrderError("Seleccione una forma de pago", $("#forma-pago"))
    if(!store.address) return showOrderError("Seleccione una dirección de entrega", $("#address-list"))

    let fPagos = {
        "Efectivo": 11,
        "Datáfono": 73,
        "TCO": 53,
        "PSE": 23
    }

    let day = moment().day()

    let productos = [
        {
            codigo: "999992", 
            descripcion: "domicilio", 
            price: store.order.subtotal > maxDomiGratis + store.order.discount ? 0.01 : store.order.shipping,
            stock:1,
            idOferta:0,
            cantidad: 1,
            descuento:0,
            idUnidad:1
        }
    ]

    calculateCart().forEach(product => {
        productos.push({
            codigo: product.item.id,
            descripcion: product.item.nombre,
            price: product.price,
            stock: product.item.stock,
            idUnidad: product.item.IdUnidad,
            cantidad: product.item._quanty,
            descuento: product.item.descuento,
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

    let bono = {aplica: false};
    if(store.bonus) {
        if(store.bonus.usar) {
            bono.Aplica = true
            bono.Id = store.bonus.bonus.Id
            bono.VlrBono = store.bonus.bonus.VlrBono
        }
    }

    let puntos = {aplica: false}
    if(redimir) {
        puntos = {ValorPuntos:format.from(range.get()), aplica: true}
    }

    const senddata = {
        formaDePago: fPagos[store.payment], 
        tipoPago:store.payment == "PSE" ? "OnLine" : "ContraEntrega", 
        direccion:store.address, 
        drogueria:store.location, 
        vlrDomicilio:0, 
        ciudad: store.location, 
        nombreCiudad:store.city, 
        subtotal:store.order.subtotal - store.order.discount, 
        id_Servicio: "WebDesktop", 
        nota: $("#nota-pedido").val() + ` -- Forma de pago: ${store.payment}`,
        bono,
        cliente: {nit: store.user.nit, nombres: store.user.nombres, email: store.user.email, auth_token: store.user.auth_token},
        cupon: store.couponOrder && store.couponOrder.Aplica ? store.couponOrder : {aplica: false},
        productos:productos
    }

    res = await API.POST.checkout(senddata)

    let pedido, resPSE;
    if(res.data && res.data[0]) {
        pedido = res.data[0]
        resPSE = res.data[1]
    }

    if(pedido && pedido.numeroPedido) {
        resetCart()
        if(store.payment == "PSE") return parent.location = resPSE.urlPayment
        else return parent.location = `pedido-success.html?p=` + pedido.numeroPedido
    } else if(res.message) showOrderError(res.message, $("<div></div>"))

    command($button_order, false)

}


// ========================================================================== //
// COUPON

function resetCoupon(mustRenderCart = true) {
    let $input = $('#txt-cupon'), $output = $("#lbl-coupon")
    $input.removeClass("coupon-good")
    $input.removeClass("coupon-bad")
    $output.removeClass("coupon-good-lbl").html("")
    $output.removeClass("coupon-bad-lbl").html("")
    store.cuponDiscount = 0
    if(mustRenderCart) {
        renderCart()
        if(typeof summaryCart == "function") summaryCart()
    }
}



function clearCoupon() {
    store.coupon = null;
    write_cache("coupon")
    renderCart();
}

function FormatCoupon(coupon) {
    return {
        type: coupon.Condicion,
        description: coupon.Descripcion,
        startDate: coupon.Desde,
        endDate: coupon.Hasta,
        name: coupon.NombreCupon,
        strType: coupon.TipoCupon,
        value: coupon.ValorCupon,
        minAmount: coupon.VlrMinimo,
    } 
}

async function redeemCoupon() {
    
    let $output = $("#lbl-coupon"), coupon = $input.val().trim();
    showResultMessage($output) // clear

    if(!store.user.logged || coupon == "") return false;

    res = await API.POST.getCupon(coupon, store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)

    if(res.error) return

    let error_cupon = false; 

    if(res.data.Success == false) {
        showResultMessage($output, false, res.data.Message)
        store.couponOrder.Aplica = false
        error_cupon = true

    } else {

        let couponResponse = FormatCoupon(res.data[0]);

        store.couponOrder = res.data[0]
        store.couponOrder.Aplica = false

        if(couponResponse.type.toString() == "0" && store.order.subtotal < couponResponse.minAmount) {
            
            showResultMessage($output, false, `El cupón ${couponResponse.name} solo es válido para compras mínimas de ${f(couponResponse.minAmount)}.`)
            error_cupon = true

        } else if(couponResponse.type.toString() !== "0"){

            let productos = []
      
            calculateCart().forEach(product => {
                productos.push({
                    codigo: product.item.id,
                    descripcion: product.item.nombre,
                    price: product.price,
                    stock: product.item.stock,
                    IdUnidad: product.item.IdUnidad,
                    cantidad: product.item._quanty,
                    descuento: product.item.descuento,
                    idoferta: product.item.idoferta != undefined ? product.item.idoferta : 0
                })
            })
 
            const res2 = await API.POST.validarCupon(couponResponse.type, productos)

            if(res2.error) {
                showResultMessage($output, false, `Este cupón no es válido para ser redimido. ${couponResponse.description}`)
                error_cupon = true
            } else if (res2.data.ValorProductos < couponResponse.minAmount) {
                showResultMessage($output, false, `El cupón ${couponResponse.name} solo es válido para compras mínimas de ${f(couponResponse.minAmount)}. ${couponResponse.description}`)
                error_cupon = true
            }
        }

        if(!error_cupon){
            //confetti.toggle()
            //setTimeout(() => confetti.toggle(), 3000)
            showResultMessage($output, true, `Cupón aplicado con éxito`)
            store.cuponDiscount = couponResponse.value
            store.couponOrder.Aplica = true
            renderCart()
            summaryCart()
        }
    }
}