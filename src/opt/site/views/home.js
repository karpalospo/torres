const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (device) => {
return /*html*/`
${HTML.head({title: "Home"})}
${HTML.header}

<div id="content">

	<div class="porta-medida max-width" style="position:absolute; z-index:-1; pointer-events: none;">
		<div id="medida" class="products-list"></div>
	</div>

	<div id="home-cont" class="max-width">
		<div style="height:10px"></div>
		<a href="busqueda/[aniversario]">
            <video width="100%" autoplay loop muted playsinline>
				${device == "DESKTOP" ? `<source src="${ABS_URL}/assets/ani-banner.mp4" type="video/mp4">` : `<source src="${ABS_URL}/assets/ani-banner-mobile.mp4" type="video/mp4">`}
                Your browser does not support the video tag.
            </video>
        </a>

		<div id="banner" class="banners"></div>

		<div class="row r-l">
			<span class="h2">Las mejores ofertas</span>
			<div class="row r-r" style="padding-right: 10px;">
				<div class="vertodo"><a href="busqueda/[sales]">Ver todos</a></div>
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

		<div class="row">
			<span class="h2">Productos destacados</span>
			<div class="row r-r" style="padding-right: 10px;">
				<div id="recom-prev" class="bt-left"><i class="fas fa-chevron-left"></i></div>
				<div id="recom-next" class="bt-right"><i class="fas fa-chevron-right"></i></div>
			</div>
		</div>
		<div style="height:10px"></div>
		<div id="recomendados" class="swiper"></div>

		<div style="height:70px"></div>
		<div class="row">
			<span class="h2">Recomendados</span>
			<div class="row r-r" style="padding-right: 10px;">
				<div id="estre-prev" class="bt-left"><i class="fas fa-chevron-left"></i></div>
				<div id="estre-next" class="bt-right"><i class="fas fa-chevron-right"></i></div>
			</div>
		</div>
		<div style="height:10px"></div>

		<div id="prod-estrella" class="swiper"></div>


		<div style="height:50px"></div>
	</div>

</div>

${HTML.footer}
${HTML.scripts}
<script>let device = '${device}';</script>
<script src="${ABS_URL}/js/home.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}