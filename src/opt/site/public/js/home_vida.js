store.page = "home"
store.location = "08001"
store.user = {
    convenio: "892300678"

};
store.noPromoCats = []
store.noPromoSubs = []


let $tabmenu = $("#tab-menu"),currentIndex;

async function page_init() {

    let banners = [
            {
                "id": 580,
                "web": "https://imperacore.net/assets/banner.jpg",
                "mobile": "https://imperacore.net/assets/bannerm.jpg",
                "popup": "",
                "data": {},
                "titlePublic": ""
            },
            {
                "id": 581,
                "web": "https://imperacore.net/assets/banner2.jpg",
                "mobile": "https://imperacore.net/assets/bannerm2.jpg",
                "popup": "",
                "data": {},
                "titlePublic": ""
            },
         
    ];

    productBounces = {
        rowCount: 6
    }

    if(device == "PHONE")  productBounces.rowCount = 2

    renderBanners($("#banner1"), banners, {device})

    let ss = "[code]";
    try {
        
        const res = await axios.post(`https://www.droguerialaeconomia.com/api/referencias/productosbeneficios`, {"ciudad":"08001","marca":"TOR"})
        // forEach(res.data.data, item => {
        //     if(item.codigo) ss += item.codigo + " "
        // })
        showProductsHorizontal($("#recomendados"), HomologarProductos(res.data.data), {hcarrusel: true, shuffle:true})
        
    } catch(error) {
        console.log(error)
    }

    //await search_products2("carrusel", ss, $("#recomendados").find(".swiper-wrapper"), {hcarrusel: true, shuffle:true, sort: {field:"descuento", mode:"desc"}})

    new Swiper($("#marcas")[0], 
        {
            direction: 'horizontal',
            slidesPerView: productBounces.rowCount,
            slidesPerGroup: productBounces.rowCount,
            loop: true,
            autoplay: {delay: 6000},
            preloadImages: false,
            lazy: true,
            // navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}
        }
    )

    new Swiper($("#recomendados")[0], 
        {
            slidesPerView: productBounces.rowCount,
            slidesPerGroup: productBounces.rowCount,
            loop: true,
            loopFillGroupWithBlank: true,
            autoplay: {delay: 8000},
            preloadImages: false,
            lazy: true,
            navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}
        }
    )


    $tabmenu.on("click", "> div", function(e) {

        let $items = $tabmenu.find("> div").removeClass("active"),
            $this = $(e.currentTarget),
            $tabs = $tabmenu.parent().find(".tabs"),
            index = $items.index($this),
            $tabCont = $("#tabs-cont")
        ;

        currentIndex = index
        $this.addClass("active")
        $tabs.not($tabs.eq(index)).hide(0)
        $tabs.eq(index).show(0)

        wwidth = $(".myswiper-wrapper").width()
        $(".myswiper-wrapper").trigger("scroll");
        
    });

    $tabmenu.find("> div").eq(0).trigger("click")
    

}

let time, $punticos = $(".punticos > div"), wwidth;
$(".myswiper-wrapper").on("scroll", e => {
    let p = e.target.scrollLeft / wwidth;
    clearTimeout(time)
    time = setTimeout(() => {
        $punticos.eq(0).css({transform: `scale(${1 - 0.2 * p})`})
        $punticos.eq(0).find(".color").css({opacity: p})
        $punticos.eq(1).css({transform: `scale(${1 - 0.2 * (1 - p)})`})
        $punticos.eq(1).find(".color").css({opacity: (1 - p)})
    }, 10)
})


function scroll_to(target) {

    $(window).scrollTo($("#" + target), {duration: 800})

 
}

async function search_products2(collection, str, $target, options) {
    res = await pLog("search", {str, location: store.location})
    if(!res.error) showProducts($target, res.data.products, collection, options)
}

$("#vs-todas").on("change", e => {
    let $elem = $(e.currentTarget),
        checked = $elem.is(":checked")
    ;
    $("#vs-texto, #vs-correo, #vs-llamada, #vs-whatsapp").attr("checked", checked)

})
$("#vs-terminacionemail").on("change", e => {
    if($("#vs-terminacionemail").val() == "otro") {
        let $parent = $("#vs-terminacionemail").parent()
        $("#vs-terminacionemail").remove()
        $parent.append(`<input type="text" id="vs-terminacionemail" style="width:60%"/>`)
        $parent.find("input").focus()
    }
})


function modal(id) {
    if(id == 1) {
        $("#marca-imagen").html(`<img src="assets/logo1.png" alt="" style="width: 100%;">`)
        $("#marca-nombre").html(`<div><h2 style="color: #1C58B7">Droguería La Economía</h2></div>Droguería`)
        $("#marca-texto").html(`Cadena de farmacias con presencia en Barranquilla y otras ciudades de Colombia. Ofrecen una amplia gama de productos, incluyendo medicamentos, productos de belleza, aseo personal, artículos para el hogar y mucho más.`)
        $("#marca-beneficio").html(`
        <li>Con cada compra acumula Puntos Vida Sana.</li>
        <li>Redime Puntos Vida Sana en tus compras.</li>
        <li>Promociones y descuentos exclusivos.</li>`)
    }
    if(id == 2) {
        $("#marca-imagen").html(`<img src="assets/logo22.png" alt="" style="width: 100%;">`)
        $("#marca-nombre").html(`<div><h2 style="color: #1C58B7">Farmacia Torres</h2></div>Droguería`)
        $("#marca-texto").html(`Cadena de farmacias con presencia en Barranquilla y otras ciudades de Colombia. Ofrecen una amplia gama de productos, incluyendo medicamentos, productos de belleza, aseo personal, artículos para el hogar y mucho más.`)
        $("marca-beneficio").html(`
        <li>Con cada compra acumula Puntos Vida Sana.</li>
        <li>Redime Puntos Vida Sana en tus compras.</li>
        <li>Promociones y descuentos exclusivos.</li>`)
    }
    if(id == 3) {
        $("#marca-imagen").html(`<img src="assets/logo11.jpg" alt="" style="width: 100%;">`)
        $("#marca-nombre").html(`<div><h2 style="color: #1C58B7">Isimo</h2></div>Droguería`)
        $("#marca-texto").html(`Cadena de farmacias con presencia en Barranquilla y otras ciudades de Colombia. Ofrecen una amplia gama de productos, incluyendo medicamentos, productos de belleza, aseo personal, artículos para el hogar y mucho más.`)
        $("#marca-beneficio").html(`
        <li>Con cada compra acumula Puntos Vida Sana.</li>
        <li>Redime Puntos Vida Sana en tus compras.</li>
        <li>Promociones y descuentos exclusivos.</li>`)
    }
    showModal(true, "marca")
}


async function enviarVida2(elem) {
    let $elem = $(elem)
    $elem.attr("disabled", true)

    let sendData = {

        "tipoDocumento": $("#vs-tipodoc").val(),
        "documento":  $("#vs-documento").val(),
        "nombres":  $("#vs-nombres").val(),
        "apellidos": $("#vs-apellidos").val(),
        "email":  $("#vs-email").val() + "@" + $("#vs-terminacionemail").val(),
        "celular": $("#vs-celular").val(),
        "texto": $("#vs-texto").prop('checked'),
        "correo": $("#vs-correo").prop('checked'),
        "llamada": $("#vs-llamada").prop('checked'),
        "whatsapp": $("#vs-whatsapp").prop('checked'),
        "marca": "TOR"
        
    }


    let res = await API.ley2300(sendData);
    
    $elem.attr("disabled", false)

    if(res.error) {
        alert(res.message)
    } else {
        if(res.data.success == true) {
            showAlert(true, "OK", "¡Gracias por actualizar tus datos!", "¡Tu información ha sido actualizada con éxito!")
            setTimeout(() => {
                parent.location = "/"
            }, 4000)
        } else {
            showAlert(true, "ERROR", "¡Hubo un error!", res.message)
        }

    }
}

let municipios = ["MEDELLÍN","ABEJORRAL","ABRIAQUÍ","ALEJANDRÍA","AMAGÁ","AMALFI","ANDES","ANGELÓPOLIS","ANGOSTURA","ANORÍ","SANTA FÉ DE ANTIOQUIA","ANZÁ","APARTADÓ","ARBOLETES","ARGELIA","ARMENIA","BARBOSA","BELMIRA","BELLO","BETANIA","BETULIA","CIUDAD BOLÍVAR","BRICEÑO","BURITICÁ","CÁCERES","CAICEDO","CALDAS","CAMPAMENTO","CAÑASGORDAS","CARACOLÍ","CARAMANTA","CAREPA","EL CARMEN DE VIBORAL","CAROLINA","CAUCASIA","CHIGORODÓ","CISNEROS","COCORNÁ","CONCEPCIÓN","CONCORDIA","COPACABANA","DABEIBA","DONMATÍAS","EBÉJICO","EL BAGRE","ENTRERRÍOS","ENVIGADO","FREDONIA","FRONTINO","GIRALDO","GIRARDOTA","GÓMEZ PLATA","GRANADA","GUADALUPE","GUARNE","GUATAPÉ","HELICONIA","HISPANIA","ITAGÜÍ","ITUANGO","JARDÍN","JERICÓ","LA CEJA","LA ESTRELLA","LA PINTADA","LA UNIÓN","LIBORINA","MACEO","MARINILLA","MONTEBELLO","MURINDÓ","MUTATÁ","NARIÑO","NECOCLÍ","NECHÍ","OLAYA","PEÑOL","PEQUE","PUEBLORRICO","PUERTO BERRÍO","PUERTO NARE","PUERTO TRIUNFO","REMEDIOS","RETIRO","RIONEGRO","SABANALARGA","SABANETA","SALGAR","SAN ANDRÉS DE CUERQUÍA","SAN CARLOS","SAN FRANCISCO","SAN JERÓNIMO","SAN JOSÉ DE LA MONTAÑA","SAN JUAN DE URABÁ","SAN LUIS","SAN PEDRO DE LOS MILAGROS","SAN PEDRO DE URABÁ","SAN RAFAEL","SAN ROQUE","SAN VICENTE FERRER","SANTA BÁRBARA","SANTA ROSA DE OSOS","SANTO DOMINGO","EL SANTUARIO","SEGOVIA","SONSÓN","SOPETRÁN","TÁMESIS","TARAZÁ","TARSO","TITIRIBÍ","TOLEDO","TURBO","URAMITA","URRAO","VALDIVIA","VALPARAÍSO","VEGACHÍ","VENECIA","VIGÍA DEL FUERTE","YALÍ","YARUMAL","YOLOMBÓ","YONDÓ","ZARAGOZA","BARRANQUILLA","BARANOA","CAMPO DE LA CRUZ","CANDELARIA","GALAPA","JUAN DE ACOSTA","LURUACO","MALAMBO","MANATÍ","PALMAR DE VARELA","PIOJÓ","POLONUEVO","PONEDERA","PUERTO COLOMBIA","REPELÓN","SABANAGRANDE","SABANALARGA","SANTA LUCÍA","SANTO TOMÁS","SOLEDAD","SUAN","TUBARÁ","USIACURÍ","BOGOTÁ. D.C.","CARTAGENA DE INDIAS","ACHÍ","ALTOS DEL ROSARIO","ARENAL","ARJONA","ARROYOHONDO","BARRANCO DE LOBA","CALAMAR","CANTAGALLO","CICUCO","CÓRDOBA","CLEMENCIA","EL CARMEN DE BOLÍVAR","EL GUAMO","EL PEÑÓN","HATILLO DE LOBA","MAGANGUÉ","MAHATES","MARGARITA","MARÍA LA BAJA","MONTECRISTO","SANTA CRUZ DE MOMPOX","MORALES","NOROSÍ","PINILLOS","REGIDOR","RÍO VIEJO","SAN CRISTÓBAL","SAN ESTANISLAO","SAN FERNANDO","SAN JACINTO","SAN JACINTO DEL CAUCA","SAN JUAN NEPOMUCENO","SAN MARTÍN DE LOBA","SAN PABLO","SANTA CATALINA","SANTA ROSA","SANTA ROSA DEL SUR","SIMITÍ","SOPLAVIENTO","TALAIGUA NUEVO","TIQUISIO","TURBACO","TURBANÁ","VILLANUEVA","ZAMBRANO","TUNJA","ALMEIDA","AQUITANIA","ARCABUCO","BELÉN","BERBEO","BETÉITIVA","BOAVITA","BOYACÁ","BRICEÑO","BUENAVISTA","BUSBANZÁ","CALDAS","CAMPOHERMOSO","CERINZA","CHINAVITA","CHIQUINQUIRÁ","CHISCAS","CHITA","CHITARAQUE","CHIVATÁ","CIÉNEGA","CÓMBITA","COPER","CORRALES","COVARACHÍA","CUBARÁ","GUAPI","CUCAITA","CUÍTIVA","CHÍQUIZA","CHIVOR","DUITAMA","EL COCUY","EL ESPINO","FIRAVITOBA","FLORESTA","GACHANTIVÁ","GÁMEZA","GARAGOA","GUACAMAYAS","GUATEQUE","GUAYATÁ","GÜICÁN DE LA SIERRA","IZA","JENESANO","JERICÓ","LABRANZAGRANDE","LA CAPILLA","LA VICTORIA","LA UVITA","VILLA DE LEYVA","MACANAL","MARIPÍ","MIRAFLORES","MONGUA","MONGUÍ","MONIQUIRÁ","MOTAVITA","MUZO","NOBSA","NUEVO COLÓN","OICATÁ","OTANCHE","PACHAVITA","PÁEZ","PAIPA","PAJARITO","PANQUEBA","PAUNA","PAYA","PAZ DE RÍO","PESCA","PISBA","PUERTO BOYACÁ","QUÍPAMA","RAMIRIQUÍ","RÁQUIRA","RONDÓN","SABOYÁ","SÁCHICA","SAMACÁ","SAN EDUARDO","SAN JOSÉ DE PARE","SAN LUIS DE GACENO","SAN MATEO","SAN MIGUEL DE SEMA","SAN PABLO DE BORBUR","SANTANA","SANTA MARÍA","SANTA ROSA DE VITERBO","SANTA SOFÍA","SATIVANORTE","SATIVASUR","SIACHOQUE","SOATÁ","SOCOTÁ","SOCHA","SOGAMOSO","SOMONDOCO","SORA","SOTAQUIRÁ","SORACÁ","SUSACÓN","SUTAMARCHÁN","SUTATENZA","TASCO","TENZA","TIBANÁ","TIBASOSA","TINJACÁ","TIPACOQUE","TOCA","TOGÜÍ","TÓPAGA","TOTA","TUNUNGUÁ","TURMEQUÉ","TUTA","TUTAZÁ","ÚMBITA","VENTAQUEMADA","VIRACACHÁ","ZETAQUIRA","MANIZALES","AGUADAS","ANSERMA","ARANZAZU","BELALCÁZAR","CHINCHINÁ","FILADELFIA","LA DORADA","LA MERCED","MANZANARES","MARMATO","MARQUETALIA","MARULANDA","NEIRA","NORCASIA","PÁCORA","PALESTINA","PENSILVANIA","RIOSUCIO","RISARALDA","SALAMINA","SAMANÁ","SAN JOSÉ","SUPÍA","VICTORIA","VILLAMARÍA","VITERBO","FLORENCIA","ALBANIA","BELÉN DE LOS ANDAQUÍES","CARTAGENA DEL CHAIRÁ","CURILLO","EL DONCELLO","EL PAUJÍL","LA MONTAÑITA","MILÁN","MORELIA","PUERTO RICO","SAN JOSÉ DEL FRAGUA","SAN VICENTE DEL CAGUÁN","SOLANO","SOLITA","VALPARAÍSO","POPAYÁN","ALMAGUER","ARGELIA","BALBOA","BOLÍVAR","BUENOS AIRES","CAJIBÍO","CALDONO","CALOTO","CORINTO","EL TAMBO","FLORENCIA","GUACHENÉ","INZÁ","JAMBALÓ","LA SIERRA","LA VEGA","LÓPEZ DE MICAY","MERCADERES","MIRANDA","MORALES","PADILLA","PÁEZ","PATÍA","PIAMONTE","PIENDAMÓ - TUNÍA","PUERTO TEJADA","PURACÉ","ROSAS","SAN SEBASTIÁN","SANTANDER DE QUILICHAO","SANTA ROSA","SILVIA","SOTARÁ PAISPAMBA","SUÁREZ","SUCRE","TIMBÍO","TIMBIQUÍ","TORIBÍO","TOTORÓ","VILLA RICA","VALLEDUPAR","AGUACHICA","AGUSTÍN CODAZZI","ASTREA","BECERRIL","BOSCONIA","CHIMICHAGUA","CHIRIGUANÁ","CURUMANÍ","EL COPEY","EL PASO","GAMARRA","GONZÁLEZ","LA GLORIA","LA JAGUA DE IBIRICO","MANAURE BALCÓN DEL CESAR","PAILITAS","PELAYA","PUEBLO BELLO","RÍO DE ORO","LA PAZ","SAN ALBERTO","SAN DIEGO","SAN MARTÍN","TAMALAMEQUE","MONTERÍA","AYAPEL","BUENAVISTA","CANALETE","CERETÉ","CHIMÁ","CHINÚ","CIÉNAGA DE ORO","COTORRA","LA APARTADA","LORICA","LOS CÓRDOBAS","MOMIL","MONTELÍBANO","MOÑITOS","PLANETA RICA","PUEBLO NUEVO","PUERTO ESCONDIDO","PUERTO LIBERTADOR","PURÍSIMA DE LA CONCEPCIÓN","SAHAGÚN","SAN ANDRÉS DE SOTAVENTO","SAN ANTERO","SAN BERNARDO DEL VIENTO","SAN CARLOS","SAN JOSÉ DE URÉ","SAN PELAYO","TIERRALTA","TUCHÍN","VALENCIA","AGUA DE DIOS","ALBÁN","ANAPOIMA","ANOLAIMA","ARBELÁEZ","BELTRÁN","BITUIMA","BOJACÁ","CABRERA","CACHIPAY","CAJICÁ","CAPARRAPÍ","CÁQUEZA","CARMEN DE CARUPA","CHAGUANÍ","CHÍA","CHIPAQUE","CHOACHÍ","CHOCONTÁ","COGUA","COTA","CUCUNUBÁ","EL COLEGIO","EL PEÑÓN","EL ROSAL","FACATATIVÁ","FÓMEQUE","FOSCA","FUNZA","FÚQUENE","FUSAGASUGÁ","GACHALÁ","GACHANCIPÁ","GACHETÁ","GAMA","GIRARDOT","GRANADA","GUACHETÁ","GUADUAS","GUASCA","GUATAQUÍ","GUATAVITA","GUAYABAL DE SÍQUIMA","GUAYABETAL","GUTIÉRREZ","JERUSALÉN","JUNÍN","LA CALERA","LA MESA","LA PALMA","LA PEÑA","LA VEGA","LENGUAZAQUE","MACHETÁ","MADRID","MANTA","MEDINA","MOSQUERA","NARIÑO","NEMOCÓN","NILO","NIMAIMA","NOCAIMA","VENECIA","PACHO","PAIME","PANDI","PARATEBUENO","PASCA","PUERTO SALGAR","PULÍ","QUEBRADANEGRA","QUETAME","QUIPILE","APULO","RICAURTE","SAN ANTONIO DEL TEQUENDAMA","SAN BERNARDO","SAN CAYETANO","SAN FRANCISCO","SAN JUAN DE RIOSECO","SASAIMA","SESQUILÉ","SIBATÉ","SILVANIA","SIMIJACA","SOACHA","SOPÓ","SUBACHOQUE","SUESCA","SUPATÁ","SUSA","SUTATAUSA","TABIO","TAUSA","TENA","TENJO","TIBACUY","TIBIRITA","TOCAIMA","TOCANCIPÁ","TOPAIPÍ","UBALÁ","UBAQUE","VILLA DE SAN DIEGO DE UBATÉ","UNE","ÚTICA","VERGARA","VIANÍ","VILLAGÓMEZ","VILLAPINZÓN","VILLETA","VIOTÁ","YACOPÍ","ZIPACÓN","ZIPAQUIRÁ","QUIBDÓ","ACANDÍ","ALTO BAUDÓ","ATRATO","BAGADÓ","BAHÍA SOLANO","BAJO BAUDÓ","BOJAYÁ","EL CANTÓN DEL SAN PABLO","CARMEN DEL DARIÉN","CÉRTEGUI","CONDOTO","EL CARMEN DE ATRATO","EL LITORAL DEL SAN JUAN","ISTMINA","JURADÓ","LLORÓ","MEDIO ATRATO","MEDIO BAUDÓ","MEDIO SAN JUAN","NÓVITA","NUQUÍ","RÍO IRÓ","RÍO QUITO","RIOSUCIO","SAN JOSÉ DEL PALMAR","SIPÍ","TADÓ","UNGUÍA","UNIÓN PANAMERICANA","NEIVA","ACEVEDO","AGRADO","AIPE","ALGECIRAS","ALTAMIRA","BARAYA","CAMPOALEGRE","COLOMBIA","ELÍAS","GARZÓN","GIGANTE","GUADALUPE","HOBO","ÍQUIRA","ISNOS","LA ARGENTINA","LA PLATA","NÁTAGA","OPORAPA","PAICOL","PALERMO","PALESTINA","PITAL","PITALITO","RIVERA","SALADOBLANCO","SAN AGUSTÍN","SANTA MARÍA","SUAZA","TARQUI","TESALIA","TELLO","TERUEL","TIMANÁ","VILLAVIEJA","YAGUARÁ","RIOHACHA","ALBANIA","BARRANCAS","DIBULLA","DISTRACCIÓN","EL MOLINO","FONSECA","HATONUEVO","LA JAGUA DEL PILAR","MAICAO","MANAURE","SAN JUAN DEL CESAR","URIBIA","URUMITA","VILLANUEVA","SANTA MARTA","ALGARROBO","ARACATACA","ARIGUANÍ","CERRO DE SAN ANTONIO","CHIVOLO","CIÉNAGA","CONCORDIA","EL BANCO","EL PIÑÓN","EL RETÉN","FUNDACIÓN","GUAMAL","NUEVA GRANADA","PEDRAZA","PIJIÑO DEL CARMEN","PIVIJAY","PLATO","PUEBLOVIEJO","REMOLINO","SABANAS DE SAN ÁNGEL","SALAMINA","SAN SEBASTIÁN DE BUENAVISTA","SAN ZENÓN","SANTA ANA","SANTA BÁRBARA DE PINTO","SITIONUEVO","TENERIFE","ZAPAYÁN","ZONA BANANERA","VILLAVICENCIO","ACACÍAS","BARRANCA DE UPÍA","CABUYARO","CASTILLA LA NUEVA","CUBARRAL","CUMARAL","EL CALVARIO","EL CASTILLO","EL DORADO","FUENTE DE ORO","GRANADA","GUAMAL","MAPIRIPÁN","MESETAS","LA MACARENA","URIBE","LEJANÍAS","PUERTO CONCORDIA","PUERTO GAITÁN","PUERTO LÓPEZ","PUERTO LLERAS","PUERTO RICO","RESTREPO","SAN CARLOS DE GUAROA","SAN JUAN DE ARAMA","SAN JUANITO","SAN MARTÍN","VISTAHERMOSA","PASTO","ALBÁN","ALDANA","ANCUYA","ARBOLEDA","BARBACOAS","BELÉN","BUESACO","COLÓN","CONSACÁ","CONTADERO","CÓRDOBA","CUASPUD CARLOSAMA","CUMBAL","CUMBITARA","CHACHAGÜÍ","EL CHARCO","EL PEÑOL","EL ROSARIO","EL TABLÓN DE GÓMEZ","EL TAMBO","FUNES","GUACHUCAL","GUAITARILLA","GUALMATÁN","ILES","IMUÉS","IPIALES","LA CRUZ","LA FLORIDA","LA LLANADA","LA TOLA","LA UNIÓN","LEIVA","LINARES","LOS ANDES","MAGÜÍ","MALLAMA","MOSQUERA","NARIÑO","OLAYA HERRERA","OSPINA","FRANCISCO PIZARRO","POLICARPA","POTOSÍ","PROVIDENCIA","PUERRES","PUPIALES","RICAURTE","ROBERTO PAYÁN","SAMANIEGO","SANDONÁ","SAN BERNARDO","SAN LORENZO","SAN PABLO","SAN PEDRO DE CARTAGO","SANTA BÁRBARA","SANTACRUZ","SAPUYES","TAMINANGO","TANGUA","SAN ANDRÉS DE TUMACO","TÚQUERRES","YACUANQUER","SAN JOSÉ DE CÚCUTA","ÁBREGO","ARBOLEDAS","BOCHALEMA","BUCARASICA","CÁCOTA","CÁCHIRA","CHINÁCOTA","CHITAGÁ","CONVENCIÓN","CUCUTILLA","DURANIA","EL CARMEN","EL TARRA","EL ZULIA","GRAMALOTE","HACARÍ","HERRÁN","LABATECA","LA ESPERANZA","LA PLAYA","LOS PATIOS","LOURDES","MUTISCUA","OCAÑA","PAMPLONA","PAMPLONITA","PUERTO SANTANDER","RAGONVALIA","SALAZAR","SAN CALIXTO","SAN CAYETANO","SANTIAGO","SARDINATA","SILOS","TEORAMA","TIBÚ","TOLEDO","VILLA CARO","VILLA DEL ROSARIO","ARMENIA","BUENAVISTA","CALARCÁ","CIRCASIA","CÓRDOBA","FILANDIA","GÉNOVA","LA TEBAIDA","MONTENEGRO","PIJAO","QUIMBAYA","SALENTO","PEREIRA","APÍA","BALBOA","BELÉN DE UMBRÍA","DOSQUEBRADAS","GUÁTICA","LA CELIA","LA VIRGINIA","MARSELLA","MISTRATÓ","PUEBLO RICO","QUINCHÍA","SANTA ROSA DE CABAL","SANTUARIO","BUCARAMANGA","AGUADA","ALBANIA","ARATOCA","BARBOSA","BARICHARA","BARRANCABERMEJA","BETULIA","BOLÍVAR","CABRERA","CALIFORNIA","CAPITANEJO","CARCASÍ","CEPITÁ","CERRITO","CHARALÁ","CHARTA","CHIMA","CHIPATÁ","CIMITARRA","CONCEPCIÓN","CONFINES","CONTRATACIÓN","COROMORO","CURITÍ","EL CARMEN DE CHUCURI","EL GUACAMAYO","EL PEÑÓN","EL PLAYÓN","ENCINO","ENCISO","FLORIÁN","FLORIDABLANCA","GALÁN","GÁMBITA","GIRÓN","GUACA","GUADALUPE","GUAPOTÁ","GUAVATÁ","GÜEPSA","HATO","JESÚS MARÍA","JORDÁN","LA BELLEZA","LANDÁZURI","LA PAZ","LEBRIJA","LOS SANTOS","MACARAVITA","MÁLAGA","MATANZA","MOGOTES","MOLAGAVITA","OCAMONTE","OIBA","ONZAGA","PALMAR","PALMAS DEL SOCORRO","PÁRAMO","PIEDECUESTA","PINCHOTE","PUENTE NACIONAL","PUERTO PARRA","PUERTO WILCHES","RIONEGRO","SABANA DE TORRES","SAN ANDRÉS","SAN BENITO","SAN GIL","SAN JOAQUÍN","SAN JOSÉ DE MIRANDA","SAN MIGUEL","SAN VICENTE DE CHUCURÍ","SANTA BÁRBARA","SANTA HELENA DEL OPÓN","SIMACOTA","SOCORRO","SUAITA","SUCRE","SURATÁ","TONA","VALLE DE SAN JOSÉ","VÉLEZ","VETAS","VILLANUEVA","ZAPATOCA","SINCELEJO","BUENAVISTA","CAIMITO","COLOSÓ","COROZAL","COVEÑAS","CHALÁN","EL ROBLE","GALERAS","GUARANDA","LA UNIÓN","LOS PALMITOS","MAJAGUAL","MORROA","OVEJAS","PALMITO","SAMPUÉS","SAN BENITO ABAD","SAN JUAN DE BETULIA","SAN MARCOS","SAN ONOFRE","SAN PEDRO","SAN LUIS DE SINCÉ","SUCRE","SANTIAGO DE TOLÚ","SAN JOSÉ DE TOLUVIEJO","IBAGUÉ","ALPUJARRA","ALVARADO","AMBALEMA","ANZOÁTEGUI","ARMERO","ATACO","CAJAMARCA","CARMEN DE APICALÁ","CASABIANCA","CHAPARRAL","COELLO","COYAIMA","CUNDAY","DOLORES","ESPINAL","FALAN","FLANDES","FRESNO","GUAMO","HERVEO","HONDA","ICONONZO","LÉRIDA","LÍBANO","SAN SEBASTIÁN DE MARIQUITA","MELGAR","MURILLO","NATAGAIMA","ORTEGA","PALOCABILDO","PIEDRAS","PLANADAS","PRADO","PURIFICACIÓN","RIOBLANCO","RONCESVALLES","ROVIRA","SALDAÑA","SAN ANTONIO","SAN LUIS","SANTA ISABEL","SUÁREZ","VALLE DE SAN JUAN","VENADILLO","VILLAHERMOSA","VILLARRICA","CALI","ALCALÁ","ANDALUCÍA","ANSERMANUEVO","ARGELIA","BOLÍVAR","BUENAVENTURA","GUADALAJARA DE BUGA","BUGALAGRANDE","CAICEDONIA","CALIMA","CANDELARIA","CARTAGO","DAGUA","EL ÁGUILA","EL CAIRO","EL CERRITO","EL DOVIO","FLORIDA","GINEBRA","GUACARÍ","JAMUNDÍ","LA CUMBRE","LA UNIÓN","LA VICTORIA","OBANDO","PALMIRA","PRADERA","RESTREPO","RIOFRÍO","ROLDANILLO","SAN PEDRO","SEVILLA","TORO","TRUJILLO","TULUÁ","ULLOA","VERSALLES","VIJES","YOTOCO","YUMBO","ZARZAL","ARAUCA","ARAUQUITA","CRAVO NORTE","FORTUL","PUERTO RONDÓN","SARAVENA","TAME","YOPAL","AGUAZUL","CHÁMEZA","HATO COROZAL","LA SALINA","MANÍ","MONTERREY","NUNCHÍA","OROCUÉ","PAZ DE ARIPORO","PORE","RECETOR","SABANALARGA","SÁCAMA","SAN LUIS DE PALENQUE","TÁMARA","TAURAMENA","TRINIDAD","VILLANUEVA","MOCOA","COLÓN","ORITO","PUERTO ASÍS","PUERTO CAICEDO","PUERTO GUZMÁN","PUERTO LEGUÍZAMO","SIBUNDOY","SAN FRANCISCO","SAN MIGUEL","SANTIAGO","VALLE DEL GUAMUEZ","VILLAGARZÓN","SAN ANDRÉS","PROVIDENCIA","LETICIA","EL ENCANTO","LA CHORRERA","LA PEDRERA","LA VICTORIA","MIRITÍ - PARANÁ","PUERTO ALEGRÍA","PUERTO ARICA","PUERTO NARIÑO","PUERTO SANTANDER","TARAPACÁ","INÍRIDA","BARRANCOMINAS","SAN FELIPE","PUERTO COLOMBIA","LA GUADALUPE","CACAHUAL","PANA PANA","MORICHAL","SAN JOSÉ DEL GUAVIARE","CALAMAR","EL RETORNO","MIRAFLORES","MITÚ","CARURÚ","PACOA","TARAIRA","PAPUNAHUA","YAVARATÉ","PUERTO CARREÑO","LA PRIMAVERA","SANTA ROSALÍA","CUMARIBO"];

const $txtSearch = $("#vs-ciudad")
$txtSearch.attr('autocomplete', 'off').show(0)
$txtSearch.change(function(){console.log($txtSearch.val()); if($txtSearch.val().indexOf("@") > -1) $txtSearch.val("")})
autocomplete($txtSearch[0], municipios);
