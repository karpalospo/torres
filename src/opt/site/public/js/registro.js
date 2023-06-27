function page_init() {

    setInputFilter(document.querySelector("#nit-field"), function(value) {
        return /^\d*\¬?\d*$/.test(value);
    }, "Únicamente números");
    
    setInputFilter(document.querySelector("#cell-field"), function(value) {
        return /^\d*\¬?\d*$/.test(value);
    }, "Únicamente números");
    
    setInputFilter(document.querySelector("#nombre-field"), function(value) {
        return /^[A-Za-z\s]+$/.test(value);
    }, "Únicamente letras");
    
    setInputFilter(document.querySelector("#apellido-field"), function(value) {
        return /^[A-Za-z\s]+$/.test(value);
    }, "Únicamente letras");
    
}

async function signup(elem) {

    let $elem = $(elem)
    if(command($elem, true)) return

    let { email, name, nit, dateOfBirth, cellphone, password, confirmPassword, terms, terms_vida_sana, gender, lastname } = $("#frm-registro")[0];

    let fields = {
        email: email.value,
        password: password.value,
        confirm_password: confirmPassword.value,
        nombres: `${name.value.toUpperCase()} ${lastname.value.toUpperCase()}`,
        nit: nit.value,
        celular: cellphone.value,
        telefono: "000000",
        fecha_nacimiento: dateOfBirth.value,
        acepta_condiciones: terms.checked,
        gender: gender.value,
        device: store.isMobile ? "webmobile" : "webdesktop",
    }

    if (terms_vida_sana.checked) {
        fields.vidaSana = {
            idPaciente: nit.value,
            nombres: name.value + " " + lastname.value.toUpperCase(),
            fechaNacimiento: dateOfBirth.value,
            direccion:"",
            telefono:"",
            celular: cellphone.value,
            primernombre: name.value,
            segundonombre: "",
            primerapellido: lastname.value.toUpperCase(),
            segundoapellido: "",
            email: email.value,
            estado: "A",
            centroCostos: store.location,
            genero: gender.value,
            creadoPor: "123456789",
            fechaCreacion:"",
            modificado: "123456789",
            aceptacondiciones: "S",
            canalconfirmacion: "WEB",
            ciudad: store.location
        }
    }

    
    function showError(text) {
        command($elem, false)
        $("#login-error2").show(200).html(text).delay(2500).hide(100)
    }

    
    // validaciones
    if (!FormValidations.IsValidEmail(fields.email)) return showError("El email no es válido")
    if (FormValidations.ContainsLetters(fields.celular) || !FormValidations.IsValidPhoneNumber(fields.celular)) return showError("El número de celular no es válido")
    if (FormValidations.ContainsLetters(fields.nit) || FormValidations.ContainsSpecialChars(fields.nit)) return showError("El número de documento no es válido")
    if (ValidateInputFormEmpty(fields)) return showError("Debe llenar todos los campos")
    if (fields.password != fields.confirm_password) return showError("Las contraseñas no coinciden")
    
    let res = await API.signup(fields);

    if (res.error === false) {

        if(res.data && res.data.success == false) {
            return showError(res.data.message)
        }

        store.user = res.data
        store.user.logged = true
        
        write_cache("user", store.user)
        parent.location = `${ABS_URL}/registro-exitoso`

    } else {
        alert(res.message)
    }

}