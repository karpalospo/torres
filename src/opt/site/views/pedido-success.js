const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (id) => {
return /*html*/`
${HTML.head({title: "Confirmación de Pedido"})}
${HTML.header}

<style>
	.resultado {
		text-align: center;
		color: #fff;
		margin-top: 18px;
		margin-bottom: 10px;
		border-radius: 5px;
		font-weight: 500;
		box-shadow: 1px 1px 5px 0 rgb(0 0 0 / 10%);
	}

	.dashed-line {
		height: 5px;
		margin-top: 5px;
		border-bottom: 2px dashed #ccc;
		margin-bottom: 5px;
	}
</style>

<div id="content" style="background-color: #f2f2f2;">
	<div style="max-width: 800px; margin: 0 auto;">

		<div class="resultado"></div>
		<div class="row r-t">

			<div class="card f1">
				<div id="items-list" class="cart-list"></div>
			</div>

			<div id="datos-cliente" class="card" style="width: 280px; margin-left: 15px; font-size: 0.8em;"></div>
		</div>
		<br><br>
	</div>
</div>
${HTML.footer}
${HTML.scripts}
<script>let id = "${id}";</script>
<script src="${ABS_URL}/js/pedido-success.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}