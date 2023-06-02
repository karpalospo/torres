async function page_init() {

    if(store.user.logged) {

        getUserAddresses($("#address-list"))

    } else {
        //parent.location = `index.html`
    }

}

async function editAddress(alias) {

    store.currentAddressAlias = alias
    
    showModal(true, 'address')
    
    let s = ""
    forEach(sortByKey(store.centrocostos, "city"), item => {
        s += `<option value="${item.Ciudad}">${item.Descripcion}</option>`
    })
    $("#frm-ciudad").html(s)

    if(store.currentAddressAlias != "") {

        let address = {}, s = "";
        store.user.addresses.forEach(item => {
            if(item.nombre_direccion == store.currentAddressAlias) address = item
        });
        store.currentAddressAlias = ""

        $("#address").find(".title").html("EDITAR DIRECCIÓN")
        $("#frm-ciudad").val(address.ciudad)
        $("#frm-observacion").val(address.nombre_direccion).css("opacity", 0.6).prop("readonly", true)
        $("#frm-observacion").val(address.nombre_direccion).css("opacity", 0.6).prop("readonly", true)
        s = extractString(address.direccion, " ")
        $('[name="name_route"]').val(s[0])
        s = extractString(s[1], "#")
        $('[name="name_main_route"]').val(s[0])
        s = extractString(s[1], "-")
        $('[name="name_second_route"]').val(s[0])
        s = extractString(s[1], ":")
        $('[name="name_third_route"]').val(s[0].replace(" Barrio", ""))
        $('[name="name_neighborhood"]').val(s[1])

    } else {
        $("#address").find(".title").html("AGREGAR DIRECCIÓN")
        $("#frm-ciudad").val(store.location)
        $("#frm-observacion").val(address.nombre_direccion).css("opacity", 1).prop("readonly", false)
        $('[name="name_route"]').val("")
        $('[name="name_main_route"]').val("")
        $('[name="name_second_route"]').val("")
        $('[name="name_third_route"]').val("")
        $('[name="name_neighborhood"]').val("")
        $('[name="name_third_route3"]').val("")
    }

    renderCurrentAddress()
}

function renderCurrentAddress() {

    let {name_route, name_main_route, name_second_route, name_third_route, name_third_route3, name_neighborhood} = $("#frm-direccion")[0]        
    $("#direccion-preview").html(buildAddress(name_route.value, name_neighborhood.value, name_main_route.value, name_second_route.value, name_third_route.value, name_third_route3.value) + "<br>" + $("#frm-observacion").val())
}

function buildAddress(route, neighborhood, mainRoute, secondRoute, thirdRoute, complemento) {
    const _secondRoute = secondRoute.trim() !== '' ? `#${secondRoute}` : ''
    const _thirdRoute = thirdRoute.trim() !== '' ? ` - ${thirdRoute}` : ''
    const _thirdRoute3 = complemento.trim() !== '' ? `, ${complemento}` : ''
    const _neighborhood = neighborhood.trim() !== '' ? `Barrio: ${neighborhood}` : ''

    return `${route} ${mainRoute} ${_secondRoute} ${_thirdRoute} ${_thirdRoute3} ${_neighborhood}`
}

async function saveAddress() {

    if(!store.user.logged) return alert("Debe estar logueado para guardar una dirección.")

    let {name_route, name_main_route, name_second_route, name_third_route, name_neighborhood, name_third_route3, name_alias, name_ciudad} = $("#frm-direccion")[0]       
    
    if(!name_alias.value) return alert("Escriba un nombre de la dirección.")

    const direccion = buildAddress(name_route.value, name_neighborhood.value, name_main_route.value, name_second_route.value, name_third_route.value,name_third_route3.value)
    console.log(direccion)
    res = await API.POST.saveAddress(
        {
            ciudad: name_ciudad.value,
            nombre_direccion: name_alias.value,
            direccion
        }, store.user.email, store.user.auth_token
    )

    if (!res.error) {
        getUserAddresses($("#address-list"))
        showModal(false)
        name_neighborhood.value = ""
        name_main_route.value = ""
        name_second_route.value = ""
        name_third_route.value = ""
        name_third_route3.value = ""
        name_alias.value = ""
        $("#direccion-preview").html("")

    } else {
        if (res.message === "TOKEN_ERROR") {
            alert("Error al guardar la dirección")
        } else {
            alert("Error de servidor")
            showModal(false)
        }
    }
}

async function deleteAddress(alias) {

    //if(!store.user.logged) return parent.location = ABS_URL

    let {name_main_route, name_second_route, name_third_route, name_neighborhood, name_alias} = $("#frm-direccion")[0]   

    res = await API.POST.deleteAddress(alias, store.user.email, store.user.auth_token)

    if (!res.error) {
        getUserAddresses($("#address-list"))
        showModal(false)
        name_neighborhood.value = ""
        name_main_route.value = ""
        name_second_route.value = ""
        name_third_route.value = ""
        name_alias.value = ""
        $("#direccion-preview").html("")

    } else {
        if (res.message === "TOKEN_ERROR") {
            alert("Error al eliminar la dirección")
        } else {
            alert("Error de servidor")
            showModal(false)
        }
    }
}

async function getUserAddresses($target) {
    
    let res = await API.POST.getAddress(store.user)
   
    if(res.data && res.data.success == false) return false

    renderAddress(store.user.addresses = res.data, $target)
   
}

function renderAddress(data, $target) {
    let s = ""
    //$target.off("click")
    forEach(data, item => {
        let pos = store.centrocostos.findIndex(elem => item.ciudad == elem.Ciudad)
        s += /*html*/`
<div data-value="${item.direccion}" data-alias="${item.nombre_direccion}" data-ciudad="${item.ciudad}">
    <div><i class="fa fa-check"></i></div>
    <div style="width:80px;"><b>${item.nombre_direccion}</b></div>
    <div class="f1">
        ${item.direccion}
        <div style="font-weight:500; text-transform: capitalize;">${pos >= 0 ? store.centrocostos[pos].Descripcion.toLowerCase() : ""}</div>
    </div>
    <div class="boton-i address-edit"><i class="fas fa-pen"></i></div>
    <div class="boton-i address-del"><i class="fas fa-trash-alt"></i></div>
</div>`
    })
    $target.html(s)
    $target.on("click", ".address-edit", e => {e.preventDefault(); editAddress($(e.currentTarget).parent().data("alias"))})
    $target.on("click", ".address-del", e => {e.preventDefault(); deleteAddress($(e.currentTarget).parent().data("alias"))})
}