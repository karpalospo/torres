const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (id) => {
	
return /*html*/`
${HTML.head({title: id})}
${HTML.header}

<style>
	.rating-cont {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 40px 0;
	}

	#rating {
		font-size: 1.3em;
		cursor: default;
	}

	#rating span {
		color: #dedad3;
		cursor: default;
	}

	#rating .checked {
		color: #ffbc00;
	}

	#rating span:hover {
		transform: scale(1.1);
	}

	#opinar-btn {
		display: inline-block;
		border-left: 1px solid #ccc;
		padding: 6px 13px;
		background: rgb(35 119 235 / 5%);
	}

	#opinar-btn:hover {
		background: rgb(35 119 235 / 10%);
	}

	#back-opinar {
		display: flex;
		align-items: center;
		background: linear-gradient(180deg, rgb(252 252 252) 30%, rgba(230, 230, 230, 1) 100%);
		margin-left: 20px;
		border: 1px solid #ddd;
		border-radius: 5px;
		overflow: hidden;
		font-size: 0.8em;
		font-weight: 500;
	}

	#back-opinar:hover {
		cursor: pointer;
	}
</style>



<div id="content">

	<div class="porta-medida max-width" style="position:absolute; z-index:-1; pointer-events: none;">
		<div id="medida" class="products-list"></div>
	</div>

	<div id="detalles-cont" class="max-width">

		<div id="crumbs"></div>

		<div id="product-detail">
			<div style="position: relative;">
				<div id="porta-foto">
					<div class="image-zoom">
						<div id="slide" style="transform: scale(1); transform-origin: 0% 0%; cursor: default;"><img
								id="preview" src="" style="transform: translate(0%, 0%);"></div>
					</div>
					<div id="thumbnails">
						<div class="wrapper" style="display: none;"><img src="" alt="" class="thumbnail selected">
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="info">
					<div id="basic-info"></div>
					<div id="add-info"></div>
				</div>
			</div>
		</div>

		<div style="height:80px"></div>

		<div class="header-section">
			<div></div>
			<div class="tx-center"><span class="h2">productos relacionados</span></div>
			<div class="row r-r" style="padding-right: 10px;">
				<div class="bt-left"><i class="fas fa-chevron-left"></i></div>
				<div class="bt-right"><i class="fas fa-chevron-right"></i></div>
			</div>
		</div>
		<div class="line-deco"></div>

		<div id="prod-estrella" class="swiper">
			<div class="swiper-wrapper"></div>
		</div>

		<div style="height:80px"></div>
	</div>

	<div style="height:50px"></div>

</div>

${HTML.footer}
${HTML.scripts}
<script>let id = "${id}";</script>
<script src="${ABS_URL}/js/producto.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}