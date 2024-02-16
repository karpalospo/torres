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
    let { email, nombres, apellidos, nit, dateOfBirth, cellphone, terms_vida_sana, gender, tdocumento, direccion } = $target[0];

    let fields = {
        documento: nit.value,
        tipoDocumento: tdocumento.value,
        genero: gender.value,
        celular: cellphone.value,
        nombres: nombres.value,
        apellidos: apellidos.value,
        direccion: direccion.value,
        email: email.value + "@" + ($("#email-server").val() == "otro" ? $("#email2").val() : $("#email-server").val()),
        fechaNacimiento: dateOfBirth.value,
        aceptacondiciones: terms_vida_sana.checked ? "S" : "N",
        canal: "WEB",    
        marca: "TOR"
    }  

    
    // validaciones
    // if(!FormValidations.IsValidEmail(fields.email))
    //     return $("#login-error2").show(200).html("El email no es válido").delay(2500).hide(100)
    // if(FormValidations.ContainsLetters(fields.celular) || !FormValidations.IsValidPhoneNumber(fields.celular))
    //     return $("#login-error2").show(200).html("El número de celular no es válido").delay(2500).hide(100)
    // if (FormValidations.ContainsLetters(fields.nit) || FormValidations.ContainsSpecialChars(fields.nit))
    //     return $("#login-error2").show(200).html("El número de documento no es válido").delay(2500).hide(100)
    // if (ValidateInputFormEmpty(fields))
    //     return $("#login-error2").show(200).html("Debe llenar todos los campos").delay(2500).hide(100)
    

    

    let res = await API.setdata(fields);

    if (res.error === false) {
      
        showAlert(true)
        setTimeout(() => {
            parent.location = "/"
        }, 5000)

    } else {
        alert("Hubo un error al guardar")
    }

}