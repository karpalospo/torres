let redimir = false, p = {}, maxValue, minValue, range, format = wNumb({encoder: function( value ){return Math.ceil(value)}, thousand: '.', prefix: '$ '})
const maxDomiGratis = 99990
let productosTag = []

function page_init() {
    //if(!store.user.logged) parent.location = `${ABS_URL}`
    if(store.coupon) $("#txt-cupon").val(store.coupon.nombrecupon)
    getUserAddresses()

    initList($("#payment-list"), "payment", $("#paymentonline-list"), listCb)
    initList($("#paymentonline-list"), "payment", $("#payment-list"), listCb)

    // popups
    if(store.popups) showPagePopup(store.popups.order)
    
    let $scrollingDiv = $("#stickybox");
    let currentTop = parseInt($scrollingDiv.position().top)

    $(window).scroll(function(){
        if ($(window).scrollTop() > 0) $scrollingDiv.css({position: 'fixed', top: currentTop + 'px'})
        else $scrollingDiv.css({position: '', top:''})
    });


} 


// let lastKnownScrollPosition = 0;
// let ticking = false;

// function doSomething(scrollPos) {
//    console.log(scrollPos)
// }

// document.addEventListener("scroll", (event) => {

//     lastKnownScrollPosition = window.scrollY;

//     if (!ticking) {
//         window.requestAnimationFrame(() => {
//             doSomething(lastKnownScrollPosition);
//             ticking = false;
//         });

//         ticking = true;
//     } 
// });



function listCb($elem) {
    
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
    $("#sumario").html(`
<tr><td>Subtotal</td><td style="font-weight:500">${f(store.order.subtotal)}</td></tr>
${store.order.discount <= 0 ?
`<tr><td>Descuentos</td><td style="font-weight:500">${f(0)}</td></tr>`
:
`<tr><td>Descuentos</td><td class="rojo" style="font-weight:500">${f(store.order.discount * -1)}</td></tr>`
}
${redimir && puntos > 0 ?
`<tr><td>Puntos</td><td class="rojo" style="font-weight:500">${f(puntos * -1)}</td></tr>`
:
``
}
<tr><td>Domicilio</td><td style="font-weight:500">${store.order.subtotal > maxDomiGratis + store.order.discount ? `<span style="color:#ff2e2e">Gratis</span>` : f(store.order.shipping)}</td></tr>
<tr><td><b>A Pagar</b></td><td><b style="color:#222">${f(store.order.subtotal + (store.order.subtotal > maxDomiGratis ? 0 : store.order.shipping) - store.order.discount - (redimir ? puntos : 0))}</b></td></tr>`)
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

    if(res.data && res.data[0]) {
        pedido = res.data[0]
        resPSE = res.data[1]
    }

    if(!res.data.success) {
        if(res.message) showOrderError(res.message, $("<div></div>"))
    } else {

        resetCart()
        if(store.payment == "PSE") {
            return parent.location = resPSE.urlPayment
        } else {
            alert("redirjo a pedidos")
            //return parent.location = `${ABS_URL}/perfil/pedidos`
        }
    }
    command($button_order, false)


  

    
}


// ========================================================================== //
// COUPON

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

    if(!store.user.logged || coupon == "") return false;

    res = await API.POST.setCupon(store.user.nit, coupon.toLowerCase())

    if(!res.error && res.data.success === false) {
        store.couponOrder.Limite = true
        $input.removeClass("coupon-good").addClass("coupon-bad")
        return $output.removeClass("coupon-good-lbl").addClass("coupon-bad-lbl").html(`<p><i class="fas fa-times"></i> Ya alcanzó el limite de usos de este cupón</p>`)
    }

    res = await API.POST.getCupon(coupon, store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)

    if(res.error) return

    let error_cupon = false; 

    if(res.data.Success == false) {
        $input.addClass("coupon-bad")
        $output.addClass("coupon-bad-lbl").html(`<p><i class="fas fa-times"></i> ${res.data.Message}</p>`)
        store.couponOrder.Aplica = false
        error_cupon = true

    } else {

        let couponResponse = FormatCoupon(res.data[0]);

        store.couponOrder = res.data[0]
        store.couponOrder.Aplica = false

        if(couponResponse.type.toString() == "0" && store.order.subtotal < couponResponse.minAmount) {
            
            $output.addClass("coupon-bad-lbl").html(`<p><i class="fas fa-times"></i> El cupón ${couponResponse.name} solo es válido para compras mínimas de ${f(couponResponse.minAmount)}.`);
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
 
            const res2 = await API.POST.PerformValidateTypeOfCoupon(couponResponse.type, productos)

            if(res2.error) {
                $output.addClass("coupon-bad-lbl").html(`<p><i class="fas fa-times"></i> Este cupón no es válido para ser redimido. ${couponResponse.description}</p>`);
                error_cupon = true
            } else if (res2.data.ValorProductos < couponResponse.minAmount) {
                $output.addClass("coupon-bad-lbl").html(`<p><i class="fas fa-times"></i> El cupón ${couponResponse.name} solo es válido para compras mínimas de ${f(couponResponse.minAmount)}. ${couponResponse.description}.</p>`);
                error_cupon = true
            }
        }

        if(!error_cupon){
            confetti.toggle()
            setTimeout(() => confetti.toggle(), 3000)
            $input.addClass("coupon-good")
            $output.addClass("coupon-good-lbl").html(`<p><i class="fas fa-check"></i> Cupón aplicado con éxito</p>`)
            store.cuponDiscount = couponResponse.value
            store.couponOrder.Aplica = true
            renderCart()
            summaryCart()
        }
    }
}