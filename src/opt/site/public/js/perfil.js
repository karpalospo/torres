async function page_init() {

    //if(!store.user.logged) parent.location = "index.html"
    let d;

    res = await API.userProfile(store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)
    if(!res.error) {
        d = res.data
        $("#frm-user-email").val(d.email)
        $("#frm-user-nombres").val(d.nombres)
        $("#frm-user-cc").val(d.nit)
        $("#frm-user-celular").val(d.celular)
        $("#frm-user-nacimiento").val(d.fecha_nacimiento)
    }
    
}


async function updateProfile(elem) {
    
    if(!store.user.logged) return;

    if(command($(elem), true)) return

    res = await API.editProfile(
        store.user.nit, 
        store.user.email, 
        store.user.auth_token,
        $("#frm-user-nombres").val() + " " + $("#frm-user-apellidos").val(),
        "",
        "", 
        $("#frm-user-nacimiento").val(), 
        "", 
        $("#frm-user-celular").val()
    
    )

    if(!res.error) {
        alert(res.message)
        let d = res.data
        store.user = Object.assign(store.user, {auth_token: d.auth_token, email: d.email, nit: d.nit, nombres: d.nombres})
        write_cache("user", store.user)
        renderUser()
    }

    command($(elem), false)

}

async function updatePassword(elem) {
    
    if(!store.user.logged) return;

    if(command($(elem), true)) return

    let newData = {};

    let password = $("#frm-user-password").val()
    if(password != "") {
        if(password != $("#frm-user-password2").val()) {
            alert("Las contraseñas no coinciden.")
            return
        } else {
            newData.password = password
        }
    }

    res = await API.editProfile(
        store.user.nit, 
        store.user.nombres, 
        store.user.email, 
        store.user.auth_token,
        newData
    )

    if(!res.error) {
        alert(res.message)
        let d = res.data
        store.user = Object.assign(store.user, {auth_token: d.auth_token, email: d.email, nit: d.nit, nombres: d.nombres})
        write_cache("user", store.user)
        renderUser()
    }

    command($(elem), false)
}