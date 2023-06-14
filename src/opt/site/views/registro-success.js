const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Registro Exitoso"})}
${HTML.header}

<div id="content">
	<div class="tx-c">
		<p>&nbsp;</p>
		<img src="assets/logo.png" alt="logo" style="width:260px" />
		<h3 style="color: #333; padding: 20px 0;">Felicitaciones, su registro fue exitoso</h3>
		<br></br>
		<button class="page-button" onclick="parent.location='/'">Ir al Inicio</button>
		<br>
	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}js/puntos.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}