const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Mi Cuenta", userCSS: true})}
${HTML.header}

<div id="content" style="background-color: transparent;">
	<div class="row bg-blanco" style="max-width: 800px;">
		${HTML.userMenu}
		<div class="form f1" style="border-left: 1px solid #eee; padding-left: 20px;">

			<div class="h4">Información Básica</div>

			<div class="tr">
				<div style="flex: 0.4">
					<h4>Cédula/NIT</h4>
					<input class="input" id="frm-user-cc" readonly style="background-color: #eee;" />
				</div>
				<div class="sep"></div>
				<div>
					<h4>Email</h4>
					<input id="frm-user-email" class="input" readonly style="background-color: #eee;" />
				</div>
			</div>
			<div class="tr">
				<div>
					<h4>Nombre</h4>
					<input class="input" id="frm-user-nombres" />
				</div>
				<div class="sep"></div>
				<div>
					<h4>Apellidos</h4>
					<input class="input" id="frm-user-apellidos" />
				</div>
			</div>

			<div class="tr">
				<div>
					<h4>Celular</h4>
					<input class="input" id="frm-user-celular" />
				</div>
				<div class="sep"></div>
				<div>
					<h4>Fecha de Nacimiento</h4>
					<input id="frm-user-nacimiento" name="dateOfBirth" class="input" type="text"
						placeholder="AAAA-MM-DD">
				</div>
			</div>

			<br>
			<p class="tx-center"><button onclick="updateProfile(this)" class="page-button">GUARDAR</button></p>

			<br>
			<div class="h4">Cambio de Contraseña</div>
			<div class="tr">
				<div>
					<h4>Contraseña</h4>
					<input class="input" type="password" id="frm-user-password" />
				</div>
				<div class="sep"></div>
				<div>
					<h4>Repetir Contraseña</h4>
					<input class="input" type="password" id="frm-user-password2" />
				</div>
			</div>

			<br>
			<p class="tx-center"><button onclick="updatePassword(this)" class="page-button">CAMBIAR</button></p>
			<br><br>
		</div>
	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/perfil.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}