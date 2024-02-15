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

    async search(search, location, opt) {
        return await fetchAsync(`${URL.server2}/search`, {body: {search, location, opt}});
    },

    async getInit(data) {
        return await fetchAsync(`${URL.server2}/inittorres`, {body: data});
    },

    async getCiudades() {
        return await fetchAsync(`${URL.HOST}/api/ciudades`, {body: {"marca": "TOR"}})
    },

    async getAllCategorias(ciudad) {
        return await fetchAsync(`${URL.HOST}/api/categorias/${ciudad}`, {body: {"marca": "TOR"}})
    },

    
    // products
    async getOfertas(ciudad, {items = 1000, convenio = ""} = {}) {
        return await fetchAsync(`${URL.HOST}/api/ofertas/`, {body: {marca: "TOR", ciudad, convenio, items}})
    },


    async getFromCodes(codigos, ciudad, {page = 1, items = 1000, convenio = "" } = {})
    {
        return await fetchAsync(`${URL.HOST}/api/referencias/codigos/`, {body: {marca: "TOR", codigos, ciudad, convenio, pagina: page, items}})
    },

    async getSubcategorias(location, subcategory, {page = 1, itemsPerPage = 1000, convenio=""} = {}) {
        return await fetchAsync(`${URL.HOST}/api/referencias/catsubcat/${location}/${subcategory}/${page}/${itemsPerPage}/${convenio}`, {body: {marca: "TOR"}})
    },


    // pedidos
    async checkout(data) {
        return await fetchAsync(`${URL.HOST}/api/pedidos/setpedido`, {body: {marca: "TOR", ...data}});
    },

    async getPedido(id, nit, nombres, email, auth_token) {
        return await fetchAsync(`${URL.HOST}/api/pedidos/getbyid/${id}`, {body: {marca: "TOR", pedido_id: id, nit, email, nombres, auth_token}})
    },



    // users
    async getPuntos(nit, nombres, email, auth_token) {
        return await fetchAsync(`${URL.HOST}/api/users/getpuntosvs`, {body: {marca: "TOR", nit, email, nombres, auth_token}});
    },

    async login(email, password) {
        return await fetchAsync(`${URL.HOST}/api/users/login`, {body: {marca: "TOR", email, password}});
    },

    async signup(fields) {
        return await fetchAsync(`${URL.HOST}/api/users/signup/`, {body: {marca: "TOR", ...fields}});
    },

    
    // password recovery
    async checkEmail(email) {
        return await fetchAsync(`${URL.HOST}/api/users/sendemailrestore`, {body: {marca: "TOR", email}});
    },

    async recoveryPassword(email) {
        return await fetchAsync(`${URL.HOST}/api/users/restore`, {body: {marca: "TOR", email}});
    },

    async restorePassword(email, code, password) {
        return await fetchAsync(`${URL.HOST}/api/users/restorepass`, {body: {marca: "TOR", email, code, password}});
    },


    // coupon
    async getCupones(idusuario) {
        return await fetchAsync(`${URL.HOST}/api/ofertas/cuponesdisponibles`, {body: {marca: "TOR", idusuario, canal: "WEB"}})
    },

    async getCupon(cupon, nit, nombres, email, token) {
        return await fetchAsync(`${URL.HOST}/api/ofertas/cupon`, {body: {marca: "TOR", cupon, user: {nit, email, nombres, token}, canal: "WEB"}})
    },

    async validarCupon(Condicion, Productos) {
        return await fetchAsync(`${URL.HOST}/api/ofertas/validaCondiciones`, {body: {marca: "TOR", Condicion, Productos}});
    },


    // address
    async getAddress(user) {
        return await fetchAsync(`${URL.HOST}/api/users/getuseraddress/`, {body: {marca: "TOR", nit: user.nit, email: user.email, auth_token: user.auth_token}});
    },

    async saveAddress(myAddress, email, auth_token) {
        return await fetchAsync(`${URL.HOST}/api/users/saveaddress/`, {body: {marca: "TOR", myAddress, auth_token, email}});
    },

    async deleteAddress(alias, email, auth_token) {
        return await fetchAsync(`${URL.HOST}/ftorres/api/users/deleteaddress/`, {body: {myAddress:{nombre_direccion: alias}, auth_token, email}});
    },

    // profile
    async userProfile(nit, nombres, email, auth_token) {
        return await fetchAsync(`${URL.HOST}/api/users/userinfo`, {body: {marca: "TOR", nit, email, nombres, auth_token}});
    },

    async editProfile(nit, email, auth_token, nombres, password, confirm_password, fecha_nacimiento, telefono, celular) {

        return await fetchAsync(`${URL.HOST}/api/users/updateuserprofile`, {body: {marca: "TOR", nit, email, password, confirm_password, auth_token, nombres, fecha_nacimiento, telefono, celular}});
    },

    async ley2300(data) {
        return await fetchAsync(`${URL.HOST}/api/clubvidasana/ley2300/`, {body: data});
    },

    async setdata(data, type) {
        return await fetchAsync(`${URL.server2}/economia/v3/setdata`, HTTP_REQUEST_METHOD.POST, {body: {data, type}});
    },

    //bonos
    async getBono (document) {
        return await fetchAsync(`${URL.ETICOS_HOST}/ServicesEpos/wsepos/api/v2/ofertasxCedula/${document}`, {}, "GET")
    },

    async verificarBono(Bono, Productos) {
        return await fetchAsync(`${URL.ETICOS_HOST}/ServicesEpos/wsepos/api/v2/ValidaCondicionBono/`, {body: {Bono, Productos}});
    },


    //rutas economicas
    async allProducts() {
        return await fetchAsync(`${URL.HOST}/api/referencias/all`)
    },

}


