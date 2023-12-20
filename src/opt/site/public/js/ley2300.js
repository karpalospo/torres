
let $img = $("#banner-img").find("img");


async function enviarVida(elem) {
    let $elem = $(elem)
    $elem.attr("disabled", true)

    let sendData = {

        "tipoDocumento": $("#vs-tipodoc").val(),
        "documento":  $("#vs-documento").val(),
        "nombres":  $("#vs-nombres").val(),
        "apellidos": $("#vs-apellidos").val(),
        "email":  $("#vs-email").val(),
        "celular": $("#vs-celular").val(),
        "texto": $("#vs-texto").prop('checked'),
        "correo": $("#vs-correo").prop('checked'),
        "llamada": $("#vs-llamada").prop('checked'),
        "whatsapp": $("#vs-whatsapp").prop('checked'),
        "marca": "TOR"
        
    }


    let res = await API.ley2300(sendData);
    
    $elem.attr("disabled", false)

    if(res.error) {
        alert(res.message)
    } else {
        if(res.data.success) {
            showAlert(true)
            setTimeout(() => {
                //parent.location = "/"
            }, 5000)
        } else {
            alert(res.mesage)
        }
    }
}

$(window).resize(e => {
    console.log("aja", $(window).width())
    if($(window).width() < 800) {
        $img.attr("src", "assets/bannermobile.jpg")
    } else {
        $img.attr("src", "assets/banner.jpg")
    }
})
$(window).trigger("resize");
