const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Empresa"})}
${HTML.header}

<div id="content" style="background-color: transparent;">
	<div class="bg-blanco">
		<h2>¿QUIÉNES SOMOS?</h2>
		<br>
		<img src="assets/ModeloFarmacia.jpg" alt="" style="width: 100%" />
		<p>Somos una cadena de droguerías líder en el suministro de medicamentos, productos de higiene personal, cuidado
			del bebé y cosméticos entre otros, que tiene como compromiso principal la salud y el bienestar de nuestros
			clientes.</p>
		<br>
		<p>Nuestro compromiso es apoyar la economía de nuestros clientes para poder brindarles:</p>
		<ul style="margin: 20px 0 0 10px;">
			<li>
				<p><i class="fas fa-check verde"></i> Precios competitivos</p>
			</li>
			<li>
				<p><i class="fas fa-check verde"></i> Oportuna y amable atención</p>
			</li>
			<li>
				<p><i class="fas fa-check verde"></i> Surtido extenso de productos</p>
			</li>
			<li>
				<p><i class="fas fa-check verde"></i> Prácticas confiables</p>
			</li>
			<li>
				<p><i class="fas fa-check verde"></i> Un gran número de sucursales</p>
			</li>
		</ul>
	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script src="js/header.js?v=4.2"></script>
</body></html>`}