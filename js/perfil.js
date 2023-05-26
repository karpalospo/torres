async function page_init() {

    //if(!store.user.logged) parent.location = "index.html"
    let d;

    res = await API.POST.userProfile(store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)
    if(!res.error) {
        d = res.data
        $("#frm-user-email").val(d.email)
        $("#frm-user-nombres").val(d.nombres)
        $("#frm-user-cc").val(d.nit)
        $("#frm-user-celular").val(d.celular)
        $("#frm-user-nacimiento").val(d.fecha_nacimiento)
    }
    
}