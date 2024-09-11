const URL = {

    HOST: 'https://www.droguerialaeconomia.com',

    ETICOS_HOST: 'https://intranet.eticosweb.net',

    server2: "https://droguerialaeconomia.com"

}





const HEADER_URL_ENCODE = { 'Content-Type': 'application/x-www-form-urlencoded' }

const HEADER_JSON =  { 'content-type': 'application/json' } 

const HTTP_REQUEST_METHOD = {

    GET: 'GET',

    POST: 'POST',

    PUT: 'PUT',

    DELETE: 'DELETE',

    HEAD: "HEAD"

}





const fetchAsync = async (url, method, { body = {}, headers = {} } = {}) => {

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



const TwoLevelFormUrlEncoded = (params) => {

    let urlEncoded = '';

    for (const key in params) {

        if (params.hasOwnProperty(key)) {

            for (const childkey in params[key]) {

                if (params[key].hasOwnProperty(childkey)) {

                    urlEncoded += encodeURIComponent(key + '[' + childkey + ']') + '=' + encodeURIComponent(params[key][childkey]) + '&';

                }

            }

        }

    }

    return urlEncoded;

}



const ArrayFormUrlEncoded = (params) => {

    let urlEncoded = '';

    for (const key in params) {

        if (params.hasOwnProperty(key)) {

            for (const childkey in params[key]) {

                if (params[key].hasOwnProperty(childkey)) {

                    for (const childOfChildKey in params[key][childkey]) {

                        if (params[key][childkey].hasOwnProperty(childOfChildKey)) {

                            urlEncoded += encodeURIComponent(`${key}[${childkey}][${childOfChildKey}]`) + '=' + encodeURIComponent(params[key][childkey][childOfChildKey]) + '&';

                        }

                    }

                }

            }

        }

    }



    return urlEncoded.substring(0, urlEncoded.length - 1);



}



const FormUrlEncoded = (params) => {

    return Object.keys(params).map((key) => {

        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);

    }).join('&');

}





const VIDA_SANA_API =

{

    GET: {

        async RetrieveWhetherUserBelongsToVidaSanaOrNot(document) {

            return await fetchAsync(`${URL.ETICOS_HOST}/ServicesEpos/wsepos/api/v1/pacientesclub/${document}`, HTTP_REQUEST_METHOD.GET, { headers: {} })

        },

        async RetrieveVidaSanaOffers(location, itemsPerPage = 20, agreement = "892300678") {

            return await fetchAsync(`${URL.HOST}/economia/api/ofertas/${location}/${itemsPerPage}/${agreement}`, HTTP_REQUEST_METHOD.GET)

        },



        

    },

    POST: {

        async PerformVidaSanaSignUp(

            location,

            createdBy,

            fields = {

                document: '',

                firstname: '',

                secondname: '',

                lastname: '',

                secondlastname: '',

                dateOfBirth: '',

                address: '',

                phone: '',

                cellphone: '',

                email: '',

                terms: false,

                gender: '',

            },

            platform = "WEB"

        ) {

            const _fields = {

                idPaciente: fields.document,

                nombres: `${fields.firstname} ${fields.secondname} ${fields.lastname} ${fields.secondlastname}`,

                fechaNacimiento: fields.dateOfBirth,

                direccion: fields.address,

                telefono: fields.phone,

                celular: fields.cellphone,

                primernombre: fields.firstname,

                segundonombre: fields.secondname,

                primerapellido: fields.lastname,

                segundoapellido: fields.secondlastname,

                email: fields.email,

                estado: fields.terms ? "A" : "P",

                centroCostos: location,

                genero: fields.gender,

                creadoPor: createdBy,

                fechaCreacion: "",

                modificado: fields.document,

                aceptacondiciones: fields.terms ? "S" : "N",

                canalconfirmacion: platform,

            }

            return await fetchAsync(`${URL.ETICOS_HOST}/ServicesEpos/wsepos/api/v1/sendpacientes/`, HTTP_REQUEST_METHOD.POST, { body: JSON.stringify(_fields), headers: HEADER_JSON})

        },

    },

}



const API = {



    GET: {



        async RetrieveWhetherCouponIsValidOrNot(coupon, document, name, email, token) {

            return await fetchAsync(`${URL.HOST}/economia/api/cupon/${coupon}?user[nit]=${document}&user[email]=${email}&user[nombres]=${name}&user[auth_token]=${token}`, HTTP_REQUEST_METHOD.GET)

        },



    },



    POST: {



        async cambiarContrasena(email, code, password) {

            return await fetchAsync(`${URL.HOST}/economia/site/users/restorepassv2`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded({ email, code, password}), headers: HEADER_URL_ENCODE});

        },



        async checkEmail(email) {

            return await fetchAsync(`${URL.HOST}/economia/site/users/sendemailrestore`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded({ email}), headers: HEADER_URL_ENCODE});

        },



        async getBrands(str) {

            return await fetchAsync(`${URL.server2}/brands`, HTTP_REQUEST_METHOD.POST, { body: encode2({search: str}), headers: HEADER_URL_ENCODE});

        },



        async getPedido(id) {

            return await fetchAsync(`${URL.HOST}/economia/api/pedidos/getbyid/${id}`, HTTP_REQUEST_METHOD.POST)

        },



        async setEncuesta(usuario, pedido, fecha, data) {

            return await fetchAsync(`${URL.server2}/encuesta`, HTTP_REQUEST_METHOD.POST, { body: encode2({usuario, pedido, fecha, data}), headers: HEADER_URL_ENCODE});

        },



        async ProductosTodos() {

            return await fetchAsync(`${URL.HOST}/economia/api/referencias/all`, HTTP_REQUEST_METHOD.POST)

        },



        async guardar(data) {

            return await fetchAsync(`${URL.server2}/crud`, HTTP_REQUEST_METHOD.POST, {body: encode2(data), headers: HEADER_URL_ENCODE});

        },



        async init(data) {

            return await fetchAsync(`${URL.server2}/init`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded(data), headers: HEADER_URL_ENCODE});

        },



        async search(search, location) {

            return await fetchAsync(`${URL.server2}/search`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded({search, location}), headers: HEADER_URL_ENCODE});

        },



        async signin(data) {

            return await fetchAsync(`${URL.server2}/signin`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded({data}), headers: HEADER_URL_ENCODE});

        },



        async PerformValidateTypeOfCoupon(typeOfCoupon, products) {



            const body = FormUrlEncoded({ Condicion: typeOfCoupon }) + '&' + ArrayFormUrlEncoded({ Productos: products })

            return await fetchAsync(`${URL.HOST}/economia/api/validaCondiciones/`, HTTP_REQUEST_METHOD.POST, { body, headers: HEADER_URL_ENCODE});



        },



        async PerformRetrieveProfileInformation(nit, nombres, email, auth_token) {

            return await fetchAsync(`${URL.HOST}/economia/site/users/userProfile`, HTTP_REQUEST_METHOD.POST, { body: FormUrlEncoded({nit,email,nombres,auth_token}), headers: HEADER_URL_ENCODE});

        },

        

        async PerformPasswordRecovery(email) {

            return await fetchAsync(`${URL.HOST}/economia/site/users/restore/`, HTTP_REQUEST_METHOD.POST, { body: JSON.stringify({ email }), headers: HEADER_JSON});

        },



        async PerformRetrieveProductsFromCodeList (codigos, ciudad, { page = 1, items = 1000, convenio = "" } = {})

        {

            return await fetchAsync(`${URL.HOST}/economia/api/referencias/codigos/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({codigos, ciudad, convenio, pagina: page, items}), headers: HEADER_JSON})

        },





        async PerformRetrieveCombosSendingIds(location, ofertas) {

            return await fetchAsync(`${URL.HOST}/economia/api/combos/getcombosids/${location}/S/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({ofertas}),headers: HEADER_JSON})

        },



        async PerformRetrieveSingleComboSendingDescription(location, descripcion) {

            return await fetchAsync(`${URL.HOST}/economia/api/combos/getcombos/${location}/S/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({descripcion}),headers: HEADER_JSON})

        },



        async PerformRetrieveAddressList(nit, nombres, email, auth_token) {

            return await fetchAsync(`${URL.HOST}/economia/site/users/getMyDirecciones/`, HTTP_REQUEST_METHOD.POST, {body: FormUrlEncoded({nit, email, nombres, auth_token}), headers: HEADER_URL_ENCODE});

        },



    }



}





const BONUS_API = 

{

    GET: {

        async RetrieveBonuses (document) {

            return await fetchAsync(`${URL.ETICOS_HOST}/ServicesEpos/wsepos/api/v2/ofertasxCedula/${document}`, HTTP_REQUEST_METHOD.GET)

        },

    },



    POST: {

        async PerformSecondBonusVerification (bonus, products)

        {

            return await fetchAsync(`${URL.ETICOS_HOST}/ServicesEpos/wsepos/api/v2/ValidaCondicionBono/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({Bono: bonus, Productos: products}), headers: HEADER_JSON});

        },

    }

}