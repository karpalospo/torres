const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (str) => {
return /*html*/`
${HTML.head({title: "Búsqueda | " + str})}
${HTML.header}

<div id="content" style="background-color:#f6f6f6">

	<div id="back-filtros">

		<div id="filtros">
			<div class="row r-r">
				<div class="f1 tx-c" style="font-family: 'Be Vietnam Pro'">Panel de Filtros</div>
				<button onclick="mostrarFiltros(false)" class="circulo-negro">
					<i class="fas fa-times"></i>
				</button>
			</div>
			<h3>Ordernar por</h3>
			<div id="sort-div"></div>
			<br>
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
		<div id="filtro-spacer" class="width300"></div>
		<div class="resultados-cont">
			<div id="resultado-list">	
				<div class="porta-medida">
					<div id="medida" class="products-list"></div>
				</div>
			</div>
		</div>

	</div>

	<div style="height: 50px"></div>
</div>

${HTML.footer}
${HTML.scripts}
<script>let str = "${str}";</script>
<script src="${ABS_URL}/js/busqueda.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}