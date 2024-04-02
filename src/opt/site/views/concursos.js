const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (device) => {
return /*html*/`
${HTML.head({title: "Concursos"})}
${HTML.header}
<style>

    .back-banner {
        font-size:0; 
        background: #eecf9d;
        text-align: center;
    }

    .marron {
        background: #5b351e;
        color: white;
    }

    .texto-marron {
        padding: 10px 10px 70px 10px;
        max-width: 1000px;
        font-size: 0.85em;
        font-weight: 300;
        margin: 0 auto;
    }

    
    .bg-blanco-form {
        max-width: 640px;
        margin: 20px auto;
        background: #f9f9f9;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 8px;
        box-shadow: 1px 1px 10px 0 rgba(0,0,0,0.3);
    }


</style>
<div id="content" style="background-color: #fff6eb;">

    <div class="back-banner">
        <img src="${device == "PHONE" ? "assets/banner_concursom.jpg" : "assets/banner_concurso.jpg"}" alt="banner" style="width: 100%; max-width: 1440px"/>
    </div>
    <div class="marron">
        <div class="texto-marron">
            <p>
                <b>Términos y condiciones:</b> Actividad válida del 10 al 30 de abril de 2024 o hasta agotar existencias. Las tarjetas del parque de diversiones AFRICA están
cargadas con 1 hora de juego libre. Las tarjetas tienen vigencia hasta el 30 de junio de 2024. El tiempo de duración de la tarjeta comienza a correr desde el uso del primer juego. Las tarjetas serán entregadas luego de inscribirse en el formulario de la actividad. Ganarán los primeros 100 clientes en inscribirse. El parque de diversiones AFRICA esta ubicado en la ciudad de Barranquilla en el centro comercial Mall Plaza.
            </p>
        </div>      
    </div>

    <div class="max-width bg-blanco-form" style="transform: translateY(-80px)">
        <iframe src=https://docs.google.com/forms/d/e/1FAIpQLSfFQT98bVIGp0UX-5ZfcnMemtck8HxJptBMvrlMCq6HcMKjbA/viewform?embedded=true width="100%" height="${device == "PHONE" ? "1800" : "1550" }" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
    </div>

    <div style="height: 10px"></div>

</div>

${HTML.footer}
${HTML.scripts}
<script>let device = '${device}';</script>
<script src="${ABS_URL}/js/header.js"></script>
<script src="${ABS_URL}/js/concursos.js"></script>
</body></html>`}