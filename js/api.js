const URL = {
    HOST: 'https://www.droguerialaeconomia.com',
    ETICOS_HOST: 'https://intranet.eticosweb.net',
    //server2: "http://localhost:3000"
    server2: "https://imperacore.net"
}


const fetchAsync = async (url, { body = {}, headers = {} } = {}, method = "POST") => {
    const form = (method === "GET" || method === "HEAD") ? { method, headers } : { method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) };

    let response = { }

    try {
        const fetchResponse = await fetch(url, form);
        const data = await fetchResponse.json();
        if(data.message) response.message = data.message
        else response.message = ""
        if(data.error) response.error = data.error
        else response.error = (fetchResponse.status !== 200);
        if(data.data) response.data = data.data
        else response.data = data
       

    } catch (error) {
        response.error = error;
    }

    return response;
}


const API = {

    GET: {

        

    },

    POST: {

        // init
        async init(data) {
            return await fetchAsync(`${URL.server2}/init`, {body: data});
        },

        async getCiudades() {
            return await fetchAsync(`${URL.HOST}/ftorres/api/ciudades`)
        },

        async getCategories(ciudad) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/categorias/${ciudad}`)
        },

        
        // products
        async allProducts() {
            return await fetchAsync(`${URL.HOST}/economia/api/referencias/all`)
        },

        async getOfertas(ciudad, {items = 1000, convenio = ""} = {}) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/ofertas/`, {body: {ciudad, convenio, marca: "TOR", items}})
        },

        async search(search, location, opt) {
            return await fetchAsync(`${URL.server2}/search`, {body: {search, location, opt}});
        },
        
        async getFromCodes(codigos, ciudad, { page = 1, items = 1000, convenio = "" } = {})
        {
            return await fetchAsync(`${URL.HOST}/ftorres/api/referencias/codigos/`, {body: {codigos, ciudad, convenio, pagina: page, items}})
        },

        async getCategorias(location, subcategory, { page = 1, itemsPerPage = 1000, orderBy = "PJ", agreement = ""} = {}) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/referencias/catsubcat/${location}/${subcategory}/${page}/${itemsPerPage}/${orderBy}/${agreement}`)
        },


        // purchase
        async checkout(data) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/pedidos/setpedido`, {body: data});
        },

        async getPedido(id) {
            console.log(id)
            return await fetchAsync(`${URL.HOST}/ftorres/api/pedidos/getbyid/${id}`)
        },

        async getPuntos(nit, nombres, email, auth_token) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/getpuntosvs`, {body: {nit, email, nombres, auth_token}});
        },


        // login
        async login(email, password) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/login`, {body: {email, password}});
        },

        async signup(fields) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/signup/`, {body: fields});
        },

        
        // password recovery
        async checkEmail(email) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/sendemailrestore`, {body: { email}});
        },

        async recoveryPassword(email) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/restore`, {body: {email}});
        },

        async restorePassword(email, code, password) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/restorepass`, {body: {email, code, password}});
        },


        // coupon
        async getCupones(idusuario) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/ofertas/cuponesdisponibles`, {body: {idusuario, canal: "WEB"}})
        },

        async getCupon(cupon, nit, nombres, email, token) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/ofertas/cupon`, {body: {cupon, user: {nit, email, nombres, token}, canal: "WEB"}})
        },

        async validarCupon(Condicion, Productos) {
            return await fetchAsync(`${URL.HOST}/economia/api/validaCondiciones/`, {body: {Condicion, Productos}});
        },

        // address
        async getAddress(user) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/getuseraddress/`, {body: {nit: user.nit, email: user.email, auth_token: user.auth_token, marca: "TOR"}});
        },

        async saveAddress(myAddress, email, auth_token) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/saveaddress/`, {body: {myAddress, auth_token, email}});
        },

        async deleteAddress(alias, email, auth_token) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/deleteaddress/`, {body: {myAddress:{nombre_direccion: alias}, auth_token, email}});
        },

        // profile
        async userProfile(nit, nombres, email, auth_token) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/userinfo`, {body: {nit, email, nombres, auth_token}});
        },

        async editProfile(nit, nombres, email, auth_token, {password = '', _nombres, _nit, fecha_nacimiento, telefono, celular}) {

            const fields = {
                email,
                password,
                confirm_password: password,
                nombres: _nombres,
                nit: _nit,
                fecha_nacimiento,
                celular,
                telefono
            }

            return await fetchAsync(`${URL.HOST}/ftorres/api/users/updateuserprofile`, {body: {marca: "TOR", nit, email, nombres, auth_token, ...fields}});
        },
    }
}


