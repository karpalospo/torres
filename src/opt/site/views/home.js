const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Home"})}
${HTML.header}

<div id="content">

	<div class="porta-medida max-width" style="position:absolute; z-index:-1; pointer-events: none;">
		<div id="medida" class="products-list"></div>
	</div>

	<div id="home-cont" class="max-width">

		<div id="banner"  style="width: 100%; border-radius: 20px; overflow: hidden; font-size: 0; margin: 10px 0 25px 0">
			<img src="${ABS_URL}/assets/banner.jpg" atl="banner" style="width: 100%;" />
		</div>

		<div class="header-section">
			<div></div>
			<div class="tx-c"><span class="h2">Las mejores ofertas</span></div>
			<div class="row r-r" style="padding-right: 10px;">
				<div class="vertodo"><a href="busqueda/[sales]">Mostrar todo</a></div>
			</div>
		</div>

		<div class="tags" style="display:none">
			<div>medicamentos</div>
			<div class="active">dolex</div>
			<div>advil</div>
			<div>gripa</div>
			<div>vitaminas</div>
			<div>aseo personal</div>
		</div>

		<div id="resultado-list"></div>

		<div style="height:50px"></div>

		<div class="header-section">
			<div></div>
			<div class="tx-c"><span class="h2">Top recomendados</span></div>
			<div class="row r-r" style="padding-right: 10px;">
				<div id="recom-prev" class="bt-left"><i class="fas fa-chevron-left"></i></div>
				<div id="recom-next" class="bt-right"><i class="fas fa-chevron-right"></i></div>
			</div>
		</div>

		<div id="recomendados" class="swiper"></div>

		<div style="height:70px"></div>
		<div class="header-section">
			<div></div>
			<div class="tx-c"><span class="h2">Productos con oferta</span></div>
			<div class="row r-r" style="padding-right: 10px;">
				<div id="estre-prev" class="bt-left"><i class="fas fa-chevron-left"></i></div>
				<div id="estre-next" class="bt-right"><i class="fas fa-chevron-right"></i></div>
			</div>
		</div>


		<div id="prod-estrella" class="swiper"></div>


		<div style="height:50px"></div>
	</div>

</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/home.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}