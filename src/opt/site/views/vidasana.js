const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (device) => {
return /*html*/`
${HTML.head({title: "Vida Sana"})}
${HTML.header}

<div id="content" style="background-color: transparent;">

	<div class="bg-blanco-ani-form">
        <br>
        <form id="frm-registro">
    
            <span class="frm-label">Nombres</span>
            <input id="nombres-field" type="text" class="input xl" name="nombres" maxlength="40">
            <div class="separador"></div>

            <span class="frm-label">Apellidos</span>
            <input id="apellidos-field" type="text" class="input xl" name="apellidos" maxlength="40">
            <div class="separador"></div>

            <div class="row">
                <div>
                    <span class="frm-label">Género</span>
                    <select name="gender" style="width: 180px">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>

                <div>
                    <span class="frm-label">Fecha de nacimiento</span>
                    <input id="dateOfBirth" style="width: 180px" name="dateOfBirth" class="input" type="date" placeholder="AAAA-MM-DD">
                </div>
            </div>
            <div class="separador"></div>

            <div class="row">
                <div>
                    <span class="frm-label">Tipo de documento</span>
                    <select name="tdocumento" style="width: 180px">
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="PA">Pasaporte</option>
                        <option value="OT">Otro</option>
                    </select>
                </div>
                <div>
                    <span class="frm-label">Número de documento</span>
                    <input id="nit-field" style="width: 180px" type="text" class="input" name="nit" maxlength="12">
                </div>
            </div>
            <div class="separador"></div>

            <div class="row">
                <div>
                    <span class="frm-label">Direccion</span>
                    <input id="direccion-field" type="text" class="input" name="direccion" style="width: 180px">
                </div>
                <div>
                    <span class="frm-label">Número de celular</span>
                    <input id="cell-field" type="text" class="input" name="cellphone" style="width: 180px" maxlength="15">
                </div>
            </div>
            <div class="separador"></div>
            
            <span class="frm-label">Correo Electrónico</span>
            <input type="text" class="input" name="email" style="width: 220px"> @
            <select id="email-server">
                <option value="gmail.com">gmail.com</option>
                <option value="hotmail.com">hotmail.com</option>
                <option value="outlook.com">outlook.com</option>
                <option value="live.com">live.com</option>
                <option value="yahoo.com">yahoo.com</option>
                <option value="otro">otro</option>
            </select>
            <input id="email2" type="text" class="input" name="email2" style="width: 120px; display:none">
            <div class="separador"></div>

            <br>
            <p style="text-align: center;">
                <input type="checkbox" id="terms_vida_sana" name="terms_vida_sana">
                <label for="terms_vida_sana"> Acepto <a href="/politicas" class="link" target="_blank">Términos y condiciones</a>, Acepto ser miembro del <a href="/beneficios" class="link" target="_blank">Club Vida Sana</a> y autorizo el <a href="/habeas" class="link" target="_blank">Tratamiento de mis datos personales con las siguientes condiciones</a></label><br>
            </p>

        </form>

        <br><br>
        <div id="login-error2" class="registerError"></div>
        <p class="tx-c">
            <button class="page-button" onclick="signup()" style="max-width: 150px; margin: 0 auto;">ACTUALIZAR</button>
        </p>
        <br><br>
    </div>

</div>

${HTML.footer}
${HTML.scripts}
<script>let device = '${device}';</script>
<script src="${ABS_URL}/js/header.js"></script>
<script src="${ABS_URL}/js/formvidasana.js"></script>
</body></html>`}