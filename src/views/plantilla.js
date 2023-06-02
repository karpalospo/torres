const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Perfíl"})}
${HTML.header}

<div id="content" style="background-color: transparent;">

	
</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}js/perfil.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}