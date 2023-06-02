const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Mis Puntos", userCSS: true})}
${HTML.header}

<style>
	.titulo2 {
		font-family: 'Be Vietnam Pro', sans-serif;
		color: #333;
		font-weight: 600;
		padding-top: 10px;
	}

	.cuadro-azul>div {
		border: 1px solid #ccc;
		padding: 0 20px;
		border-radius: 5px;
		background: #fbf4ec;
		margin: 5px 0;
	}
</style>

<div id="content" style="background-color: transparent;">

	<div class="row bg-blanco" style="max-width: 800px;">
		${HTML.userMenu}
		<div class="form f1" style="border-left: 1px solid #eee; padding-left: 20px; align-self: flex-start;">

			<div id="tabs-menu" class="row r-l tab-menu">
				<div>Mis puntos</div>
				<div>¿Cómo funciona?</div>
				<div class="indicador"></div>
			</div>


			<div id="tabs-cont" class="tabs-cont">

				<div class="tabs" style="display: none;">

					<div class="border-cont">
						<div class="titulo2">Mis Puntos</div>
						<div class="puntos-disp">
							<img src="https://imperacore.net/assets/corazon.png" alt=""
								style="width: 30px; float: left;" />&nbsp;
							<span id="puntos-lbl"></span>
							<div id="plata-lbl" class="puntos-plata"></div>
						</div>
						<br>
					</div>
					<br><br>

					<div class="border-cont">
						<div class="titulo2">Historial de Puntos Obtenidos</div>
						<div style="max-height: 500px; overflow: auto; font-size:0.9em; padding-right:20px;">
							<table id="movimientos-tbl" class="simple-table">
								<thead></thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<br><br>

					<div class="border-cont">
						<div class="titulo2">Historial de Puntos Redimidos</div>
						<div style="max-height: 500px; overflow: auto; font-size:0.9em; padding-right:20px;">
							<table id="redenciones-tbl" class="simple-table">
								<thead></thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<br><br>

					<div class="border-cont">
						<div class="puntos-disp" style="background: #ecf5fb; border: 1px solid #b6bad4">
							<img src="https://imperacore.net/assets/ahorro.png" alt=""
								style="width: 26px; float: left;" />&nbsp;
							<span style="font-weight:300; font-family: 'Roboto'; font-size: 0.9em;">¡Tu ahorro
								disfrutado!</span>
							<div id="ahorro-lbl" class="puntos-plata" style="background: #128af7;"></div>
						</div>
						<br><br>
						<table style="min-width: 220px;">
							<tr>
								<td>Total puntos conseguidos</td>
								<td class="tx-right">&nbsp; <b><span id="conseguidos-lbl"></span></b></td>
							</tr>
							<tr>
								<td>
									<div style="height: 5px;"></div>
								</td>
								<td></td>
							</tr>
							<tr>
								<td>Total puntos canjeados</td>
								<td class="tx-right">&nbsp; <b><span id="canjeados-lbl"></span></b></td>
							</tr>
						</table>
					</div>

				</div>

				<div class="tabs" style="display: none;">

					<div class="border-cont" style="padding-top: 0;">
						<p class="tx-center"><img src="https://imperacore.net/assets/logo_vida.jpg" alt=""
								style="width: 250px;" /></p>
						<span class="tx-center"
							style="display:block; color:#fa7800; font-size: 1.4em; margin-top: -8px;">Bienestar para
							<b>TODOS</b></span>

					</div>
					<br>

					<div class="border-cont">
						<div class="titulo2">¿Cómo funciona?</div>
						<h3>Acumula puntos y ¡Ahorra ciudándote!</h3>
						<p>El programa gratuito de recompensas que te premia por tu fidelidad, podrás ganar puntos y
							canjearlos en tu compra. ¡Empieza a ahorrar!</p>
					</div>
					<br>

					<div class="cuadro-azul">
						<div>
							<div class="titulo2">1. Gana puntos con cada compra</div>
							<p>Realiza un pedido y gana 1 punto por cada $100 que compres</p>
						</div>
						<div>
							<div class="titulo2">2. Acumula puntos</div>
							<p>En tu cuenta podrás ver el saldo de puntos y su equivalencia en descuento apra ahorrar en
								tus futuras compras. Cuantos más puntos acumules, mas ahorro tendrás.</p>
						</div>
						<div>
							<div class="titulo2">3. ¡Y Ahorra!</div>
							<p>Premiamos tu fidelidad. Usa tus puntos como forma de pago y ahorra en tu compra.</p>
						</div>
					</div>
					<br>

					<div class="border-cont">
						<div class="titulo2">¿Qué es el Club Vida Sana?</div>
						<h3>Acumula puntos y ahorra con el club vida sana</h3>
						<p>Es un Club de beneficios para clientes de Droguería La Economía en donde encontrarás ofertas
							especiales, recomendaciones de salud y muchos beneficios más.</p>

					</div>
					<br>

					<div class="col2">
						<div class="border-cont">
							<div class="titulo2">Beneficio de ser miembro del Club Vida Sana</div>
							<ul style="list-style: disc; padding-left: 20px">
								<li>Descuentos hasta del 20% en medicamentos.</li>
								<li>Consejos de salud.</li>
								<li>Puntos Vida Sana.</li>
							</ul>
						</div>

						<table class="tb-regalo">
							<tr>
								<td style="background-color: #fa7800; color: #fff">Puntos</td>
								<td style="background-color: #fa7800; color: #fff">Bonos regalo</td>
							</tr>
							<tr>
								<td>5.000</td>
								<td>$5.000</td>
							</tr>
							<tr>
								<td>10.000</td>
								<td>$10.000</td>
							</tr>
							<tr>
								<td>15.000</td>
								<td>$15.000</td>
							</tr>
							<tr>
								<td>20.000</td>
								<td>$20.000</td>
							</tr>
							<tr>
								<td>25.000</td>
								<td>$25.000</td>
							</tr>
							<tr>
								<td colspan="2" style="background-color: #fa7800; color: #fff">Por cada $100 acumula 1
									punto</td>
							</tr>
						</table>


					</div>

				</div>

			</div>

		</div>


	</div>

</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}js/puntos.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}