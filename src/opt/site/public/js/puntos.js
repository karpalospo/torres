async function page_init() {
    
    //if(!store.user.logged) parent.location = `${ABS_URL}`


    initTabMenu($("#tabs-menu"), $("#tabs-cont"))

    let puntos, acumulados, redenciones, sumacu = 0, sumred = 0, s = "";
    //console.log(store.user)

    if((res = await API.POST.getPuntos(store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)).success == false) {
        alert("Esta página ya no está disponible para usted")
        parent.location = `${ABS_URL}`
        return
    }
    puntos = res.data[1].totalPuntos[0].totalPuntos;
    acumulados = res.data[1].acumulados || [];
    redenciones = res.data[1].redenciones || [];

    $("#puntos-lbl").html(`${f(puntos, "")}`)
    $("#plata-lbl").html(`${f(puntos)}`)

    // acumulados
    acumulados.forEach(item => {
        s += `<tr><td>${item.fecha.replace("T", " ")}</td><td class="title-case">${item.descripcion}</td><td class="tx-r"><b>${f(item.valor, "")}</b></td>`
        sumacu += item.valor
    })
    $("#movimientos-tbl").find("thead").html(`<tr><td style="width:120px">Fecha</td><td>Descripción</td><td style="width:90px" class="tx-r">Monto</td></tr>`)
    $("#movimientos-tbl").find("tbody").html(s)

    // redenciones
    s = ""
    redenciones.forEach(item => {
        if(item.tipoMovimiento == "Devolucion en compra") return
        s += `<tr><td>${item.fecha.replace("T", " ")}</td><td>${item.numero}</td><td>REDENCIÓN DE PUNTOS EN COMPRA</td><td class="tx-r"><b>${f(item.valor * -1, "")}</b></td>`
        sumred += item.valor * -1
    })
    $("#redenciones-tbl").find("thead").html(`<tr><td style="width:120px">Fecha</td><td>Número</td><td>Descripción</td><td style="width:90px" class="tx-r">Monto</td></tr>`)
    $("#redenciones-tbl").find("tbody").html(s)

    $("#ahorro-lbl").html(f(sumred))
    $("#conseguidos-lbl").html(f(sumacu, ""))
    $("#canjeados-lbl").html(f(sumred, ""))

    
}




