const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Aviso de Privacidad"})}
${HTML.header}

<div id="content" style="background-color: transparent;">
	<div class="bg-blanco" style="text-align: justify;">
		<h2>AVISO DE PRIVACIDAD A SER USADO EN LOS PROCESOS DE RECOLECCIÓN DE INFORMACIÓN PERSONAL</h2><p class="mt-3"><b>Aviso de privacidad:</b> ETICOS SERRANO GÓMEZ LTDA., en adelante ETICOS comunica que el suministro de datos personales a través de este portal web implica la autorización del titular para que estos sean tratados de manera segura, confidencial y responsable para fines de establecer contacto e informar sobre nuestros productos, servicios, actividades, ofertas, promociones, alianzas, entre otras actividades empresariales; datos personales que serán tratados en el marco de las relaciones precontractuales, contractuales y post contractuales, aplicando lo dispuesto en el régimen de la ley 1581 de 2012 y/o ley 1266 de 2008, según sea el caso. Esta información será gestionada en una infraestructura informática segura por parte ETICOS y/o de sus encargados; quienes podrán estar ubicados en territorio colombiano o en países como Estados Unidos, Canadá o ubicados en el territorio de la Unión Europea.<br><br>El tratamiento se realizará en cumplimiento de lo dispuesto en la política de privacidad la cual puede consultar a través del siguiente enlace:<a class="text-information-blue" href="/information/hebeasdata">www.farmaciatorres.com</a><br>  <br>Si usted no está de acuerdo con el tratamiento antes informado o las condiciones expuestas, por favor no diligencie este formato.<br>  <br>Para el ejercicio del Habeas Data, el titular del dato personal o quien demuestre un legítimo interés conforme lo señalado en la normatividad vigente, podrá hacerlo a través del siguiente correo electrónico  <a class="text-information-blue" href="mailto:habeasdata@eticos.com">habeasdata@eticos.com</a>  o a través de la línea telefónica (57) (5) 3605274 ext.1000 Barranquilla. Quien ejerza el habeas data deberá suministrar con precisión los datos de contacto solicitados para efecto de tramitar, atender y responder su solicitud y desplegar las cargas para el ejercicio de sus derechos. Recibida la solicitud de ejercicio de Habeas Data, ETICOS dará respuesta en los términos de ley.</p>
	</div>
</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}