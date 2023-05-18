async function page_init() {

    //if(!store.user.logged) parent.location = "index.html"
    

    res = await API.POST.userProfile(store.user.nit, store.user.nombres, store.user.email, store.user.auth_token)
    if(!res.error) {
        // $("#frm-user-email").val(store.user.email)
        // $("#frm-user-nombres").val(store.user.nombres)
        // $("#frm-user-cc").val(store.user.nit)
        // $("#frm-user-celular").val(res.data.celular)
        // $("#frm-user-nacimiento").val(res.data.fecha_nacimiento)
    }
    
}