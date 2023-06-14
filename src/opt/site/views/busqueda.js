const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (str) => {
return /*html*/`
${HTML.head({title: "Búsqueda | " + str})}
${HTML.header}

<div id="content">

	<div id="back-filtros">

		<div id="filtros">
			<div id="filtroboton" class="row r-r">
				<button onclick="mostrarFiltros(false)" class="circulo-negro">
					<i class="fas fa-times"></i>
				</button>
			</div>
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
		<div id="filtro-spacer"></div>
		<div style="flex: 1; margin-bottom:50px; margin:0 15px; padding-top: 10px;">
			<div id="verfiltros">
				<button onclick="mostrarFiltros(true)">Mostrar Filtros</button>
			</div>
			<div id="resultado-list">	
				<div class="porta-medida">
						<div id="medida" class="products-list"></div>
				</div>
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