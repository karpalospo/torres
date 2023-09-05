const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (id, device) => {
	
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

	#product-detail .titulo {
		font-size: 1.6em;
		text-transform: capitalize;
		color: #101828;
		font-weight: 600;
		font-family: 'Montserrat', sans-serif;
		margin-bottom: 10px;
		font-weight: 700;
	}

	#product-detail .descripcion {
		font-weight: 400;
		color: #3a556a;
	}

	#product-detail .precio {
		font-size: 1.9em;
		font-weight: bold;
		color: #333;
		margin: 8px 0;
	}

	#product-detail .antes {
		margin: 10px 0;
		color: #555;
		font-size: 1.2em;
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
		border-radius: 4px;
		color: white;
		font-weight: bold;
		text-align: center;
		background: #039855;
		display: inline-block;
		padding: 8px 18px;
		margin: 10px 0;
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
		width: 155px;
    	margin: 10px 0;
	}

	#product-detail .cantidad  i {
		display: inline-block;
		width: 50px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		border: 1px solid #ccc;
	}

	#product-detail .cantidad i:hover {
		cursor: default;
		background-color: #f6f6f6;
	}

	#product-detail .cantidad input {
		border-top: 1px solid #c6c6c6;
		border-bottom: 1px solid #c6c6c6;
		border-left: none;
		border-right: none;
		background-color: transparent;
		font-size: 1.5em;
		text-align: center;
		width: 50px;
		height: 33px;
	}

	#product-detail .cantidad i:first-child {
		border-radius: 4px 0 0 4px;
	}

	#product-detail .cantidad i:last-child {
		border-radius: 0 4px 4px 0;
	}


	#product-detail button {
		background: #fa7800;
		color: white;
		padding: 12px 10px;
		border: none;
		border-radius: 4px;
		text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
		position: relative;
		margin: 15px 0;
		min-width: 200px;
	}

	#product-detail button:hover {
		opacity: 0.8;
	}

	.table-ficha {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		gap: 20px;
		font-family: 'Poppins',sans-serif;
	}

	.table-ficha .title {
		font-weight: 600;
		color: #333;
		font-size: 1.1em;
	}

	.titulo-mediano {
		font-size: 1.4em;
    	font-weight: 600;
    	padding: 40px 0 15px 0;
    	color: #101828;
	}

	.detail-patro {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 10;
		width: 120px;
	}


	@media only screen and (max-width: 800px) {
		
		#product-detail {
			grid-template-columns: 1fr;

		}

		#product-detail .info {
			padding: 20px 10px;
		}

		#product-detail .titulo {
			font-size:1.2em;
		}

		#product-detail .precio {
			font-size: 1.1em
		}

		
		.table-ficha {
			grid-template-columns: 1fr 1fr;
		}
	}


</style>



<div id="content">

	<div class="porta-medida max-width" style="position:absolute; z-index:-1; pointer-events: none;">
		<div id="medida" class="products-list"></div>
	</div>

	<div id="detalles-cont" class="max-width">

		<div id="crumbs"></div>

		<div style="background: white; border-radius: 8px; padding: ${device == "DESKTOP" ? "32px;" : "20px"}">
			<div id="product-detail">
				<div style="position: relative;">
					<div class="detail-patro"></div>
					<div id="porta-foto">
						<div class="image-zoom">
							<div id="slide" style="transform: scale(1); transform-origin: 0% 0%; cursor: default;"><img id="preview" src="" style="transform: translate(0%, 0%);"></div>
						</div>
						<div id="thumbnails">
							<div class="wrapper" style="display: none;"><img src="" alt="" class="thumbnail selected"></div>
						</div>
					</div>
				</div>
				<div>
					<div class="info">
						<div id="basic-info"></div>
					</div>
				</div>
			</div>
			<div class="titulo-mediano">Características del producto</div>
            <div id="add-info"></div>
		</div>

		<div style="height:80px"></div>

		<div class="row">
			<span class="h2">Productos Relacionados</span>
			<div></div>
		</div>

		<div id="prod-relacionados"></div>

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