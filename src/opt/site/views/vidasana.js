const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Vida Sana"})}
${HTML.header}

<div id="content" style="background-color: transparent;">

	<div id="pages-beneficios" class="bg-blanco" style="max-width: 1200px;">
		<img src="${ABS_URL}assets/img_vidasana.jpg" alt="vidasana img" width="100%">
	</div>

</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}