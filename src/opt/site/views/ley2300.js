const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = () => {
return /*html*/`
${HTML.head({title: "Ley 2300"})}
${HTML.header}

<style>
	
.banner-static {
    position: relative;
}


.banner-abs-text {
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    box-sizing: border-box;
    background: linear-gradient(90deg, rgba(255,255,255,0.9) 70%, rgba(255,255,255,0) 100%);
    font-size: 1.2em;
    line-height: 1.1em;
    color: #344054;
}

.banner-title {
    color:#1C58B7;
    font-size: 1.5em;
    font-weight: 900;
    padding-bottom: 15px;
}

#banner-img {
    font-size: 0;
}

.vida-title {
    color: #1C58B7;
    font-weight: 900;
    font-size: 1.4em;
    text-align: center;
    font-family: 'Poppins', sans-serif;
}

.texto-pequeno {
    font-size: 0.7em;
}

.vida-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
}

.info-item {
    padding: 20px 0 0 0;
    box-sizing: border-box;
    background-color: #ECF4FC;
    text-align: center;
    border-radius: 16px;
    box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.1);
}

.info-item img {
    width: 50%;
}

.info-item .text {
    font-size: 0.9em;
    line-height: 1.2em;
    padding: 20px 15px;
}

.form2-cont {
    background-color: white;
    width: 100%;
    max-width: 800px;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 1px 1px 5px 0 rgba(0,0,0,0.1);
}

.form2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    row-gap: 20px;
}

.form2 .label {
    font-size: 0.9em;
    padding-left: 3px;
    padding-bottom: 4px;
}

.form2 input[type="text"], .form2 select {
    width: 100%;
    border: 1px solid #98A2B3;
    border-radius: 4px;
    padding: 4px;
    outline: none;
    font-size: 1.0em;
    font-family: 'Poppins', sans-serif;
}

.form2 label {
    font-size: 0.8em;
    padding: 10px 2px;
}

.rowfix {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.rowbreak {
    display: flex;
    justify-content: space-between;
    align-items: center; 
}

.btn-primary-vida {
    background: #1C58B7;
    border:none;
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
}
.btn-primary-vida:hover {
    background: #0f3b82;
    cursor: pointer;
}
.tx-c {
    text-align: center;
}

.tx-r {
    text-align: right;
}


.image-deco {
    display: inline-block;
    font-size: 0;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 1px 1px 10px 0 rgba(0,0,0,0.1);
}

.image-deco img {
    width: 100%;
}

#puntos {
    display: inline-block;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    transform: translateX(80px);
    box-shadow: 1px 1px 10px 0 rgba(0,0,0,0.1);
    font-size: 1.3em;
    box-sizing: border-box;
}

.table-puntos {
    width: 100%;
    border-collapse: collapse;
}
.table-puntos thead td:first-child {
    width: 40%;
}
.table-puntos thead td {
    color: #1C58B7;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    text-align: left;
    font-size: 1.3em;
    padding: 8px;
}

.table-puntos tbody td {
    padding: 8px;
    text-align: left;
}

.table-puntos tbody tr:nth-child(even) {
    background-color: #F2F4F7;
}
.texto-ahorra-cont {
    color: white; 
    font-size: 1.3em; 
    text-align: center; 
}

.texto-ahorra {
    display: inline-block;
    width: 40%;
    font-size: 1.3em;
    border-right: 2px solid white;
    margin-right: 40px;
    font-weight: bold;
    padding-right: 20px;
}

.col2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.row-center {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#alert-cont {
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    left: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background: #54545466;
}

#alert-cont .alert {
    width: 100%;
    max-width: 480px;
    min-height: 30px;
    font-size: 1.2em;
    background: #D6F3E9;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    pointer-events: all;
    user-select: none;
    border: 1px solid rgba(0, 128, 0, 0.186);
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.15);
}

.conoce {
    text-align: center;
    transform: translateX(51px);
    width: 338px;
    display: inline-block;
    padding-bottom:10px;
}

#logovida {
    display: none;
}

@media only screen and (max-width: 800px) {

    .conoce {
        display: block;
        transform: translateX(0px);
        font-size:0.9em;
        width: 100%;
    }

    .rowbreak {
        display:block;
    }

    #puntos {
        transform: translateX(0);
        width:100%;
        font-size: 1.1em;
        margin-bottom:20px;
    }

    .texto-ahorra-cont {
        font-size: 1.1em;
    }

    .texto-ahorra {
        border:none;
        display: block;
        margin-bottom: 20px;
        width: 100%;
    }

    .form2 {
        grid-template-columns: 1fr;
    }

    .form2 label {
        font-size: 0.9em;
        padding: 14px 2px;
    }

    .vida-title {

        font-size: 1.2em;
    }

    .vida-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .banner-title {
        font-size: 1.1em;
        font-weight: 900;
        padding-bottom: 10px;
    }

    .banner-abs-text {
        width:70%;
        padding: 30px;
    }

    .banner-text {
        font-size: 0.7em;
    }

    #logovida {
        display: block;
    }

}


</style>

<div id="content">

	<div id="alert-cont" style="display:none">
        <div class="alert">
            <div class="rowfix" style="justify-content: flex-start;">
                <div style="font-size: 0; margin-right: 15px;"><img src="assets/check.svg" alt="" style="width: 40px;" /></div>
                <div>
                    <h3 style="margin-bottom: 2px; margin-top: 0;">¡Gracias por actualizar tus datos!</h3>
                    ¡Tu información ha sido actualizada con éxito!
                </div>
            </div>
        </div>
    </div>



	<div class="banner-static">
		<div class="banner-abs-text">
			<div>
				<div class="banner-title">¡Sigamos en contacto! </div>
				<div class="banner-text">Actualiza tus datos personales para que sigas recibiendo todos nuestros beneficios. <b>¡No te pierdas nada!</b></div>
                <img id="logovida" src="assets/logvida.svg" alt="" style="width: 95px;margin: 20px;">
			</div>
		</div>
		<div id="banner-img"><img src="assets/banner.jpg" alt="" style="width: 100%;"></div>
	</div>

    <section style="background-color: #F2F4F7; display: flex; justify-content: center; margin-bottom: -80px;">
        
        <div class="form2-cont" style="transform: translateY(-40px);">

            <div class="vida-title" style="text-align: left;">Queremos conocer tu opinión</div>
            <div class="texto-pequeno">De acuerdo con la Ley 2300 de 2023, Droguería La Economía te invita a escoger los canales por los que prefieres ser contactado para fines comerciales y/o publicitarios. Así seguirás disfrutando de la acumulación de puntos y ofertas todos los días.</div>

            <div class="form2" style="margin: 20px 0;">
             
                <div>
                    <div class="label">Nombre(s)</div>
                    <div class="field"><input type="text" id="vs-nombres"/></div>
                </div>

                <div>
                    <div class="label">Apellidos</div>
                    <div class="field"><input type="text" id="vs-apellidos"/></div>
                </div>

                <div>
                    <div class="label">Tipo de Documento</div>
                    <div class="field">
                        <select id="vs-tipodoc">
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="PA">Pasaporte</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div class="label">Número de identificación</div>
                    <div class="field"><input type="text" id="vs-documento"/></div>
                </div>
    
                <div>
                    <div class="label">Correo Electrónico</div>
                    <div class="field"><input type="text" id="vs-email"/></div>
                </div>

                <div>
                    <div class="label">Número de celular</div>
                    <div class="field"><input type="text" id="vs-celular"/></div>
                </div>
    
                <div>
                    <div class="label" style="padding-left: 0; margin-bottom: 10px;">¿Por cuál medio te gustaría que te contactáramos?</div>
                    <div class="row-center">
                        <input id="vs-todas"  type="checkbox" /><label for="vs-todas">Seleccionar Todas</label>
                    </div>
                        <br>
                    <div class="col2">
                        <div class="row-center">
                            <input id="vs-texto"  type="checkbox" /><label for="vs-texto">SMS</label>
                        </div>
                        <div class="row-center">
                            <input id="vs-correo" type="checkbox" /><label for="vs-correo">Email</label>
                        </div>
                        <div class="row-center">
                            <input id="vs-llamada" type="checkbox" /><label for="vs-llamada">Llamadas</label>
                        </div>
                        <div class="row-center">
                            <input id="vs-whatsapp"  type="checkbox" /><label for="vs-whatsapp">Whatsapp</label>
                        </div>
                    </div>
                </div>

            </div>
          
            <button class="btn-primary-vida" onclick="enviarVida(this)">Enviar</button>
    
            <div class="texto-pequeno" style="padding-top: 20px; font-size: 0.7em; font-weight: 300; color:#555">ETICOS LTDA, en adelante ETICOS, informa que los datos personales que se recolectan a través de este formato se requieren para que usted escoja los canales por los que prefiere ser contactado para fines comerciales y/o publicitarios, si está de acuerdo con este tratamiento por favor continúe con en este formulario. Si usted desea dejar de recibir información promocional o publicitaria, puede escribirnos al correo habeasdata@eticos.com donde debe especificar su cédula para identificarlo y proceder a eliminarlo de la base de datos.</div>
        
            
        </div>
    </section>

	<section style="background-color: #D8E9F9; padding-top: 80px; padding-bottom: 20px;">
		
		<div class="max-width">
		
			<div class="vida-title">Continúa obteniendo los siguientes beneficios por ser miembro del Club Vida Sana:</div>
            <br>
			<div class="vida-grid">
				<div class="info-item">
					<img src="assets/iconv1.svg" alt="" />
					<div class="text">Ofertas y descuentos exclusivos</div>
				</div>
				<div class="info-item">
					<img src="assets/iconv2.svg" alt="" />
					<div class="text">Acumula puntos en tus compras</div>
				</div>
				<div class="info-item">
					<img src="assets/iconv3.svg" alt="" />
					<div class="text">Redime tus puntos y ahorra hasta 50% en tus compras</div>
				</div>
				<div class="info-item">
					<img src="assets/iconv5.svg" alt="" />
					<div class="text">Consejos de salud para ti y tu familia</div>
				</div>
			</div>

		</div>
        <p>&nbsp;</p>

	</section>

        
	<section class="max-width" style="padding: 40px; padding-bottom: 90px">
		<div class="vida-title">Redime tus puntos en Farmacia Torres</div>
		<p class="tx-c" style="max-width: 800px; margin: 20px auto;">Aprovecha las mejores ofertas redimiendo tus puntos en nuestras droguerías o nuestras plataformas virtuales.</p>
		<p>&nbsp;</p>


		<div class="rowbreak tx-r">
			<div style="flex:1;">
                <h2 class="conoce">Conoce nuestra tabla de puntos</h2>
				<div id="puntos">
					<table class="table-puntos">
						<thead>
							<tr>
								<td>Puntos</td>
								<td>Premios</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>5.000</td>
								<td>Bono $5.000</td>
							</tr>
							<tr>
								<td>10.000</td>
								<td>Bono $10.000</td>
							</tr>
							<tr>
								<td>15.000</td>
								<td>Bono $15.000</td>
							</tr>
							<tr>
								<td>20.000</td>
								<td>Bono $20.000</td>
							</tr>
							<tr>
								<td>25.000</td>
								<td>Bono $25.000</td>
							</tr>
						</tbody>
					</table>
					<div class="texto-pequeno" style="padding-top: 20px; font-size: 0.7em; font-weight: 300; color:#555; text-align: left;">*Paga hasta el 50% de tu compra con puntos.</div>
				</div>
			</div>
			<div style="w50">
				<div class="image-deco">
					<img src="assets/cliente.jpg" alt="" />
				</div>
			</div>
		</div>


	</section>


	<section style="padding: 40px; background-color: #1C58B7;">
		<div class="max-width">
			<div class="texto-ahorra-cont">
				<div class="texto-ahorra">¡Ahorra comprando y pagando en Farmacia Torres</div>
				<img src="assets/logo-torres.svg" alt="" style="width: 300px;" />
			</div>
		</div>
	</section>


</div>

${HTML.footer}
${HTML.scripts}
<script src="${ABS_URL}/js/ley2300.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}