const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Nuestra Historia"})}
${HTML.header}

<div id="content" style="background-color: transparent;">

	<div class="bg-blanco">
		<div>
			<h2 class="text-center">HISTORIA</h2>
			<br>
			<img src="https://imperacore.net/assets/pasilloEcoBLUR.jpg" alt="" style="width: 100%"/>
			<p class="mt-2">Somos una cadena de droguerías líder en el suministro de medicamentos, productos de higiene personal, cuidado del bebé y cosméticos entre otros, que tiene como compromiso principal la salud y el bienestar de nuestros clientes.<br>  <br><b>1.979 El inicio</b><br>  <br>Fundada en Febrero de 1.979 en Valledupar como distribuidora mayorista en el sur de la Guajira y el Cesar.<br>  <br><b>1.984 El crecimiento</b><br>  <br>Se inaugura la primera sucursal de Farmacia Torres en Barranquilla iniciándose así nuestra cadena de droguerías con cubrimiento en toda la costa norte de Colombia distinguiéndose por su excelencia operacional, procesos innovadores, un extenso surtido y calida atención.<br>  <br><b>1.990 La expansión</b><br>  <br>Con el propósito de mejorar los procesos de distribución y atención de nuestros clientes, se inició operaciones desde el nuevo centro de distribución en Barranquilla el 2 de Diciembre de 1.990, en Sincelejo el primero de de Diciembre de 2.000, en Bogotá el 26 de septiembre de 2006 y en Cali el 23 de Abril de 2008 Actualmente Farmacia Torres es la mejor opción en atención farmacéutica y es símbolo de innovación y confianza. Contamos con más de 50 sucursales en el país y más de 1.700 empleados comprometidos con la satisfacción total de nuestros clientes.</p>
		</div>
	
		<br><br>
		<div class="row r-t">
			<div>
			<h2 class="text-center">MISIÓN</h2><p>Estamos dedicados a proteger la salud a través de la comercialización de productos farmacéuticos, productos para el cuidado del bebé, cosméticos y de higiene personal con cubrimiento nacional ofreciendo calidad, seguridad y economía para toda la comunidad con un equipo humano comprometido en el mejoramiento continuo para el bienestar de los usuarios, empleados y accionistas.</p>
			</div>
			
			<div style="padding-left: 10px;"><h2 class="text-center">VISIÓN</h2><p>Seremos innovadores, liderando el sistema de comercialización y distribución de productos que proporcionan bienestar a la comunidad, excediendo las expectativas de clientes y proveedores, contando con un recurso humano idóneo y comprometido, que garantice la excelencia operacional con responsabilidad social y brindando un adecuado retorno a los socios.</p>
			</div>
		</div>
	
	</div>


</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}