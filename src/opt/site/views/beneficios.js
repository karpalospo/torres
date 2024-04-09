const HTML = require("./global.js")
const ABS_URL = HTML.ABS_URL;

module.exports = (device) => {
return /*html*/`
${HTML.head({title: "Vida Sana"})}
${HTML.header}

<link href="${ABS_URL}/css/plugins_vida.css" rel="stylesheet" />
<link href="${ABS_URL}/css/styles_vida.css" rel="stylesheet" />

<div id="alert-cont" style="display:none">
        <div class="alert">
            <div class="rowfix" style="justify-content: flex-start;">
                <div id="imgok" style="font-size: 0; margin-right: 15px; display:none"><img src="${ABS_URL}/assets/check.svg" alt="" style="width: 40px;" /></div>
                <div id="imgerror" style="font-size: 0; margin-right: 15px; display:none"></div>
                <div>
                    <h3 id="msg1" style="margin-bottom: 2px; margin-top: 0;"></h3>
                    <span id="msg2"></span>
                </div>
            </div>
        </div>
    </div>


    <div class="porta-medida max-width" style="position:absolute; z-index:-1; pointer-events: none;"><div id="medida" class="products-list"></div></div>

    <div class="banner-static2" style="background-color: #ddd; font-size: 0; margin-top:90px">
        <div id="banner1" style="width: 100%;" class="swiper">
            <div class="swiper-wrapper"></div>
            <div class="swiper-button-next"></div><div class="swiper-button-prev"></div>
        </div>

    </div>

	<div id="registro"></div>
    <div class="h30"></div>
    <div class="row2 max-width">
        <div class="form2-cont w50">

            <div class="vida-title" style="font-weight: 500;">Regístrate y <b>recibe muchos beneficios</b> siendo parte del <b>Club Vida Sana</b></div>


            <div id="frm-registro" class="form2" style="margin: 20px 0;">

                <div>
                    <div class="label">Nombre(s)</div>
                    <div class="field"><input type="text" id="vs-nombres" name="nombres"></div>
                </div>

                <div>
                    <div class="label">Apellidos</div>
                    <div class="field"><input type="text" id="vs-apellidos" name="apellidos"></div>
                </div>

                <div>
                    <div class="label">Tipo de Documento</div>
                    <div class="field">
                        <select id="vs-tipodoc" name="tdocumento">
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="PA">Pasaporte</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div class="label">Número de identificación</div>
                    <div class="field"><input type="text" id="vs-documento" name="nit"></div>
                </div>

                <div>
                    <div class="label">Género</div>
                    <div class="field"><select id="vs-genero" name="gender">
                        <option value="0">Seleccione...</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="X">Sin Especificar</option>
                    </select></div>
                </div>

                <div>
                    <div class="label">Fecha de Nacimiento</div>
                    <div class="field"><input id="vs-nacimiento" type="date" placeholder="AAAA-MM-DD" name="dateOfBirth"></div>
                </div>

                <div>
                    <div class="label">Ciudad o Municipio de residencia</div>
					<div class="field">
						<div class="autocomplete" style="width:100%">
							<input id="vs-ciudad" type="text">
						</div>
					</div>
                </div>

                <div>
                    <div class="label">Número de celular</div>
                    <div class="field"><input type="text" id="vs-celular" name="cellphone"></div>
                </div>
    
            </div>

			<div>
				<div class="label2">Correo Electrónico</div>
				<div class="rowfix2" style="justify-content: flex-start">
					
					<input type="text" class="field2" id="vs-email" name="email" style="width:50%">
					<div class="rowfix2">
						<div>&nbsp;@&nbsp;</div>
						<select id="vs-terminacionemail" class="field2" style="display: inline-block; min-width: 100px;">
						<option value="gmail.com">gmail.com</option>
						<option value="hotmail.com">hotmail.com</option>
						<option value="yahoo.com">yahoo.com</option>
						<option value="live.com">live.com</option>
						<option value="outlook.com">outlook.com</option>
						<option value="otro">OTRO</option>
						</select>
					</div>
				</div>
			</div>

			<div style="height:30px"></div>

            <div>
                <div class="label" style="padding-left: 0; margin-bottom: 10px; font-weight: 600">¿Por cuál medio te gustaría que te contactáramos?</div>
                
                <div class="col2">
                    <div class="row-center">
                        <input id="vs-todas" type="checkbox"><label for="vs-todas">Seleccionar Todas</label>
                    </div>
                    <div class="row-center">
                        <input id="vs-texto" type="checkbox"><label for="vs-texto">Mensaje de texto</label>
                    </div>
                    <div class="row-center">
                        <input id="vs-correo" type="checkbox"><label for="vs-correo">Correo Electrónico</label>
                    </div>
                    <div class="row-center">
                        <input id="vs-llamada" type="checkbox"><label for="vs-llamada">Llamadas telefónicas</label>
                    </div>
                    <div class="row-center">
                        <input id="vs-whatsapp" type="checkbox"><label for="vs-whatsapp">Whatsapp</label>
                    </div>
                </div>
            </div>

            <div class="texto-pequeno" >ETICOS LTDA, en adelante ETICOS, informa que los datos personales que se recolectan a través de este formato se requieren para que usted escoja los canales por los que prefiere ser contactado para fines comerciales y/o publicitarios, si está de acuerdo con este tratamiento por favor continúe con en este formulario. Si usted desea dejar de recibir información promocional o publicitaria, puede escribirnos al correo habeasdata@eticos.com donde debe especificar su cédula para identificarlo y proceder a eliminarlo de la base de datos.</div>
            <br>
            <div class="row-center">
                <input id="vs-acepto" type="checkbox" style="margin-right: 20px"><label for="vs-acepto" class="texto-pequeno"> Acepto <a href="#" target="_blank" class="link">Términos y condiciones</a>, Acepto ser miembro del <a href="#" target="_blank" class="link">Club Vida Sana</a> y autorizo el <a href="#" target="_blank">Tratamiento de mis datos personales con las siguientes condiciones</a></label>
            </div>
            <br>
            <button class="btn-primary-vida" onclick="enviarVida2(this)">Registrarme</button>

        </div>
        <div class="separator"></div>
        <div class="flex1">

            <div id="tab-menu" class="tab-menu" style="margin:20px 0 0 0">
                <div>Club Vida Sana</div>
                <div>Club Vida Sana Silver</div>
            </div>
            <div class="h30"></div>
            <div id="tabs-cont">
                <div class="tabs">

                    <div class="vida-title">¿Qué es el Club Vida Sana?</div>
                    <p>El Club Vida Sana es un programa de fidelización para clientes de la cadena de droguerías de Eticos donde podrán disfrutar de ofertas y descuentos exclusivos en los productos seleccionados.</p>
                    <p>También podrá acumular puntos cada vez que realicen compras y podrán redimirlos al pagar en cualquiera de nuestras sucursales de Droguería La Economía, Farmacia Torres e Ísimo o por las plataformas virtuales.</p>
                    <br><br>
                    <div class="vida-title">Beneficios para los clientes Club Vida Sana</div>
                    <br>
                    <div class="iconos">
                        <img src="${ABS_URL}/assets/iconv2.svg" alt=""/>
                        <div>Acumulación y redención de Puntos Vida Sana</div>
                    </div>
                    <br>
                    <div class="iconos">
                        <img src="${ABS_URL}/assets/iconv3.svg" alt=""/>
                        <div>Los clientes que compren en La Economía, Farmacia Torres e Isimo tendrán derecho a disfrutar de las alianzas de la categoría de belleza, entretenimiento, diversión y mucho más.</div>
                    </div>
                    <br>
                    <div class="iconos">
                        <img src="${ABS_URL}/assets/iconv5.svg" alt=""/>
                        <div>Consejos e Información sobre temas de salud a través del Blog Club Vida Sana y redes sociales.</div>
                    </div>
                </div>

                <div class="tabs">
                    <div class="vida-title">¿Qué es el Club Vida Sana Silver?</div>
                    <p>El Club Vida Sana Silver es un programa de beneficios para clientes frecuentes de terapia crónica como pacientes de Hipertension, Diabetes, Asma, Artristis, Glaucoma, Tiroides, Epilepsia, Reemplazo Hormonal, entre otras. Los miembros Silver tendrán un descuento permanente del 5% en productos seleccionados, ofertas y descuentos exclusivos en los productos de compra frecuente.</p><p>También podrá acumular puntos cada vez que realicen compras y podrán redimirlos al pagar en cualquiera de nuestras sucursales de Droguería La Economía, Farmacia Torres e Ísimo, por medio del call center o por las plataformas virtuales.</p>
                    <br><br>
                    <div class="vida-title">Beneficios para los clientes Club Vida Sana Silver</div>
                    <br>

					<div class="myswiper-wrapper">

						<div class="myswiper-slide">
							<div class="col2">
								<div class="iconos">
									<img src="${ABS_URL}/assets/iconv6.svg" alt=""/>
									<div>Jornadas de salud con médicos especialistas</div>
								</div>
								<div class="iconos">
									<img src="${ABS_URL}/assets/iconv3.svg" alt=""/>
									<div>Descuento permanente del 5% en productos seleccionados</div>
								</div>
								<div class="iconos">
									<img src="${ABS_URL}/assets/iconv2.svg" alt=""/>
									<div>Acumulación de puntos en las compras</div>
								</div>
								<div class="iconos">
									<img src="${ABS_URL}/assets/iconv5.svg" alt=""/>
									<div>Consejos de salud a través del Blog Club Vida Sana y redes sociales</div>
								</div>
							</div>
						</div>

						<div class="myswiper-slide">
							<div class="col2" style="grid-template-columns: 1fr; font-size: 0.85em;">
								<div class="iconos">
									<img src="${ABS_URL}/assets/iconv1.svg" alt=""/>
									<div>Participación en los planes de beneficio en marcas seleccionadas, ofertas y descuentos exclusivos</div>
								</div>
								<div class="iconos">
									<img src="${ABS_URL}/assets/iconv2.svg" alt=""/>
									<div>Redención de puntos al pagar su factura. Podrá redimir hasta el 50% de su compra con puntos acumulados en nuestras tiendas físicas o en las plataformas virtuales</div>
								</div>
								<div class="iconos">
									<img src="${ABS_URL}/assets/iconv7.svg" alt=""/>
									<div>Descuentos en nuestra red de aliados en todo el país como centros de radiología, laboratorios clínicos, odontología, gimnasios, consultorios médicos, etc.</div>
								</div>
							</div>
						</div>

					</div>

					<div class="punticos">
						<div><div class="color"></div></div>
						<div><div class="color"></div></div>
					</div> 
                
                </div>

            </div>

        </div>

    </div>
    <div class="h30"></div>


    <section id="sec-beneficios" class="bg-azul">
        <div class="max-width tx-c">
            <div class="vida-title tx-c">Conoce los beneficios que tenemos para ti</div>
            <div class="h30"></div>
            <div id="recomendados" class="swiper">
                <div class="swiper-wrapper"></div>
                <div class="swiper-button-next"></div><div class="swiper-button-prev"></div>
            </div>
        </div>

    </section>

    <section class="max-width tx-c p40">
        <div class="vida-title tx-c">Redime tus puntos en Farmacia Torres</div>
        <p>Aprovecha las mejores ofertas redimiendo tus puntos en nuestras droguerías o nuestras plataformas virtuales.</p>
        <div class="row2" style="justify-content: center;margin-left: -60px;">
            <div style="text-align: right;">
                <div id="puntos">
                    <h3 style="color: #143F85; text-align: left; margin: 0;"> Conoce nuestra tabla de puntos:</h3>
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
                    <div class="texto-pequeno" style="padding-top: 20px; font-size: 0.7em; font-weight: 300; color:#555; text-align: left;">*Puedes pagar hasta el 50% de tu compra con puntos.</div>
                    <br>
                    <div class="tx-l">
                        <button class="btn-primary-vida" onclick="scroll_to('registro')">Registrarme</button>
                    </div>
                </div>
            </div>
            <div id="image-puntos" style="width: 50%;">
                <div class="image-deco">
                    <img src="${ABS_URL}/assets/cliente.jpg" alt="">
                </div>
            </div>
        </div>
    </section>

    <section class="bg-azul p40">
        <div class="max-width tx-c">
            <div class="vida-title tx-c" style="font-weight: 500; font-size: 1.9em;">Disfruta de <b>beneficios exclusivos</b> con nuestros aliados</div>
            <div class="h30"></div>
            <div id="marcas" class="swiper swiper-marcas">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"><div onclick="modal(1)"><img src="${ABS_URL}/assets/logo1.png" alt=""></div></div>
                    <div class="swiper-slide"><div onclick="modal(2)"><img src="${ABS_URL}/assets/logo22.png" alt=""></div></div>
                    <div class="swiper-slide"><div onclick="modal(3)"><img src="${ABS_URL}/assets/logo11.jpg" alt=""></div></div>
                </div>
            </div>
            <div class="h30"></div>
            <p>*Los beneficios, descuentos u ofertas en las alianzas  descritas son exclusivos para miembros activos. **Un miembro activo es una persona que ha realizado compras en Droguería La Economía, Farmacia Torres o Farmacia Isimo en los últimos 90 días.</p>
        </div>
    </section>

    <section class="p40">
        <div class="porta-preguntas max-width p40" style="text-align: justify;">

            <h2 style="margin-top: 0;">Preguntas Frecuentes</h2>


         
            <button class="accordion22">¿Cómo puedo actualizar mis datos personales?</button>
            <div class="panel">
                <p>
				Puedes acercarte a tu droguería más cercana, llamanos al  (605) 3699090, (605) 3851717 o ingresando al siguiente link <a href="https://www.droguerialaeconomia.com/empresa/beneficios" target="_blank" />www.droguerialaeconomia.com/empresa/beneficios</a> - <a href="https://farmaciatorres.com/beneficios" target="_blank" />www.farmaciatorres.com/beneficios</a> registra tus datos y listo.
            	</p>
            </div>

            <button class="accordion22">¿Cómo me inscribo al Club Vida Sana o Club Vida Sana Silver?</button>
            <div class="panel">
                <p>
				Registrarse es gratis y muy sencillo, debes ser mayor de edad y tener cédula de ciudadanía. El registro lo puedes hacer en cualquiera de nuestras sucursales físicas de Droguería La Economía, Farmacia Torres e Isimo a nivel nacional o por las plataformas virtuales.<br><br>
Luego de registrarte lee la política de tratamiento de datos y si aceptas, haz clic en “autorizar”.
¡Comienza a acumular puntos en tus compras de medicamentos y redímelos para ahorrar!
            	</p>
            </div>

            <button class="accordion22">¿Cuáles Farmacias y/o Droguerías están vinculadas con el Club Vida Sana y Club Vida Sana Silver?</button>
            <div class="panel">
                <p>
				Todas las Droguerías Economías, Farmacias Torres e Isimo están habilitadas para que hagas parte del Club.
            	</p>
            </div>


            <button class="accordion22">¿Cómo acumulo puntos?</button>
            <div class="panel">
                <p>
				En las compras de medicamentos que realices en nuestras sucursales de Droguería La Economía, Farmacia Torres e Isimo. No aplica para las categorías de alimentos y bebidas, recargas, pago servicios de servicios públicos, gira más, pague aquí y reclame allá y otros pagos a terceros.
                </p>
            </div>

            <button class="accordion22">¿Cómo ver promociones del Club Vida Sana? </button>
            <div class="panel">
                <p>Está atento a tu correo electrónico, celular y redes sociales para que conozcas todas las ofertas y descuentos que tenemos disponibles para ti.</p>
            </div>

            <button class="accordion22">¿Mis puntos se vencen?</button>
            <div class="panel">
                <p>Los puntos tienen una vigencia de 6 meses a partir de la fecha en que inicies a acumular puntos. </p>
            </div>

            <button class="accordion22">¿Puedo canjear los puntos en efectivo? </button>
            <div class="panel">
                <p>No.  Los puntos no pueden ser cambiados a dinero y tampoco trasladados a terceros </p>
            </div>

            <button class="accordion22">¿Cómo puedo ganar puntos extras? </button>
            <div class="panel">
                <p>Siguenos en redes sociales y entérate cuando tengamos productos o referencias en los que acumularás doble o triple puntaje.</p>
            </div>

            <button class="accordion22">¿Cómo saber mi saldo de puntos Club Vida Sana? </button>
            <div class="panel">
                <p>Puedes acercarte a cualquiera de nuestras sucursales suministrando tu número de cedula o puedes ingresar a la pagina web de Droguería La Economía o Farmacia Torres y luego de iniciar sesión escoge la opción “Mis puntos” y listo, ahí encontrarás toda la información de tus puntos, compras y redenciones.</p>
            </div>

            <button class="accordion22">¿Cómo puedo redimir puntos en tiendas físicas y usarlos como medio de pago? </button>
            <div class="panel">
                <p>En las droguerías físicas de Droguería La Economía, Farmacia Torres e Isimo, para redimir tus puntos te enviaremos un mensaje con un código de confirmación por mensaje de texto o correo electrónico, el cual debes suministrarle a la persona en la caja para habilitar tu bono y descontarlo en la compra.
“Puedes pagar hasta 50% de la compra con puntos”</p>
            </div>

            <button class="accordion22">¿En qué lugares puedo redimir mis puntos? </button>
            <div class="panel">
                <p>Puedes redimir puntos en las sucursales físicas de Droguería La Economía, Farmacia Torres e Isimo o por las plataformas virtuales.</p>
            </div>

            <button class="accordion22">¿Cómo redimir mis puntos Club Vida Sana en la droguería online? </button>
            <div class="panel">
                <p>
   
				Ingresa a <a href="https://www.droguerialaeconomia.com" target="_blank" />www.droguerialaeconomia.com</a> ó <a href="https://farmaciatorres.com" target="_blank" />www.farmaciatorres.com</a>
<ul style="list-style= disc">
<li>Escribe en el buscador el producto que quieres comprar o haciendo clic en la imagen del producto seleccionado y añádelo al carrito.</li>
<li>Verifica tu compra en el carrito de compras.</li>
<li>Haz clic en comprar ahora.</li>
<li>Verifica cuantos puntos Visa Sana tienes acumulados y ten en cuenta que necesitas tener mínimo cinco mil puntos acumulados para redimirlos.</li>
<li>Haz clic en: Deseo redimir puntos en esta compra.</li>
<li>Selecciona el medio de pago, la dirección de entrega y confirma el pedido</li>
</ul>
</p>
            </div>

            <button class="accordion22">¿Cuáles son los puntos mínimos que necesito para redimir?  </button>
            <div class="panel">
                <p>Estos son los puntos que debes acumular para recibir tu bono regalo: <br>
                    Puntos 	           Bonos Regalos<br>
                    5.000	 >>>>   $5.000<br>
                    10.000   >>>>	  $10.000<br>
                    15.000   >>>>	  $15.000<br>
                    20.000  >>>>	  $20.000<br>
                    25.000  >>>>	  $25.000<br>
                </p>
            </div>

            <button class="accordion22">¿Qué debo hacer si presento algún inconveniente con la redención de mis puntos? </button>
            <div class="panel">
                <p>Puedes comunicarte a nuestra línea nacional 605 3699090 o 605 3851717 o puedes acercarte a nuestras tiendas fisicas, ahí contarás con el apoyo del vendedor presente.</p>
            </div>

            <button class="accordion22">¿Qué productos puedo comprar con mis puntos Vida Sana?  </button>
            <div class="panel">
                <p>Puedes comprar cualquier producto o referencia de la droguería. </p>
            </div>

            <button class="accordion22">¿Quién no puede hacer parte del Club Vida Sana? </button>
            <div class="panel">
                <p>Empresas y personas que realicen compras mayoristas; entendemos como mayoristas a compras superiores a 3.500.000 en el mes o más de 4 unidades de la misma referencia en el mismo mes. </p>
            </div>

            <button class="accordion22">¿Cómo puedo dejar de recibir los beneficios en los aliados del Club Vida Sana y Club Vida Sana Silver? </button>
            <div class="panel">
                <p>Escríbenos al correo habeasdata@ETICOSERRANO.onmicrosoft.com déjanos tu número de cedula para identificarte y luego procedemos a darte de baja en la base de datos.  </p>
            </div>



        </div>
        <div class="h30"></div><div class="h20"></div>
    </section>


    <section class="bg-azul p40">
        <div class="max-width row2">
            <div id="bolas" style="width: 300px; position: relative;">
                <img src="${ABS_URL}/assets/bola1.png" alt="" style="width: 168px;position: absolute;top: -94px;left: -45px;" />
                <img src="${ABS_URL}/assets/bola1.png" alt="" style="width: 149px;position: absolute;top: 12px;left: 69px;" />
                <img src="${ABS_URL}/assets/bola1.png" alt="" style="width: 108px;position: absolute;top: -28px;left: 186px;" />
            </div>
            <div class="flex1 tx-c">
                <div class="vida-title tx-c">¡Empieza a disfrutar los beneficios del Club Vida Sana hoy!</div>
                <br>
                <button class="btn-primary-vida" onclick="scroll_to('registro')" style="font-size: 1.4em;">Registrarme</button>
            </div>
            <div>
                <img id="celular" src="${ABS_URL}/assets/celu.png" alt="" style="max-width: 300px;" />
            </div>

        </div>

    </section>

${HTML.footer}
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>let device = '${device}';</script>
${HTML.scripts}
<script src="${ABS_URL}/js/home_vida.js"></script>
<script src="${ABS_URL}/js/header.js"></script>
</body></html>`}