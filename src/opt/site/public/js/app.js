const ABS_URL = ""

let res,
    index,
    showingError,
    store = {
        collections:{},
        products:{},
        cart: {},
        order: {shipping:0},
        centrocostos: [],
        grupos: {},
        categorias: {},
        subcategorias: {},
        noPromoCats: ["01001", "01002", "01004", "01005", "01007"], 
        noPromoSubs: ["0200809"],
        cuponDiscount: 0,
        bonusDiscount: 0,
    },

    productBounces = {},
    $currentModalWindow,
    scrollTop,
    currentProductDetail,
    $window = $(window),
    $currentPage,
    $lblCupon = $("#lbl-coupon, #lbl-coupon2")
;

// ========================================================================== //
// RENDER

function renderBanners($target, items, options = {}) {

    let d, img, s = "", banners_data = [];

    options = {
        device:"DESKTOP",
        centeredSlides: false,
        pagination: {el: ".swiper-pagination", dynamicBullets: true},
        navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'},
        ...options
    }

    if(!items || items.length == 0) return false

    options.itemsPerRows = options.itemsPerRows ? (options.itemsPerRows == "auto" ? productBounces.rowCount || 6 : options.itemsPerRows) : 1

    if(!options.itemStyle) options.itemStyle = ""
    else options.itemStyle = `style="${options.itemStyle}"`

    if(!options.itemImgStyle) options.itemImgStyle = ""
    else options.itemImgStyle = `style="${options.itemImgStyle}"`

    forEach(items, item => {

        if(!(img = options.device != "DESKTOP" ? item.mobile : item.web)) return

        banners_data.push(d = item.data)
        s += `<div class="swiper-slide" ${options.itemStyle}>`
        if(d.keywords) s += `<div><a href="${ABS_URL}/busqueda/${d.keywords}"><img src="${img}" alt="" ${options.itemImgStyle}/></a></div>`
        else if(d.link) s += `<div><a href="${d.link}" target="_blank"><img src="${img}" alt="" ${options.itemImgStyle}/></a></div>`
        else if(d.link_self) s += `<div><a href="${ABS_URL}/${d.link_self}" target="_self"><img src="${img}" alt="" ${options.itemImgStyle}/></a></div>`
        else if(d.codes) s += `<div><a href="${ABS_URL}/busqueda/[banner]${item.id}"><img src="${img}" alt="" ${options.itemImgStyle}/></a></div>`
        else s += `<div><img src="${img}" alt="" ${options.itemImgStyle}/></div>`
        s += `</div>`
    })

    $target.css({position: "relative"}).html(/*html*/`
<div class="swiper slider">
    <div class="swiper-wrapper">${s}</div>
    <div class="swiper-pagination"></div>
    ${options.navigation ? `<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>`:""}
</div>`)

    new Swiper($target.find(".swiper")[0],  
        {
            centeredSlides: options.centeredSlides,
            direction: 'horizontal',
            slidesPerView: options.itemsPerRows,
            slidesPerGroup: options.itemsPerRows,
            loop: true,
            autoplay: {delay: 6000},
            preloadImages: false,
            lazy: true,
            pagination: options.pagination,
            navigation: options.navigation,
        }
    )
    
    return {data: banners_data};
}

// ========================================================================== //
// Signin

async function enviarCodigo(elem) {
    let $elem = $(elem), email = $("#email-recuperar").val();
    if(!email || email.trim() == "") return
    if(command($elem, true)) return

    res = await API.checkEmail(email.trim())

    if(!res.error && res.data.success) {
        store.current_email = email
        showModal(true, 'olvide-paso2')
    } else {
        alert(res.message)
    }
    command($elem, false)
    $('#email-recuperar').val('')
}

async function enviarContrasena(elem) {

    let $elem = $(elem),
        code = $('#codigo-recuperar').val(),
        password1 = $('#password1-recuperar').val(), 
        password2 = $('#password2-recuperar').val()
    ;

    if(!code) return
    if(password1 != password2) return alert("Las contraseñas no coinciden")

    let result = await API.restorePassword(store.current_email, code, password1)

    if(command($elem, true)) return
    if(!result.error && result.data.success) {
        $('#codigo-recuperar').val("")
        showModal(true, 'olvide-success')
        $('#password1-recuperar, #password2-recuperar').val('')
    } else {
        alert(result.message)
    }
    command($elem, false)
}

async function login() {

    let user = $("#frm-usuario").val().trim(), 
        pass = $("#frm-password").val().trim(),
        $elem = $("#btn-login")
    ;

    if(user == "" || pass == "") return showError($("#signin").find(".frm-error"), "Debe llenar todos los campos")
        
    if(command($elem, true)) return

    res = await API.login(user, pass)

    if(res.error || res.data.success == false) {
        showError($("#signin").find(".frm-error"), res.message)
        $("#frm-password").val("")
        command($elem, false)
    } else {
        showModal(false)
        command($elem, false)
        store.user = Object.assign(res.data, {logged: true})
        write_cache("user", store.user)
        if(store.goOrder) parent.location = `${ABS_URL}/pedido`;
        else {
            location.reload()
            // if(typeof getUserAddresses == "function") getUserAddresses()
            // renderUser()
            // renderCupones()
        }
    }
}


// products

function HomologarProductos(products) {

    let ret = [], product = {};
    forEach(products, item => {
        if(!item.codigo) return
   
        product = {
            id: item.codigo,
            nombre: item.descripcion,
            nombre2: item.descripcion,
            precio: item.VlrMinimo > 0 ? item.Antes : item.Ahora,
            ahora: item.Ahora,
            antes: item.Antes,
            beneficio: item.beneficio,
            categoria: item.Categoria,
            descuento: item.Porcentaje,
            patrocina: item.patrocina,
            cantidad: item.Cant,
            stock: Math.max(Math.floor(item.stock / (item.IdUnidad ? item.IdUnidad : 1)), 0),
            IdUnidad: item.IdUnidad,
            valor_contenido: item.valor_contenido,
            idoferta: item.idoferta,
            VlrMinimo: item.VlrMinimo,
            proveedor: item.proveedor,
            cat: item.subgrupo35,
            sub: item.subgrupo36,
            mostrarDescripcion: item.mostrarDescripcion,
            requiereFormula: item.requiereFormula,
        }

        if(["124278", "124279"].includes(product.id)) {
            product.tipo = "suplemento"
        }

        if(["124303"].includes(product.id)) {
            product.tipo = "coadyudante"
        }

        if(product.beneficio != undefined) {
            product.Ahora = item.Antes
            product.precio = item.Antes
        }

        ret.push(product)
    })
    return ret
}

async function getProductsFullInfo(products) {

    let stock = [], soldout = [];

    if(products.length == 0) return {stock, soldout};

    res = await API.getFromCodes(products.map(item => item.id), store.location, {convenio: store.user.convenio})

    if(!res.error) {
        
        forEach(products, product => {
            
            if(res.data.length == 1) soldout.push(Object.assign(product,
                {
                    descripcion: product.description,
                    adicional: product.aditional,
                    ficha: product.datasheet,
                    categoria: product.cat,
                    subcategoria: product.sub,
                    proveedor: product.provider
                }
            ))

            forEach(res.data, item => {
                if(item.codigo != product.id) return
                Object.assign(product,
                {
                    id: item.codigo,
                    nombre: product.nombre,
                    ficha: product.datasheet,
                    nombre2: item.descripcion,
                    precio: item.VlrMinimo > 0 ? item.Antes : item.Ahora,
                    ahora: item.Ahora,
                    antes: item.Antes,
                    beneficio: item.beneficio,
                    categoria: item.Categoria,
                    descuento: item.Porcentaje,
                    patrocina: item.patrocina,
                    cantidad: item.Cant,
                    stock: Math.max(Math.floor(item.stock / (item.IdUnidad ? item.IdUnidad : 1)), 0),
                    IdUnidad: item.IdUnidad,
                    valor_contenido: item.valor_contenido,
                    idoferta: item.idoferta,
                    VlrMinimo: item.VlrMinimo,
                    proveedor: item.proveedor
                })

                let esta = false
                forEach(stock, productStock => {
                    if(productStock.id == product.id) esta = true
                })

                if(!esta && item.stock && item.stock > 0) stock.push(product)
                else soldout.push(product)
            })
        })
    }

    return {stock, soldout}
}


// ========================================================================== //
// CUPON

function borrarCupon(mustRenderCart = true) {
    store.coupon = null;
    store.cuponDiscount = 0
    showResultMessage($lblCupon) // clear
    write_cache("coupon")
    if(mustRenderCart) {
        renderCart()
        if(typeof summaryCart == "function") summaryCart()
    }
}

async function redimirCupon() {
    
    let cupon, nombreCupon = $input.val().trim(), successCupon = true;

    showResultMessage($lblCupon) // clear

    if(!store.user.logged || nombreCupon == "") return false;

    if((res = await API.getCupon(nombreCupon, store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)).error) return alert("Error de validación de cupón.")

    store.order.cupon = {aplica: false}

    if(res.error) {
        successCupon = showResultMessage($lblCupon, false, res.data.message)

    } else {

        cupon = res.data[0];

        if(cupon.condicion.toString() == "0" && store.order.subtotal < cupon.vlrMinimo) {

            successCupon = showResultMessage($lblCupon, false, `El cupón ${cupon.nombreCupon} solo es válido para compras mínimas de ${f(cupon.vlrMinimo)}.`)

        } else if(cupon.condicion.toString() !== "0"){

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
                    idOferta: product.item.idoferta != undefined ? product.item.idoferta : 0
                })
            })
 
            const res2 = await API.validarCupon(cupon.condicion, productos)

            if(res2.error) {
                successCupon = showResultMessage($lblCupon, false, `Este cupón no es válido para ser redimido. ${cupon.descripcion}`)
            } else if (res2.data.ValorProductos < cupon.vlrMinimo) {
                successCupon = showResultMessage($lblCupon, false, `El cupón ${cupon.nombreCupon} solo es válido para compras mínimas de ${f(cupon.vlrMinimo)}. ${cupon.descripcion}`)
            }
        }

    }

    if(successCupon){
        confetti.toggle()
        setTimeout(() => confetti.toggle(), 3000)
        showResultMessage($lblCupon, true, `Cupón aplicado con éxito`)
        store.cuponDiscount = cupon.valorCupon || 0.001
        store.order.cupon = cupon;
        store.order.cupon.aplica = true
        renderCart()
        summaryCart()
    }
}


function stringfyCats(cats) {
    let s = ""
    cats.forEach(item => {s += "&#9679; " + item.title + " "})
    return s
}

function vercats(target, $elem) {

    if($elem.html() == "Mostrar Categorias") {
        $(target).css("max-height", "fit-content")
        $elem.html("Ocultar Categorias")
    } else {
        $(target).css("max-height", "0")
        $elem.html("Mostrar Categorias")
    }
    
}

function showAlert(show) {

    if(show) {
        anime({
            targets: ".alert",
            opacity: 0,
            duration: 0,
            translateY: 100
        });
        $("#alert-cont").css("display", "flex")
        anime({
            targets: ".alert",
            opacity: {
                duration: 5000,
                transition: "linear",
                value: 1
            },
            translateY: {
                duration: 500,
                value: 0,
                transition: "easeOutCubic"
            }
        });
        
    } else {
        anime({
            targets: ".alert",
            opacity: {
                duration: 5000,
                transition: "linear",
                value: 0
            },
            translateY: {
                duration: 500,
                value: 100,
                transition: "easeOutCubic"
            },
            complete: () => {
                $("#alert-cont").css("display", "none")
            }
        });
        
    }


}



// ========================================================================== //
// SEARCH

function search(str) {
    if(!str || str == "undefined" || str == "" || str.trim().length < 2) return
    parent.location = `${ABS_URL}/busqueda/${str.toLowerCase()}`
}

// ========================================================================== //
// MAIN

async function pLog(event, payload = {}) {

    switch(event) {

        case "location":
            let cc = getElemById(store.centrocostos, payload.id, "Ciudad")
            write_cache("location", {id: cc.Ciudad, city: cc.Descripcion})
            location.reload()
            break;

        case "coupon":
            borrarCupon()
            showModal(false)
            store.coupon = getFromArrayByProp(store.cupones, payload.id, "IdCupon")
            $("#txt-cupon").val(store.coupon.NombreCupon)
            if(store.coupon.condicion != 0) {
                store.coupon.condicionTexto = ""
                let res = await API.getCupon(store.coupon.NombreCupon, store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)
                if(!res.error) {
                    store.coupon.condicionTexto = `Aplica para pedidos mínimos de <b>${f(store.coupon.VlrMinimo)}</b>`
                }
            } else store.coupon.condicionTexto = `Aplica para pedidos mínimos de <b>${f(store.coupon.VlrMinimo)}</b>`

            write_cache("coupon", store.coupon)
            renderCart()
   
            break;

          
        case "logout":
            store.user = {}
            write_cache("user")
            if(payload && payload.noRedirect) {}
            else {parent.location = ABS_URL}
            break;

        case "search":
            let str, data
            if(typeof payload == "string") {
                str = payload.trim().toLowerCase()
                data = {user: store.user}
            } else {
                str = payload.str.trim().toLowerCase()
                data = payload
            }
            data.marca = "TOR"
            res = await API.search(str, store.location, data)
            return res


        case "cart":
            setCart(payload.id, payload)
            break

        case "viewProduct":
            parent.location = `${ABS_URL}/producto/${payload.id}`
            break


    }

}

// ========================================================================== //
// VISUAL

var acc = document.getElementsByClassName("accordion22");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        
        this.classList.toggle("aco-active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

    });
}

function mostrarFiltros(show) {
    if(show) {
        $("#filtros").removeClass("hidePanel").addClass("showPanel")
        $("#filtro-spacer").removeClass("width0").addClass("width300")
        $(".addFiltro").hide(0)
    } else {
        $("#filtros").removeClass("showPanel").addClass("hidePanel")
        $("#filtro-spacer").removeClass("width300").addClass("width0")
        $(".addFiltro").show(0)
    }
}

function disableScroll(disabled) {

    if(disabled) {
        scrollTop = document.documentElement.scrollTop;
        window.onscroll = function() {
            window.scrollTo(0, scrollTop);
        };
    } else {
        window.onscroll = function() {};
    }

}

function showOverlay(show, opt = {}) {
    let $overlay = $("#" + (opt.id || "overlay"));

    $overlay.off("click")
    if(opt.cb) $overlay.on("click", e => {e.preventDefault(); opt.cb();})
   
    if(show) {
        if(!opt.disable) $overlay.css({opacity: 1, pointerEvents: "auto"})
        disableScroll(true)
    } else {
        $overlay.css({opacity: 0, pointerEvents: "none"})
        disableScroll(false)
    }
}

function showPopup(image, options = {imageClick: ''}) {
    
    let $popup = $("#popup");

    $popup.html(/*html*/`
${options.closeButton ? `<div class="close absolute" onclick="showModal(false)"><i class="fa fa-times"></i></div>` : ``}
<div style="background-color:#f2f2f2; cursor:pointer; font-size:0; min-height:100px; transition: all ease 0.4s;" onclick="${options.imageClick}"><img id="pop-img" src="${image}" alt="" style="width: 100%; opacity: 0; max-height: 80vh"/></div>
<div class="row full-row">
${options.dismiss ? /*html*/`<button id="popup-dismiss" class="button-popup" style="background-color: #ffffff; border: 1px solid red; color: red;" onclick="${options.dismiss}">${options.dismissLabel}</button>
<div style="width:8px"></div>` : ``}
${options.callToAction ? `<button class="button-popup" onclick="${options.callToAction}">${options.callToActionLabel}</button>` : ``}
</div>
    `)

    $("#pop-img").on("load", e => {
        $("#pop-img").fadeTo(1, 1000);
        showModal(true, 'popup')
    })
    
}



function showPagePopup(items) {

    if(!items || items.length == 0) return

    let item = items[getRandomInt(items.length)]

    item = getPopupAction(item)

    showPopup(
        item.popup,
        {
            closeButton: true,
            dismiss: `showModal(false)`,
            dismissLabel: "DESCARTAR",
            imageClick: item.callToAction,
            callToActionLabel: `VER PRODUCTOS`,
            callToAction: item.callToAction,
        }
    )
}

function getPopupAction(item) {
    if(item.data.codes) item.callToAction = `parent.location = '${ABS_URL}/busqueda/[banner]${item.id}'`
    else if(item.data.keywords) item.callToAction = `parent.location = '${ABS_URL}/busqueda/${item.data.keywords}'`
    else item.callToAction = ``
    return item
}


function showSuperModal(show, window, cb = () => {}) {

    let $bksupermodal = $("#back-supermodal"),
        $window = $("#" + window)
    ;

    if(show) {
        anime.set($window[0], {scale: 0.3, opacity: 0})
        anime.set($bksupermodal[0], {opacity: 0})
        $bksupermodal.show(0)
        $window.show(0)

        anime({
            targets: $bksupermodal[0],
            duration: 500,
            opacity: {value: 1, easing: "linear"},
            complete: () => {
                anime({
                    targets: $window[0],
                    duration: 350,
                    opacity: {value: 1, easing: "linear"},
                    scale: {value: 1, easing: "easeOutBack"},
                    complete: cb
                })
            }
        })
    } else {
        anime({
            targets: $window[0],
            duration: 500,
            opacity: {value: 0, easing: "linear"},
            scale: {value: 0.7, easing: "easeInBack"},
            complete: () => {
                anime({
                    targets: $bksupermodal[0],
                    duration: 350,
                    opacity: {value: 0, easing: "linear"},
                    complete: () => {
                        $bksupermodal.hide(0)
                        $window.hide(0)
                        cb()
                    }
                })
            }
        })
    }
}

function showModal(show, window, cb = () => {}) {

    let $overlay = $("#overlay"),
        $floatcont = $("#float-cont"),
        $window = $floatcont.find("#" + window)
    ;

    if(show) {
        if($currentModalWindow) {
            return showModal(false, null, () => {
                showModal(true, window)
            })
        }
        showOverlay(true)
        anime.set($window[0], {scale: 0.3, opacity: 0})
        $overlay.append($window)
        $currentModalWindow = $window
        anime({
            targets: $window[0],
            duration: 350,
            opacity: {
                value: 1,
                easing: "linear"
            },
            scale: {
                value: 1,
                easing: "easeOutBack"
            },
            complete: cb
        })
    } else {
        if(!$currentModalWindow || $currentModalWindow.length == 0) return
        anime({
            targets: $currentModalWindow[0],
            duration: 350,
            opacity: {
                value: 0,
                easing: "linear"
            },
            scale: {
                value: 0.8,
                easing: "easeInBack",
            },
            complete: function() {
                $floatcont.append($currentModalWindow)
                $currentModalWindow = null
                showOverlay(false)
                cb()
            }
        })
    }
}

function showModalMessage(id, options = {}) {

    let $popupWindow = $("#popup-message"), s = "";
    switch(id) {

        case "error-login":
            s = `
<div class="tx-c" style="padding: 0 20px">
    <p>&nbsp;</p>
    <img src="assets/logo.png" alt="logo" style="width:260px"/>
    <h3 style="color: #333; padding: 20px 0;">
    ¡Atención!<br>
    Probablemente ha iniciado sesión en otro dispositivo, para continuar inicie sesión nuevamente.
    </h3>
</div> `
        break;

    }

    $popupWindow.find(".float-content").html(s)
    if(options.title) $popupWindow.find(".float-header > div").eq(0).html(options.title)
    if(options.callback) $popupWindow.find(".page-button").on("click", options.callback)
    else $popupWindow.find(".page-button").off("click", options.callback)
    if(options.label) $popupWindow.find(".page-button").html(options.label)
    if(options.closeCallback)  $popupWindow.find(".close").on("click", options.closeCallback)
    showModal(true, 'popup-message')
 
}

function showError($target, label, permanent) {
    if(showingError) return
    showingError = true
    if(label == "") {showingError = false; return $target.hide(0)}
    if(permanent) {$target.show(200).html(`<i class="fa fa-times"></i> &nbsp;` + label); showingError = false}
    else $target.show(200).html(`<i class="fa fa-times"></i> &nbsp;` + label).delay(2000).hide(200, function() {showingError = false})
}

async function showProductoEstrella(items = []) {


    if(store.pestrellaShown) return false

    let codes = "";

    if(items.length == 0) return false

    let $target = $("#resultado-list-express")
    renderLoading($target)
    
    forEach(items, item => codes += item.data.codes + " ")
    
    if(codes != "") {
        res = await pLog("search", `[code]${codes}`)
        if(!res.error) showProducts($target, res.data.products, "pestrella", {})
    }
    
    if(items.length > 0) {

        renderBanners($("#banner-e"), items)

        showModal(true, 'productose')
        store.pestrellaShown = true
        return true
    }

    return false
}

function resize() {

    productBounces.rowCount = 0;
    $("#medida").find("> div").each(function(index) {
        if(productBounces.rowCount > 0) return;
        $elem = $(this)
        if(index == 0) {
            productBounces.width = $elem.outerWidth()
            productBounces.height = $elem.outerHeight()
        }
        if(parseInt($elem.position().top) > 0) productBounces.rowCount = index
    })
}

$(window).on("resize", e => resize)


function autocomplete(inp, arr, clear, upper = false, cb) {

    var currentFocus, count = 0;

    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value, valUpper = this.value.toUpperCase();
        closeAllLists();

        if (!val) { return false;}
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);
 
        if(val.length < 2) return;

        for (i = 0; i < arr.length; i++) {
            let index = arr[i].toUpperCase().indexOf(valUpper)
            if (index > -1) {

                if(count > 7) return
                b = document.createElement("DIV");

                b.innerHTML = arr[i].substr(0, index) + `<b>${upper ? val.toUpperCase() : val}</b>` + arr[i].substr(index + val.length, arr[i].length - index);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                    if(typeof cb == "function") cb(this.getElementsByTagName("input")[0].value)
                });
                a.appendChild(b);
                count++
            }
        }
    });

    inp.addEventListener("blur", function(e) {
      let val = e.currentTarget.value, found = false
      for (i = 0; i < arr.length; i++) {
        if(arr[i] == val.toUpperCase()) {
          e.currentTarget.value = arr[i]
          found = true
        }
      }
      if(!found && clear) {
        e.currentTarget.value = ""
      }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
              if (x) x[currentFocus].click();
          }
        }
    });

    function addActive(x) {

      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }

    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
      count = 0;
    }

  }

  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });

}


// ========================================================================== //
// COMPONENTS

function initList($target, field, cb) {
    $target.on("click", "> div", e => {
        let $elem = $(e.currentTarget)
        $elem.siblings().removeClass("active")
        store[field] = $elem.addClass("active").data("value")
        if(typeof cb == "function") cb($elem)
    })
}

function initAccordeon($target, autoclose, cb) {
    $target.off("click").on("click", "> .title", e => {
    
        e.preventDefault();

        let $elem = $(e.currentTarget),
            $content = $elem.next(".content")
        ;
        if($elem.hasClass("open")) return
        if(autoclose) $target.find("> .content").slideUp(250)
        $target.find("> .title").removeClass("open")
        $elem.addClass("open")
        if($content.css("display") == "none") $content.slideDown(250);			
        else $content.slideUp(250);
        if(typeof cb == "function") cb($elem)

    })
}

function showResultMessage($target, value, text) {
    $target.removeClass("good-text error-text").html("")
    if(text) {
        $target.addClass(`${value ? "good-text" : "error-text"}`).html(/*html*/`
            <div><i class="fas fa-${value ? "check" : "times"}"></i></div>
            <div class="text">${text}</div>`)
    }
    return value
}

// ========================================================================== //
// CACHE

function write_cache(item_name, data) {
    item_name = "economia-" + item_name
    if(data == undefined) return localStorage.removeItem(item_name)
    localStorage.setItem(item_name, JSON.stringify(data))
    return true
}

function load_cache(item_name) {
    item_name = "economia-" + item_name
    let cache_data = localStorage.getItem(item_name),
        result
    ;

    if(cache_data != undefined) {

        try {

            result = JSON.parse(cache_data)
            return result
        } catch(e) {
            localStorage.removeItem(item_name)
        }
    }

    switch(item_name) 
    {
        case "economia-user": return {}
        case "economia-location": return {}
        case "economia-cart": return {}
        default:
            return []
    }

}

