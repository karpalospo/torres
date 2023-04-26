let timeout,
    menuShown
;

$("#header-cont").load("header.html", async function() {

    // usuario
    store.user = load_cache("user")
    renderUser(store.user)

    // location
    store.location = "08001"
    if((res = load_cache("location")).id) store.location = res.id

    // carrito
    initCart(load_cache("cart"))

    for(let i = 0; i <= 16; i++) {
        $("#medida").append(`<div class="product-item"><div class="item"><div class="image"></div><div class="info"></div></div></div>`)
    }

    $("#modals-cont").load("modals.html", async function() {

        await renderCategorias(store.location)
        await renderCiudades()

        resize()

        if(typeof page_init == "function") page_init()

    });

    $("#footer-cont").load("footer.html");
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

}

function renderUser() {

    if(store.user.logged) {
        if(!store.user.nombres) return
        let nombre = store.user.nombres.split(" ")[0].toUpperCase()
        $("#lbl-nombre").html(nombre)
        $("[data-id='login']").find(".content").html(`
<div class="menu-item" onclick="parent.location='${ABS_URL}/perfil'">Mi Perfíl</div>
<div class="menu-item" onclick="parent.location='${ABS_URL}/perfil/pedidos'">Mis Pedidos</div>
<div class="menu-item" onclick="parent.location='${ABS_URL}/favoritos'">Mis Favoritos</div>
<div class="menu-item rojo" onclick="pLog('logout')">Cerrar Sesión</div>`)

        $("#menu-adicional").show(0)
        $("#float-right").show(0)
        
    } else {
        $("#lbl-nombre").html("Ingresar")
        $("[data-id='login']").find(".content").html(`
<div class="menu-item" onclick="showModal(true, $('#signin'))">Iniciar Sesión</div>
<div class="menu-item" onclick="parent.location = '${ABS_URL}/registro'">Registrarse</div>`)

        $("#menu-adicional").hide(0)
        //$("#float-right").hide(0)
        
    }
}

function showDropMenu($elem, visible) {
    
    let $cont, $window, pos = $elem.position();

    if(!visible) {clearTimeout(timeout); show(false);}
    else timeout = setTimeout(() => {if(!menuShown) show(true)}, 250);

    function show(value) {
        if(value) {
            $elem.append(`<div class="menu-float-cont"><div class="menu-float" style="transform: translateY(10px) scale(0.95); opacity: 0.5"></div>`)
            menuShown = true;
        }
        $cont = $elem.find(".menu-float-cont")
        $window = $cont.find("> div")
        if(value) {
            s = ""
            d = store.grupos[$elem.data("id")]
            d.Categorias.forEach(item => s += `<div class="row" data-id="${item.IdCategoria}"><div class="f1">${item.Categoria}</div><i class="fas fa-chevron-right"></i></div>`)
            $window.html(`<h2 style="font-size:1.2em; margin-bottom: 7px; padding-left: 8px">${d.Grupo}</h2>${s}</div>`)
            $cont.css({top: pos.top + $elem.height(), left: pos.left + ($elem.width() - $cont.width()) / 2})
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