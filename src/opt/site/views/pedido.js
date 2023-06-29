const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Pedido"})}
${HTML.header}

<style>
	.btn-aplicar {
		padding: 0 8px;
		background: #fa7800;
		color: white;
		font-weight: 600;
		text-align: center;
		border: none;
		height: 30px;
		border-radius: 0 4px 4px 0;
		font-size: 0.8em;
		font-family: 'Be Vietnam Pro';
		letter-spacing: 1px;
	}

	.nota-entrega {
		border: 1px solid #ccc;
		margin: 10px auto;
		width: 92%;
		display: block;
		padding: 10px;
		font-family: "Roboto";
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
		border: 1px solid #aaa;
		border-radius: 4px;
	}

	#order2 {
		display: flex;
		justify-content: flex-start;
		max-width: 800px; 
		margin: 0 auto;
	}

	#back-stickybox {
		width: 250px;
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

			<div class="card" style="padding: 10px;">

				<div class="header-title">1. INGRESA TU CUPÓN DE DESCUENTO</div>

				<div style="padding: 0 10px;">

					<div class="row">
						<input id="txt-cupon" type="text" style="text-transform: uppercase; border-radius: 0;"
							class="input" autocomplete="false" />
						<button class="btn-aplicar" onclick="redimirCupon()">Aplicar</button>
						<div class="f1"></div>
						<button class="btn-cupones" onclick="showModal(true, 'cupones')">Cupones de Descuento &nbsp;<i
								class="fas fa-chevron-down"></i></button>
					</div>
					<div id="lbl-coupon"></div>
				</div>
			</div>

			<div id="bono-card" class="card" style="margin-top: 10px; padding: 10px; display: none">
				<div class="header-title">BONO DE DESCUENTO</div>
				<div id="bono" class="bono">
				</div>
			</div>

			<div class="card" style="margin-top: 10px; padding: 10px;">
				<div class="header-title">2. FORMA DE PAGO</div>

				<div id="forma-pago">

					<div id="payment-list" class="select-list">
						<!-- <div data-value="PSE">
                            <div style="width: 25px;"><i class="fa fa-check"></i></div>
                            <div class="image" style="background-image: url(assets/globalpay.png)"></div>
                            <span><b>PSE Tarjeta Debito y Crédito</b> (Online)</span>
                        </div> -->
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
				<div class="header-title">3. DIRECCIÓN DE ENTREGA</div>

				<div>
					<div id="address-list" class="vselect-list"></div>
					<div class="tx-c p15">
						<button class="page-button-flat2 button-pink" onclick="editAddress('')"><i
								class="fa fa-plus-circle"></i> &nbsp; Añadir una dirección</button>
					</div>
				</div>
			</div>

			<div class="card" style="margin-top: 10px; padding: 10px;">
				<div class="header-title">4. NOTA ADICIONAL DE ENTREGA</div>
				<Textarea id="nota-pedido" class="nota-entrega" placeholder="Ejemplo: Dejar con el portero"></Textarea>
			</div>

			<div id="resumen" class="card" style="margin-top: 10px; padding: 10px;">
				<div class="header-title">RESUMEN DE ORDEN</div>
				<table id="sumario2" class="tables tx-r"></table>

				<div class="frm-error" style="display:none"></div>
				<div id="confirmar2" class="tx-c p15" style="display:none">
					<button id="button-order2" onclick="checkout()" class="page-button">CONFIRMAR PEDIDO</button>
				</div>
			</div>

		</div>

		<div id="back-stickybox">
			<div id="stickybox" class="card" style="padding: 10px; margin-top: 20px; width: 230px;">

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
<script src="${ABS_URL}/js/direcciones.js"></script>
<script src="${ABS_URL}/js/pedido.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}