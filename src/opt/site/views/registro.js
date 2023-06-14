const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;
 
module.exports = () => {
return /*html*/`
${HTML.head({title: "Registro"})}
${HTML.header}


<div id="content">
	<div class="max-width" style="max-width: 550px; margin: 0 auto;">
		<br>
		<div class="h4">Crear nueva cuenta</div>
		<br>
		<form id="frm-registro">

			<span class="frm-label">Correo Electrónico</span>
			<input type="text" class="input xl" name="email" />
			<div class="separador"></div>

			<div class="row">
				<div>
					<span class="frm-label">Crear Contraseña</span>
					<input type="password" class="input" name="password" />
					<div class="separador"></div>
				</div>
				<div>
					<span class="frm-label">Repetir Contraseña</span>
					<input type="password" class="input" name="confirmPassword" />
					<div class="separador"></div>
				</div>
			</div>

			<span class="frm-label">Nombres</span>
			<input id="nombre-field" type="text" class="input xl" name="name" />
			<div class="separador"></div>

			<span class="frm-label">Apellidos</span>
			<input id="apellido-field" type="text" class="input xl" name="lastname" />
			<div class="separador"></div>

			<div class="row">
				<div>
					<span class="frm-label">Cédula/NIT/Pasaporte</span>
					<input id="nit-field" type="text" class="input" name="nit" style="width: 160px" />
					<div class="separador"></div>
				</div>
				<div>
					<span class="frm-label">Fecha de nacimiento</span>
					<input id="dateOfBirth" name="dateOfBirth" class="input" type="date" placeholder="AAAA-MM-DD"
						style="width: 160px">
					<div class="separador"></div>
				</div>
			</div>

			<div class="row">
				<div>
					<span class="frm-label">Celular</span>
					<input id="cell-field" type="text" class="input" name="cellphone" style="width: 160px" />
					<div class="separador"></div>
				</div>
				<div>
					<span class="frm-label">Género</span>
					<select name="gender" style="width: 160px">
						<option value="M">Masculino</option>
						<option value="F">Femenino</option>
					</select>
					<div class="separador"></div>
				</div>
			</div>

			<br>

			<div style="border: 1px solid #fa7800; padding: 8px; border-radius: 6px; margin-top: 10px; font-size: 0.8em;">
				<div class="row r-c">
					<input type="checkbox" id="terms" name="terms">
					<label for="terms" style="padding-left: 10px;"> Acepto los términos y condiciones y deseo ser parte
						del Club Vida Sana</label>
				</div>
			</div>

			<p class="tx-c">
				<a href="empresa-politicas.html" class="link" target="_blank"><i class="fas fa-external-link-alt"></i>
					Ver página de políticas y términos de uso</a>
				<br>
				<a href="empresa-vidasana.html" class="link" target="_blank"><i class="fas fa-external-link-alt"></i>
					Conocer más acerca del Club Vida Sana</a>
			</p>

			<input type="checkbox" id="terms_vida_sana" name="terms_vida_sana" checked="checked" style="display: none;">

		</form>

		<div id="login-error2" class="registerError"></div>
		<br>
		<div class="tx-c">
			<button class="page-button" onclick="signup(this)"
				style="max-width: 150px; margin: 0 auto;">REGISTRARME</button>
			<br><br><br>
			¿Ya tiene una cuenta?<br><br>
			<div class="page-button-flat2" onclick="showModal(true, 'signin')" style="display:inline-block">Iniciar
				Sesión</div>
		</div>
		<br><br><br>
	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/registro.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}