let municipios = []

setInputFilter(document.querySelector("#nit-field"), function(value) {
    return /^\d*\¬?\d*$/.test(value);
}, "Únicamente números");

setInputFilter(document.querySelector("#cell-field"), function(value) {
    return /^\d*\¬?\d*$/.test(value);
}, "Únicamente números");

setInputFilter(document.querySelector("#nombres-field"), function(value) {
    return /^[A-Za-z\s]+$/.test(value);
}, "Únicamente letras");

setInputFilter(document.querySelector("#apellidos-field"), function(value) {
    return /^[A-Za-z\s]+$/.test(value);
}, "Únicamente letras");

setInputFilter(document.querySelector("#ciudad-field"), function(value) {
    return /^[A-Za-z\s]+$/.test(value);
}, "Únicamente letras");


async function init() {

    let res = await API.GET.getMunicipios();

    let $elem = $("#ciudad-field")

    if (res.error === false) {
        municipios = res.data.municipios.map(item => item.Nombre)
        autocomplete($elem[0], municipios, true);
    }

    $("#email-server").on("change", function(e) {
      let $elem = $(e.currentTarget)
      if($elem.val() == "otro") {
        $elem.hide(0)
        $("#email2").show(0)
      }
    })


}
init()

async function signup() {

    let $target = $("#frm-registro")
    let { email, nombres, apellidos, nit, dateOfBirth, cellphone, terms_vida_sana, gender, tdocumento, aceptaradio } = $target[0];

    let fields = {
        email: email.value + "@" + ($("#email-server").val() == "otro" ? $("#email2").val() : $("#email-server").val()),
        nombres: nombres.value,
        apellidos: apellidos.value,
        nit: nit.value,
        fecha_nacimiento: dateOfBirth.value,
        celular: cellphone.value,
        gender: gender.value,
        tdocumento: tdocumento.value,
        vidasana: terms_vida_sana.checked ? "SI" : "NO",
        enviocorreo: aceptaradio.value,
        ciudad: $("#ciudad-field").val()
    }  

    console.log(fields)
    
    // validaciones
    if(!FormValidations.IsValidEmail(fields.email))
        return $("#login-error2").show(200).html("El email no es válido").delay(2500).hide(100)
    if(FormValidations.ContainsLetters(fields.celular) || !FormValidations.IsValidPhoneNumber(fields.celular))
        return $("#login-error2").show(200).html("El número de celular no es válido").delay(2500).hide(100)
    if (FormValidations.ContainsLetters(fields.nit) || FormValidations.ContainsSpecialChars(fields.nit))
        return $("#login-error2").show(200).html("El número de documento no es válido").delay(2500).hide(100)
    if (ValidateInputFormEmpty(fields))
        return $("#login-error2").show(200).html("Debe llenar todos los campos").delay(2500).hide(100)
    

    

    let res = await API.POST.setdata(JSON.stringify(fields));

    if (res.error === false) {
      
      showPopup(ABS_URL_SERVER + "/assets/popup-vidasana.jpg", {
        imageClick: `parent.location='${ABS_URL}/home'`,
        callToActionLabel: `IR AL INICIO`,
        callToAction: `parent.location='${ABS_URL}/home'`,
      })

    } else {
        alert("Hubo un error al guardar")
    }

}