let timeout,
    timeout2,
    menuShown
;

// listeners
$('#txt-search').on("keyup", e => {if(e.code == "Enter" || e.code == "NumpadEnter") {search(e.currentTarget.value)}})
$(".btn-search").on("click", e => search($('#txt-search').val()))

// usuario
store.user = load_cache("user")
renderUser()

// location
store.location = "08001"
if((res = load_cache("location")).id) store.location = res.id

// carrito
initCart(load_cache("cart"))

for(let i = 0; i <= 16; i++) {
    $("#medida").append(`<div class="product-item"><div class="item"><div class="image"></div><div class="info"></div></div></div>`)
}

renderCategorias(store.location)

$("#modals-cont").load(`${ABS_URL}/modals.html`, async function() {

    await renderCiudades()
    await renderCupones()

    resize()

    if(typeof page_init == "function") page_init()

});

async function renderCategorias(ciudad) {

    let s = "", $target = $("#categories");

    if(!(res = await API.POST.getCategories(ciudad)).error) {
        if(!Array.isArray(res.data) || res.data.length == 0) return
        res.data.splice(3, 0, {IdGrupo: '99', Grupo: 'Cuidado del Bebé', Categorias: []})
        res.data.forEach(item => {
            store.grupos[item.IdGrupo] = item
            item.Categorias.forEach(cat => {
                store.categorias[cat.IdCategoria] = {id: cat.IdCategoria, title: cat.Categoria, subs: {}}
                if(cat.Subcategorias) cat.Subcategorias.forEach(sub => store.categorias[cat.IdCategoria].subs[sub.IdSubcategoria] = {id: sub.IdSubcategoria, title: sub.Subcategoria})
            })
            
            s += `<div data-id="${item.IdGrupo}">${item.Grupo}</div>`
        })
        store.grupos["99"].Categorias = store.grupos["02"].Categorias[0].Subcategorias.map(item => ({IdCategoria: item.IdSubcategoria, Categoria: item.Subcategoria}))
    }

    $target.html(s)

    let $menuitems = $target.find("> div")
    $menuitems.off("mouseenter").on("mouseenter", e => showDropMenu($(e.currentTarget), true))
    $menuitems.off("mouseleave").on("mouseleave", e => showDropMenu($(e.currentTarget), false))

    //showDropMenu($target.find("> div").eq(5), true)
}

async function renderCiudades() {
    let s = ""

    if(!(res = await API.POST.getCiudades()).error) {
        forEach(sortByKey((store.centrocostos = res.data), "Descripcion"), item => {
            if(item.Ciudad == store.location) {
                store.cc = item
                store.order = {shipping: item.valor_domicilio}
                $("#lbl-ciudad").html(item.Descripcion.toLowerCase())
                s += `<option selected value="${item.Ciudad}">${item.Descripcion}</option>`
            } else s += `<option value="${item.Ciudad}">${item.Descripcion}</option>`
        })
        $("#ciudades-list").html(s)
    }

    $("#user-ubicacion").off("mouseover").on("mouseover", function(e){
        let $elem = $(e.currentTarget);
        timeout2 = setTimeout(() => showCtxMenu(document.querySelector("#menu-ubicacion"), $elem.offset().left + 30, $elem.offset().top + $elem.outerHeight() - 1), 200);
    })

    $("#user-ubicacion").off("mouseout").on("mouseout", function(e){
        clearTimeout(timeout2)
    })

}

function renderUser() {

    if(store.user.logged) {
        if(!store.user.nombres) return
        let nombre = store.user.nombres.split(" ")[0].toUpperCase()
        $("#lbl-nombre").html(nombre.toLowerCase())
    } else {
        $("#lbl-nombre").html("Ingresar")
    }

    $("#user-btn").off("mouseover").on("mouseover", function(e){
        let $elem = $(e.currentTarget);
        timeout2 = setTimeout(() => showCtxMenu(store.user.logged ? document.querySelector("#menu-logged") : document.querySelector("#menu-unlogged"), $elem.offset().left, $elem.offset().top + $elem.outerHeight() - 1), 200);
    })

    $("#user-btn").off("mouseout").on("mouseout", function(e){
        clearTimeout(timeout2)
    })

}

async function renderCupones() {

    let $target = $("#cupones-list")
    if(!store.user.logged) { 
        return $target.html(/*html*/`
<p style="font-size:1.3em; text-align: center">
<i class="big-font fas fa-exclamation-circle"></i><br>
Para ver los cupones de descuento disponibles debes iniciar sesión
</p><br/><br/>
<p class="tx-center">
    <button class="page-button" onclick="showModal(true, 'signin')">INICIAR SESIÓN</button>
</div><br/><br/>
<p class="tx-center">
    <button class="page-button-flat2" onclick="parent.location = '/registro'">¡No tengo cuenta! Registrarme</button>
</p>`)
    }

    res = await API.POST.getCupones(store.user.nit)
    if(!res.error && res.Success) {
        store.cupones = res.data
    } else {
        store.cupones = []
    }
    
    if(store.cupones.length == 0) {
        return $target.html(/*html*/`<p style="font-size:1.3em; text-align: center"><i class="big-font fas fa-exclamation-circle"></i><br>En estos momentos no tenemos cupones disponibles para ti</p>`)
    }

    s = ""
    forEach(store.cupones, item => {
        couponCondicion(item)
        s += /*html*/`
<div class="cupon" data-id="${item.idCupon}">
    <div>
        <div class="cupon-title">${item.nombreCupon}</div>
        <div class="value">${f(item.valorCupon)}</div>
    </div>
    <div>
        <div class="info">
            &#10004; <b>${f(item.valorCupon)}</b> de descuento para compras mínimas de <b>${f(item.vlrMinimo)}</b><br>
            &#10004; Válido hasta <b>${new Date(item.hasta).toLocaleString('en-US')}</b><br>
            &#10004; Utilización máxima <b>${item.maximaVentaCliente} ${item.maximaVentaCliente == 1 ? "vez" : "veces"}</b> por usuario el mismo día.<br>
            ${item.aplica.length > item.noaplica.length ?
            /*html*/`&#10004; <b>No Aplica</b> para las siguientes categorías: <span class="button-aplica-cats-${item.idCupon}" onclick="vercats('aplica-cats-${item.idCupon}')">Mostrar Categorias</span>
            <div class="aplica-cats-${item.idCupon}" style="max-height:0; overflow: hidden">${stringfyCats(item.noaplica)}</div>`
            :
            /*html*/`&#10004; Aplica para las siguientes categorías: <span class="button-aplica-cats-${item.idCupon}" onclick="vercats('aplica-cats-${item.idCupon}')">Mostrar Categorias</span>
            <div class="aplica-cats-${item.idCupon}" style="max-height:0; overflow: hidden">${stringfyCats(item.aplica)}</div>`
            }
        </div>
    </div>
</div>`
    })
   
    $target.html(s)

    $target.on("click", ".cupon", e => {
        let $elem = $(e.currentTarget)
        pLog('coupon', {id: $elem.data("id")})
    });

}

function couponCondicion(coupon) {
    if(!coupon || !coupon.itemsCondicion) return

    let subs = {}, founded
    coupon.aplica = [], coupon.noaplica = []
    
    forEach(store.categorias, cat => {
        forEach(cat.subs, sub => subs[sub.id] = sub)
    })

    forEach(subs, sub => {
        founded = false
        coupon.itemsCondicion.forEach(item => {if(item.aplicadoa == sub.id) founded = true})
        if(founded) coupon.aplica.push(sub)
        else coupon.noaplica.push(sub)
    })


}

function showDropMenu($elem, visible) {
    
    let $cont, $window, r, $items, pos = $elem.position();

    if(!visible) {clearTimeout(timeout); show(false);}
    else timeout = setTimeout(() => {if(!menuShown) show(true)}, 250);

    function show(value) {
        if(value) {
            if($elem.find(".menu-float-cont").length > 0) return
            $elem.append(/*html*/`<div class="menu-float-cont"><div class="menu-float" style="transform: translateY(10px) scale(0.95); opacity: 0.5"></div>`)
            menuShown = true;
        }
        $cont = $elem.find(".menu-float-cont")
        $window = $cont.find("> div")
        if(value) {
            s = ""
            d = store.grupos[$elem.data("id")]
            r = $elem.offset().left + 300 > $(window).width()
            d.Categorias.forEach(item => {
                if(item.Subcategorias !== undefined){
                    s += /*html*/`<div  data-cat="${item.IdCategoria}" class="row" ${_(r, `data-right="true"`)}>${_(r, `<i class="fas fa-chevron-left"></i>`)}<div class="f1">${item.Categoria}</div>${_(!r, `<i class="fas fa-chevron-right"></i>`)}</div>`
                } else {
                    s += /*html*/`<div  data-cat="${item.IdCategoria}" data-sub="${item.IdCategoria}"><div class="f1">${item.Categoria}</div></div>`
                }
            })

            $window.html(`<h2 style="font-size:1.2em; margin-bottom: 7px; padding-left: 8px">${d.Grupo}</h2>${s}</div>`)
            $cont.css({top: pos.top + $elem.height(), left: pos.left + ($elem.width() - $cont.width()) / 2})
            $items = $(".menu-float > div")

            $items.off("mouseenter").on("mouseenter", e => showDropSubmenu($(e.currentTarget), true))
            $items.off("mouseleave").on("mouseleave", e => showDropSubmenu($(e.currentTarget), false))
            $items.off("click").on("click", e => {
                if(e.currentTarget.dataset.sub) parent.location = `/categorias/${e.currentTarget.dataset.sub}`
            })
        }

        anime({
            targets: $window[0],
            duration: 400,
            opacity: {
                value: value ? 1 : 0,
                easing: "linear"
            },
            translateY: {
                value: value ? 0 : 10,
                easing: "easeOutExpo"
            },
            scale: {
                value: value ? 1 : 0.95,
                easing: "easeOutExpo"
            },
            complete: function() {menuShown = false; if(!value) $cont.remove()}
        })
        showOverlay(value, {id: "overlay2", disabled: true})
        
    }

}

function showDropSubmenu($elem, visible) {


    let s2 = "", id = $elem.data("cat"), item, left, $new, $submenu = $elem.find(".submenu-float-cont");

    if(!visible) return $submenu.remove()


    if(!id) return;

    item = store.categorias[id]

    
    if(!item || item.subs == undefined) return

    Arrayfy(item.subs).forEach(itemsub => {
        s2 += /*html*/`<div data-cat="${itemsub.id}" data-sub="${itemsub.id}">${itemsub.title}</div>`
    })

    if($submenu.length > 0) return

    left = "left:" + ($elem.width() + 20) + "px"
    if($elem.data("right") == true) left = "right: " + ($elem.width() + 20) + "px"
    
    $elem.append($new = $(/*html*/`
    <div class="submenu-float-cont" style="opacity: 0; transform: translateY(10px) scale(0.95); top: ${$elem.position().top - 5}px; ${left}">
        <div class="submenu-float">${s2}</div>
    </div>`))

    $new.find(".submenu-float").off("click").on("click", "> div", e => {
        parent.location = `/categorias/${$(e.currentTarget).data("sub")}`
    })

    anime({
        targets: $new[0],
        duration: 400,
        opacity: {
            value: 1,
            easing: "linear"
        },
        translateY: {
            value: 0,
            easing: "easeOutExpo"
        },
        scale: {
            value: 1,
            easing: "easeOutExpo"
        },
        complete: function() {}
    })
    
}