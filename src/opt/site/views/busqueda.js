const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (str) => {
return /*html*/`
${HTML.head({title: "Búsqueda | " + str})}
${HTML.header}

<div id="content">

	<div class="row r-t">

		<div id="filtros" style="width: 290px; padding: 10px 18px 0 15px; box-sizing: border-box;">
			<h3>Ordernar por</h3>
			<div id="sort-div"></div>

			<h3>Filtrar por Categoría</h3>
			<div class="card">
				<div id="categorias-filter" class="accordion3"></div>
			</div>
			<br>
			<h3>Filtrar por Marca</h3>
			<div class="card">
				<div id="marcas-filter" class="accordion3"></div>
			</div>
			<br>
			<h3>Filtrar por Laboratorio</h3>
			<div class="card">
				<div id="laboratorio-filter" class="accordion3"></div>
			</div>
			<br>
			<h3>Filtrar por Precio</h3>
			<div class="card">
				<div id="precio-filter" style="padding: 20px"></div>
			</div>
			<br>

		</div>

		<div id="resultado-list"
			style="width: calc(100% - 310px); margin-bottom:50px; margin-right: 15px; padding-top: 10px;">
			<div class="porta-medida">
				<div id="medida" class="products-list"></div>
			</div>
		</div>

	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script>let str = "${str}";</script>
<script src="${ABS_URL}/js/busqueda.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}