const URL = {
    HOST: 'https://www.droguerialaeconomia.com',
    ETICOS_HOST: 'https://intranet.eticosweb.net',
    //server2: "http://localhost:3000"
    server2: "https://imperacore.net"
}

const HEADER_JSON =  { 'content-type': 'application/json' } 


const fetchAsync = async (url, { body = {}, headers = {} } = {}, method = "POST") => {
    const form = (method === "GET" || method === "HEAD") ? { method, headers } : { method, headers, body };

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
            return await fetchAsync(`${URL.server2}/init`, {body: JSON.stringify(data), headers: HEADER_JSON});
        },

        async getCiudades() {
            return await fetchAsync(`${URL.HOST}/ftorres/api/ciudades`)
        },

        async getCategories(ciudad) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/categorias/${ciudad}`, {body: JSON.stringify({}), headers: HEADER_JSON})
        },

        


        // products
        async allProducts() {
            return await fetchAsync(`${URL.HOST}/economia/api/referencias/all`)
        },

        async getOfertas(ciudad, {items = 1000, convenio = ""} = {}) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/ofertas/`, {body: JSON.stringify({ciudad, convenio, marca: "TOR", items}), headers: HEADER_JSON})
        },

        async search(search, location, opt) {
            return await fetchAsync(`${URL.server2}/search`, {body: JSON.stringify({search, location, opt}), headers: HEADER_JSON});
        },
        
        async getFromCodes(codigos, ciudad, { page = 1, items = 1000, convenio = "" } = {})
        {
            return await fetchAsync(`${URL.HOST}/ftorres/api/referencias/codigos/`, {body: JSON.stringify({codigos, ciudad, convenio, pagina: page, items}), headers: HEADER_JSON})
        },




        // purchase
        async checkout(data) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/pedidos/setpedido`, {body: JSON.stringify(data), headers: HEADER_JSON});
        },

        async getPedido(id) {
            return await fetchAsync(`${URL.HOST}/economia/api/pedidos/getbyid/${id}`)
        },

        async getPuntos(nit, nombres, email, auth_token) {
            return await fetchAsync(`${URL.HOST}/economia/site/users/getpuntosvs`, {body: JSON.stringify({nit, email, nombres, auth_token}), headers: HEADER_JSON});
        },



        // login
        async login(email, password) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/login`, {body: JSON.stringify({ email, password }), headers: HEADER_JSON });
        },

        async signup(fields) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/signup/`, {body: JSON.stringify(fields), headers: HEADER_JSON });
        },

        

        // password recovery
        async checkEmail(email) {
            return await fetchAsync(`${URL.HOST}/economia/site/users/sendemailrestore`, {body: JSON.stringify({ email}), headers: HEADER_JSON});
        },

        async recoveryPassword(email) {
            return await fetchAsync(`${URL.HOST}/economia/site/users/restore/`, {body: JSON.stringify({ email }), headers: HEADER_JSON});
        },

        async restorePassword(email, code, password) {
            return await fetchAsync(`${URL.HOST}/economia/site/users/restorepassv2`, {body: JSON.stringify({ email, code, password}), headers: HEADER_JSON});
        },


        // coupon
        async getCupon(coupon, nit, nombres, email, token) {
            return await fetchAsync(`${URL.HOST}/economia/api/cupon/${coupon}`, {body: JSON.stringify({user: {nit, email, nombres, token}, marca: "TOR", canal: "WEB"}), headers: HEADER_JSON})
        },

        async validateCoupon(typeOfCoupon, products) {
            return await fetchAsync(`${URL.HOST}/economia/api/validaCondiciones/`, {body: JSON.stringify({ Condicion: typeOfCoupon }) + '&' + ArrayFormUrlEncoded({ Productos: products }), headers: HEADER_JSON});
        },



        // address
        async deleteAddress(alias, email, auth_token) {
            const fields = {
                userInfo: {email, auth_token},
                MyDireccion: {nombre_direccion: alias}
            }
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/deleteaddress/`, {body: JSON.stringify(fields), headers: HEADER_JSON});
        },

        async getAddress(nit, nombres, email, auth_token) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/getuseraddress/`, {body: JSON.stringify({nit, email, nombres, auth_token, marca: "TOR"}), headers: HEADER_JSON});
        },

        async saveAddress(data) {
            return await fetchAsync(`${URL.HOST}/ftorres/api/users/saveaddress/`, {body: JSON.stringify(data), headers: HEADER_JSON});
        },



        // profile
        async userProfile(nit, nombres, email, auth_token) {
            return await fetchAsync(`${URL.HOST}/economia/site/users/userProfile`, {body: JSON.stringify({nit,email,nombres,auth_token}), headers: HEADER_JSON});
        },

        async editProfile(document, name, email, token, { password = '', newName, newDocument, dateOfBirth, phone, cellphone }) {

            const fields = {
                userInfo: {
                    nit: document,
                    email,
                    nombres: name,
                    auth_token: token,
                },
                user: {
                    email,
                    password,
                    confirm_password: password,
                    nombres: newName,
                    nit: newDocument,
                    fecha_nacimiento: dateOfBirth,
                    celular: cellphone,
                    telefono: phone,
                }
            }
            return await fetchAsync(`${URL.HOST}/economia/site/users/updateUserProfile`, {body: JSON.stringify(fields), headers: HEADER_JSON});
        },
    }
}


const BONUS_API = 
{
    GET: {
        async RetrieveBonuses (document) {
            return await fetchAsync(`${URL.ETICOS_HOST}/ServicesEpos/wsepos/api/v2/ofertasxCedula/${document}`, {}, "GET")
        },
    },

    POST: {
        async PerformSecondBonusVerification (bonus, products)
        {
            return await fetchAsync(`${URL.ETICOS_HOST}/ServicesEpos/wsepos/api/v2/ValidaCondicionBono/`, {body: JSON.stringify({Bono: bonus, Productos: products}), headers: HEADER_JSON});
        },
    }
}