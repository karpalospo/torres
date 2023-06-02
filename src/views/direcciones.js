const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Mis Direcciones", userCSS: true})}
${HTML.header}

<div id="content" style="background-color: transparent;">

	<div class="row bg-blanco" style="max-width: 800px;">
		${HTML.userMenu}
		<div class="form f1" style="border-left: 1px solid #eee; padding-left: 20px; align-self: flex-start;">
			<div class="h4">Mis Direcciones</div>
			<br>
			<div id="address-list" class="vselect-list"></div>
			<div class="tx-center p15">
				<button class="page-button-flat2 button-pink" onclick="editAddress('')"><i
						class="fa fa-plus-circle"></i> &nbsp; Añadir una dirección</button>
			</div>
		</div>

	</div>

</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}js/direcciones.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}