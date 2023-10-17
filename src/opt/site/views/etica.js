const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Etica"})}
${HTML.header}

<div id="content" style="background-color: transparent;">
	<div class="bg-blanco" style="text-align: justify; margin: 80px auto">
		<br>
		<h2>Programa de Transparencia y Ética Empresarial</h2>
		<p class="mt-3">Eticos Ltda cuenta con un Sistema de Autocontrol y Gestión del Riesgo Integral de Lavado de Activos, Financiación del Terrorismo y Financiamiento de la Proliferación de Armas de Destrucción Masiva  - SAGRILAFT y un Programa de Transparencia y Ética Empresarial PTEE.</p>
		<p class="mt-3">Si llegase a tener conocimiento de alguna actividad ilegal o irregular por parte de nuestros colaboradores, empleados, proveedores, asociados o clientes. Puede notificar al Oficial de Cumplimiento de ETICOS LTDA a través del correo electrónico <b>cumplimiento@eticos.com</b></p>
		<br>
	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}