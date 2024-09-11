const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (device) => {
return /*html*/`
${HTML.head({title: "Pedido"})}
${HTML.header}

<style>


	.hidden2 {
		border: none;
		width: 100%;
		height: 25px;
		background: white;
		cursor: pointer;
	}

	.btn-aplicar {
		padding: 0 20px;
		background: #fa7800;
		color: white;
		font-weight: 600;
		text-align: center;
		border: none;
		height: 30px;
		border-radius: 30px;
		font-size: 0.8em;
		letter-spacing: 1px;
		margin-left: 15px;
	}

	.nota-entrega {
		border: 1px solid #ccc;
		margin: 10px auto;
		width: 92%;
		display: block;
		padding: 10px;
		font-family: "poppins", sans-serif;
	}

	#sumario {
		max-width: 250px;
		margin: 0 auto;
		font-size: 0.9em;
	}

	#sumario td:nth-child(2) {
		text-align: left;
	}

	#sumario b {
		color: #222;
		border-top: 1px solid #ddd;
		margin-top: 2px;
		padding: 5px 0;
		display: inline-block;
	}

	.btn-cupones {
		padding: 8px 8px;
		height: 30px;
		border: none;
		background: transparent;
		font-weight: 600;
		color: #fa7800;
	}

	#order2 {
		display: flex;
		justify-content: flex-start;
		max-width: 900px; 
		margin: 0 auto;
	}

	#back-stickybox {
		width: 350px;
	}

	#resumen {
		display: none;
	}

	@media only screen and (max-width: 800px) {
		#order2 {
			display: block;
		}

		#back-stickybox {
			display: none;
		}

		#resumen {
			display: block;
		}

	}
</style>

<div id="content" style="background-color: #f2f2f2;">

	<div id="order2">
		
		<div class="trackrail" style="flex: 1; margin: 20px;">


			<div id="bono-card" class="card" style="padding: 10px; display: none">
				<div class="header-title">BONO DE DESCUENTO</div>
				<div id="bono" class="bono">
				</div>
			</div>

			<div class="card" style="padding: 10px;">
				<div class="header-title">FORMA DE PAGO</div>

				<div id="forma-pago">

					<div id="payment-list" class="select-list">
						<div data-value="PSE">
                            <div style="width: 25px;"><i class="fa fa-check"></i></div>
                            <div class="image" style="background-image: url(assets/globalpay.png)"></div>
                            <span><b>PSE Tarjeta Debito y Crédito</b> (Online)</span>
                        </div>
						<div data-value="Efectivo">
							<div style="width: 25px;"><i class="fa fa-check"></i></div>
							<div class="image" style="background-image: url(assets/money2.png)"></div>
							<span><b>Efectivo</b> (Contraentrega)</span>
						</div>
						<div data-value="Datáfono">
							<div style="width: 25px;"><i class="fa fa-check"></i></div>
							<div class="image" style="background-image: url(assets/datafono2.png)"></div>
							<span><b>Datáfono</b> (Contraentrega)</span>
						</div>
						<div data-value="TCO">
							<div style="width: 25px;"><i class="fa fa-check"></i></div>
							<div class="image" style="background-image: url(assets/tco2.png)"></div>
							<span><b>Tarjeta de Crédito Olímpica</b> (Contraentrega)</span>
						</div>
					</div>

				</div>
				<p id="TCO-alert" style="color:red; display: none">El descuento de TCO no es acumulable con los cupones
					de descuentos disponibles</p>
			</div>

			<div class="card" style="margin-top: 10px; padding: 10px;">
				<div class="header-title">DIRECCIÓN DE ENTREGA</div>

				<div>
					<div id="address-list" class="vselect-list"></div>
					<div class="tx-c p15">
						<button id="btn-add-direcciones" class="page-button" onclick="editAddress('')"><i class="fa fa-plus-circle"></i> &nbsp; Añadir una dirección</button>
					</div>
				</div>
			</div>

			<div class="card" style="margin-top: 10px; padding: 10px;">
				<div class="header-title">NOTA ADICIONAL DE ENTREGA</div>
				<Textarea id="nota-pedido" class="nota-entrega" placeholder="Ejemplo: Dejar con el portero"></Textarea>
			</div>

			<div id="resumen" class="card" style="margin-top: 10px; padding: 10px;">
				<div class="row" style="padding: 0 10px; margin-bottom: 10px">	
					<div class="header-title tx-c">CUPÓN</div>
					<button class="btn-cupones" onclick="showModal(true, 'cupones')">Cupones Disponibles <i class="fas fa-chevron-down"></i></button>
				</div>

				<div class="row r-c">
					<input id="txt-cupon" type="text" style="text-transform: uppercase;" class="input" autocomplete="false" />
					<button class="btn-aplicar" onclick="redimirCupon()">Aplicar</button>
				</div>
				
				<div id="lbl-coupon2"></div>
				<br>

				<div id="puntos3" class="border-bottom" style="display: none; padding: 0 20px 30px 20px">
					<div class="header-title tx-c">PAGA PUNTOS VIDA SANA</div>
					<div class="label-puntos"></div>
					<div id="redimir2">
						<div class="row row-center" style="justify-content:center">
							<div style="width: 180px;">
								<div id="range2" style="width:100%" class="slider-styled"></div>
							</div>
							<div id="lbl-puntos2" style="padding-left:30px; width:70px"><b>$0</b></div>
						</div>
						<br>
						<div class="redimir-info">Mínimo $5.000. Máximo hasta la mitad de tu compra sin superar $25.000</div>
					</div>
				</div>

				<div class="header-title">RESUMEN DE ORDEN</div>
				<table id="sumario2" class="tables tx-r"></table>

				<div class="frm-error" style="display:none"></div>
				<div id="confirmar2" class="tx-c p15" style="display:none">
					<button id="button-order2" onclick="checkout()" class="page-button">CONFIRMAR PEDIDO</button>
				</div>

				
			</div>

		</div>

		<div id="back-stickybox">
			<div id="stickybox" class="card" style="padding: 10px; margin-top: 20px; width: 330px;">

				<div class="row" style="padding: 0 10px; margin-bottom: 10px">	
					<div class="header-title tx-c">CUPÓN</div>
					<button class="btn-cupones" onclick="showModal(true, 'cupones')">Cupones Disponibles <i class="fas fa-chevron-down"></i></button>
				</div>

				<div class="row r-c">
					<input id="txt-cupon" type="text" style="text-transform: uppercase;" class="input" autocomplete="false" />
					<button class="btn-aplicar" onclick="redimirCupon()">Aplicar</button>
				</div>
				
				<div id="lbl-coupon"></div>
				<br>

				<div id="puntos2" class="border-bottom" style="display: none; padding: 0 20px 30px 20px">
					<div class="header-title tx-c">PAGA PUNTOS VIDA SANA</div>
					<div class="label-puntos"></div>
					<div id="redimir">
						<div class="row row-center" style="justify-content:center">
							<div style="width: 180px;">
								<div id="range" style="width:100%" class="slider-styled"></div>
							</div>
							<div id="lbl-puntos" style="padding-left:30px; width:70px"><b>$0</b></div>
						</div>
						<br>
						<div class="redimir-info">Mínimo $5.000. Máximo hasta la mitad de tu compra sin superar $25.000</div>
					</div>
				</div>

				<div class="header-title tx-c">RESUMEN DE ORDEN</div>
				<br>
				<table id="sumario" class="tables tx-r"></table>

				<div class="frm-error" style="display:none"></div>
				<div id="confirmar" class="tx-c p15" style="display:none">
					<button id="button-order" onclick="checkout()" class="page-button">CONFIRMAR PEDIDO</button>
				</div>

			</div>
		</div>
	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script>let device = '${device}';</script>
<script src="${ABS_URL}/js/direcciones.js"></script>
<script src="${ABS_URL}/js/pedido.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}