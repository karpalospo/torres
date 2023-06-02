const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Mis Pedidos"})}
${HTML.header}

<div id="content" style="background-color: transparent;">
	<div class="row bg-blanco" style="max-width: 800px;">
		<div id="user-menu-cont">
			<div id="bg-user-profile">
				<div id="user-profile"></div>
			</div>
			<div class="h4 tx-center">Carlos</div>
			<br>
			<ul id="menu-ul">
				<li><a href="/perfil"><i class="fas fa-user-circle"></i> Mi cuenta</a></li>
				<li><a href="/pedidos"><i class="fas fa-file-invoice-dollar"></i> Mis Pedidos</a></li>
				<li><a href="/puntos"><i class="fas fa-star-of-life"></i> Mis Puntos</a></li>
				<li><a href="/direcciones"><i class="fas fa-map-marker-alt"></i> Mis Direcciones</a></li>
			</ul>
			<br>
			<p class="tx-center"><button onclick="pLog('logout')" class="page-button" style="background: #fa1d00; font-size:0.8em"><i class="fas fa-times-circle"></i> CERRAR SESIÓN</button></p>
		</div>

		<div class="form f1" style="border-left: 1px solid #eee; padding-left: 20px; align-self: flex-start;">
			<div class="h4">Mis Pedidos</div>

		</div>
	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/pedidos.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}