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


	#product-detail {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	#product-detail .info {
		padding: 0 10px 0 40px;
	}

	#product-detail .info-precio {
		margin-top: 15px;
		padding:10px;
		border:1px solid rgb(235, 70, 70);
		background-color: #fdf1f1;
		border-radius:6px;

	}

	#product-detail .precio-cont {
		margin: 30px 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	#product-detail .detalle-titulo {
		font-size: 1.6em;
		text-transform: capitalize;
		color: #333;
		font-weight: 600;
		font-family: 'Be Vietnam Pro', sans-serif;
		margin-bottom: 10px;
	}

	#product-detail .descripcion {
		font-weight: 400;
		color: #3a556a;
	}

	#product-detail .precio {
		font-size: 1.4em;
		font-weight: bold;
		color: #333;
	}


	#product-detail .antes {
		margin: 0 8px;
		color: #555;
		font-size: 1.0em;
		text-decoration: line-through;
	}

	#product-detail .pcondicion {
		color: #ff402c;
		margin-left: 9px;
		font-weight: bold;
		font-size: 1.3em;
	}

	#product-detail .descuento {
		position: relative;
		width: 35px;
		border-radius: 37px;
		color: white;
		font-weight: bold;
		text-align: center;
		line-height: 35px;
		height: 35px;
		background: #fa7800;
	}

	#product-detail .descuento .label {
		position: absolute;
		text-align: center;
		width: 35px;
		top: 0;
		font-weight: bold;
		font-size: 0.8em;
	}

	#product-detail .cantidad {
		width: 120px;
		margin-left: 20px;
	}

	#product-detail .cantidad  i {
		display: inline-block;
		background: linear-gradient(180deg, rgb(46, 140, 255) 0%, #0a61d0 100%);
		border-radius: 14px;
		color: white;
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}

	#product-detail .cantidad i:hover {
		cursor: default;
	}

	#product-detail .cantidad input {
		border: 1px solid #c6c6c6;
		background-color: #fff;
		font-size: 1.5em;
		width: 30px;
		text-align: center;
		border-radius: 5px;
	}

	#product-detail button {
		background: linear-gradient(180deg, rgb(255 160 71) 0%, #d66700 100%);
		font-family: "Roboto";
		color: white;
		padding: 9px 40px;
		border: none;
		border-radius: 7px;
		box-shadow: 0 0 8px 0 rgba(0 0 0 / 30%);
		text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
		position: relative;
		margin-left: 20px;
	}

	#product-detail button:hover {
		opacity: 0.8;
	}

	@media only screen and (max-width: 800px) {
		
		#product-detail {
			grid-template-columns: 1fr;

		}

		#product-detail .info {
			padding: 20px 10px;
		}
		#product-detail .detalle-titulo {
			font-size:1.2em;
		}

		#product-detail .precio {
			font-size: 1.1em
		}
	}


</style>



<div id="content">

	<!-- <div class="porta-medida max-width" style="position:absolute; z-index:-1; pointer-events: none;">
		<div id="medida" class="products-list"></div>
	</div> -->

	<div id="detalles-cont" class="max-width">

		<div id="crumbs"></div>

		<div id="product-detail">
			<div style="position: relative;">
				<div id="porta-foto">
					<div class="image-zoom">
						<div id="slide" style="transform: scale(1); transform-origin: 0% 0%; cursor: default;"><img id="preview" src="" style="transform: translate(0%, 0%);"></div>
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
			<div class="tx-c"><span class="h2">Relacionados</span></div>
			<div class="row r-r" style="padding-right: 10px;">
				<div class="bt-left"><i class="fas fa-chevron-left"></i></div>
				<div class="bt-right"><i class="fas fa-chevron-right"></i></div>
			</div>
		</div>

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