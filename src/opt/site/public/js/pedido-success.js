let orders = {}

function page_init() {
    console.log("aja", id)
    renderCurrentOrders(id)
}

async function renderCurrentOrders(pedidoID) {

    let ordersToRender = [], updateOrder = true, currentNumero;
    let currentOrders = [], uniqueOrders = [];

    if(!pedidoID) return 

    uniqueOrders.push(pedidoID)

    await Promise.all(uniqueOrders.map(async (key) => {

        let res2 = await API.POST.getPedido(key, store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)

        if(!res2.error && res2.data.length > 0) {
            currentOrders.push({id: res2.data[0].numero, status: res2.data[0].Estado, items:res2.data, payment: res2.data[0].tipoPago})
        }
    }));
    ordersToRender = sortByKey(currentOrders.slice(0, 10), "id", "desc")
    
    
    ordersToRender.forEach(order => {
        
        if(!order.items || order.items.success == false) return

        order.items.forEach(item => {
            currentNumero = item.numero
            if(!orders[item.numero]) orders[item.numero] = {
                numero: item.numero,
                direccion: item.direccion,
                fecha: item.fecha,
                telefono: item.telefonoTraza,
                formaPago: item.formaPago,
                estado: item.Estado,
                nombre: item.nombres,
                ciudad: item.descripcionCiudad,
                subtotal: item.total,
                descuento: item.ValorCupon + item.ValorBono,
                items: []
            }
            if(item.codigo == "999992") {
                orders[item.numero].domicilio = item.vlr_total
                orders[item.numero].subtotal -= item.vlr_total
            } else {
                orders[item.numero].items.push(
                    {
                        id: item.codigo,
                        cantidad: Math.ceil(item.cantidad / parseInt(item.idunidad)),
                        nombre: item.descripcion,
                        descuento: item.descuento,
                        total: item.vlr_total,
                        unitario: Math.ceil(item.vlr_unitario * item.cantidad)
                    }
                )
            }

        })

        renderSummary(orders[currentNumero])
        
        // reset values
        store.couponOrder = {}
        store.payment = store.address = store.bonus = undefined
        store.cuponDiscount = store.bonusDiscount = 0
        write_cache("coupon")


    })
    
}


function renderSummary(d) {

    let fPagos = {
        "" : "--",
        "11": "Efectivo",
        "73": "Datáfono",
        "53": "TCO",
        "23": "PSE"
    }, estados = {
        "P": {text: "PEDIDO ACEPTADO", color: "rgb(22, 190, 22)", icon: "fa-check-circle"},
        "A": {text: "PEDIDO PARA FACTURAR", color: "rgb(22, 190, 22)", icon: "fa-check-circle"},
        "F": {text: "PEDIDO FACTURADO", color: "rgb(22, 190, 22)", icon: "fa-check-circle"},
        "R": {text: "PEDIDO ANULADO", color: "rgb(190, 22, 22)", icon: "fa-times-circle"},
    }

    //$("#calificacion-preguntas").data("pedido", d.numero)

    $("#items-list").html(renderItems(d.items))

    $("#datos-cliente").html(/*html*/`
<div style="padding:20px">
    <h3 style="margin-top: 0; color: #222; text-align: center"><b>PEDIDO N° ${d.numero}</b></h3>
    <div class="label">Fecha y Hora</div><b>${new Date(d.fecha).toLocaleString('es-CO', {timeZone: 'Etc/GMT'})}</b>
    <div class="label">Nombre</div><b>${d.nombre}</b>
    <div class="label">Dirección</div><b>${d.direccion}<br>${d.ciudad}</b>
    <div class="dashed-line"></div>
    <table class="tables tx-right">
        <tr><td>Subtotal</td><td><b>${f(d.subtotal + d.descuento)}</b></td></tr>
        <tr><td>Cupones o Bonos</td><td style="color: #ff402c;">${f(d.descuento * -1)}</td></tr>
        <tr><td>Domicilio</td><td><b>${f(d.domicilio)}</b></td></tr>
        <tr><td>Forma de Pago</td><td><b>${isNaN(d.formaPago) ? d.formaPago : fPagos[d.formaPago]}</b></td></tr>
        <tr><td style="font-size:1.3em">Total:</td><td style="font-size:1.3em"><b class="rojo">${f(d.subtotal + d.domicilio)}</b></td></tr>    
    </table>
    <div class="dashed-line"></div>
    <h3 style="margin-bottom: 0"><b>MÁS INFORMACIÓN</b></h3>
    <div id="masinfo">
        <div class="label">Fijo</div><b>${d.telefono}</b>
        <div class="label">Celular</div><b>315-7823477</b>
    </div>
    <br>
    <p style="text-align:center"><button class="page-button" onclick="rebuy('${d.numero}')">REPETIR PEDIDO</button></p>

</div>`)

    $(".resultado").css("background-color", estados[d.estado].color).html(/*html*/`
<div class="row r-c">
    <i class="fas ${estados[d.estado].icon}" style="font-size: 2em; padding: 15px 0;"></i>
    &nbsp;&nbsp; ${estados[d.estado].text}
</div>`)

}


function renderItems(items) {

    let ret = ""
    forEach(items, item => {
        if(item.codigo == "999992") return
        if(item.descuento > 0) item._hasDiscount = true
        ret += renderCartItem(item, "order")
    })
    return ret
}


async function rebuy(order_id) {
    if(orders[order_id]) {

        let fullinfo = []
        fullinfo = orders[order_id].items.map(item => ({id: item.id}))

        await showProducts($("<div></div>"), fullinfo, "rebuy")
        orders[order_id].items.forEach(item => {
            if(getProduct(item.id)) setCart(item.id, {value: 1})
        })
    }
}

let survey = {
    "info": {},
    "experiencia": {value: -1, feedback: "", title: "¿Cómo fue tu experiencia de compra?", left:"Mala", right: "Excelente", low: 3, placeholder: "¿En qué quieres que mejoremos?"},
    "velocidad": {value: -1, title: "¿Cómo valoras la velocidad del sitio?", left:"Lento", right: "Rápido", low: 4},
    "productos": {value: -1, feedback: "", title: "¿Encontraste los productos que buscabas?", left:"Ninguno", right: "Todos", low: 4, placeholder: "¿Cuáles productos no encontraste?"},
    "recomendar": {value: -1, feedback: "", title: "¿Le recomendarías comprar en Droguería La Economía a un(a) amigo(a) o familiar?", left:"No", right: "Si", low: 3, placeholder: "¿En qué podemos mejorar?"}
}

function showSurvey() {

    $("#calificacion-preguntas").find("> div").each(function (){renderSurvey($(this), this.dataset.key)})

    let $estrellas = $(".estrellas")

    $estrellas.on("mouseenter", "i", function(e){
        let $parent = $(e.currentTarget).parent(),
            $elem = $parent.find("i"),
            value = $elem.index($(this))
        ;
        $parent.css("opacity", "0.8")
        fillStars($elem, value)
    })

    $estrellas.on("mouseleave", "i", function(e){
        let $parent = $(e.currentTarget).parent()
        $parent.css("opacity", "1")
        fillStars($parent.find("i"), survey[$parent.data("key")].value)
    })

    $estrellas.on("click", "i", function(e){
        let $parent = $(e.currentTarget).parent(),
            $elem = $parent.find("i"),
            value = $elem.index($(this))
            item = survey[$parent.data("key")]
        ;
        animateCSS(this, "rubberBand", "faster")
        if(value >= 0) item.value = value
        if(value < item.low) $parent.parent().parent().find("textarea").show(100)
        else $parent.parent().parent().find("textarea").hide(100)
    })

    showModal(true, $("#calificacion"))
}

function fillStars($target, value) {
    $target.each(function(index){
        if(index <= value) $(this).removeClass("far").addClass("fas")
        else $(this).removeClass("fas").addClass("far")
    })
}

function renderSurvey($target, key) {
    let d = survey[key]
    survey.info = {}
    d.value = -1
    $target.html(`
<div class="pregunta">${d.title}</div>
<div class="row row-middle row-center">
    <div style="width:80px; text-align:right">${d.left}</div>
    <div class="estrellas" data-key="${key}"><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></div>
    <div style="width:80px">${d.right}</div>
</div>
${d.feedback != undefined ? `
<textarea style="display:none" rows="2" placeholder="${d.placeholder}"></textarea>
` : ``}
<br><br>
    `)
}

function sendSurvey() {

    let cancel = false,
        data = {}
    ;

    $("#calificacion-preguntas").find("> div").each(function (){
        
        let d = survey[this.dataset.key],
            $textarea = $(this).find("textarea")
        ;

        if(d.value < 0) {
            cancel = true
            animateCSS(this, "flash")
        } else {
            data[this.dataset.key] = {value: d.value + 1, feedback: $textarea.length > 0 ? $textarea.val().trim() : ""}
        }
    })

    const fecha = new Date()
    

    if(!cancel) {
        if(store.user.logged) {
            API.POST.setEncuesta(store.user.nit, $("#calificacion-preguntas").data("pedido") || 1, fecha.toISOString().split('T')[0], JSON.stringify(data))
        }
        
        showModal(true, $("#calificacion-gracias"))
    } else {
        $("#calificacion-preguntas").parent().find("p.rojo").show(200).delay(1000).hide(200)
    }
}


