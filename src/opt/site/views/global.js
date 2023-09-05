// const ABS_URL = `http://localhost:${process.env.PORT||3001}`;
const ABS_URL = ``;

module.exports = {

	ABS_URL,

	head: (param) => {
return /*html*/`
<!DOCTYPE html>
<html lang="es">
<head>
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5NLTF7C2');</script>
	<!-- End Google Tag Manager -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<title>Farmacia Torres | ${param.title}</title>
	<link href="${ABS_URL}/css/styles.css" rel="stylesheet">
	<link href="${ABS_URL}/css/plugins.css" rel="stylesheet">
	${param.userCSS ? `<link href="${ABS_URL}/css/user.css" rel="stylesheet"></link>` : ""}
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet">
	<link rel="shortcut icon" href="${ABS_URL}/assets/icon_logo.png" />

</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5NLTF7C2" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`},

	userMenu: /*html*/`
<div id="user-menu-cont">
	<div id="bg-user-profile">
		<div id="user-profile"></div>
	</div>
	<div id="username" class="h4 tx-c">Usuario</div>
	<br>
	<ul id="menu-ul">
		<li><a href="/perfil"><i class="fas fa-user-circle"></i> Mi cuenta</a></li>
		<li><a href="/pedidos"><i class="fas fa-file-invoice-dollar"></i> Mis Pedidos</a></li>
		<li><a href="/puntos"><i class="fas fa-star-of-life"></i> Mis Puntos</a></li>
		<li><a href="/direcciones"><i class="fas fa-map-marker-alt"></i> Mis Direcciones</a></li>
	</ul>
	<br>
	<p class="tx-c"><button onclick="pLog('logout')" class="page-button" style="background: #fa1d00; font-size:0.8em"><i class="fas fa-times-circle"></i> CERRAR SESIÓN</button></p>
</div>`,

	scripts: /*html*/`
<script src="${ABS_URL}/js/libraries.js"></script>
<script src="${ABS_URL}/js/utils.js"></script>
<script src="${ABS_URL}/js/api.js"></script>
<script src="${ABS_URL}/js/app.js"></script>
<script src="${ABS_URL}/js/cart.js"></script>
<script src="${ABS_URL}/js/products.js"></script>`,


	footer: /*html*/`
<div id="footer-cont">
	<div id="footer-deco"></div>
	<div class="max-width">
		<br>
		<h2 class="tx-c">Mantente en contacto con nosotros</h2>
		<div style="height: 20px;"></div>
		<!-- <div id="subscribe" class="row r-c">
			<div class="row"><span style="font-size: 0.9em; font-weight: 300;">Suscríbete al newsletter</span></div>
			<div id="suscribe-cont" class="row r-c"><input id="txt-suscribe" placeholder="Ingresa tu correo..." style="min-width: 300px;" /></div>
			<button>Suscribir</button>
		</div>
		<div style="height: 20px;"></div> -->
		<div id="contacto">
			<div><i class="far fa-envelope"></i> <a
					href="mailto:atencionalcliente@farmaciatorres.com">atencionalcliente@farmaciatorres.com</a></div>
			<div><a href="tel:+573215196404"><i class="fas fa-mobile-alt"></i> Llamar 321-519-6404</a></div>
			<div><a href="#"><i class="fas fa-comment"></i> Radicar PQRS</a></div>
		</div>
		<h3 class="tx-c">Síguenos en nuestras redes sociales</h3>
		<div class="row r-c social-icon">
			<a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/farmacia.torres.3"><img src="${ABS_URL}/assets/face.png" alt="face"></a>
			<a target="_blank" rel="noopener noreferrer" href="https://instagram.com/farmaciatorres"><img src="${ABS_URL}/assets/insta.png" alt="instagram"></a>
			<a target="_blank" rel="noopener noreferrer" href="https://wa.link/l318bk"><img src="${ABS_URL}/assets/whatsapp.png" alt="whatsapp" style="transform: scale(1.2)"></a></li>
		</div>
		<div id="links">
			<div>
				<h3 class="border title">La Empresa</h3>
				<ul>
					<li><a href="/empresa">Quiénes Somos</a></li>
					<li><a href="/historia">Misión, Visión e Historia</a></li>
					<li><a href="#">Nuestras Sucursales</a></li>
				</ul>
			</div>
			<div>
				<h3 class="border title">Privacidad</h3>
				<ul>
					<li><a href="/privacidad">Aviso de Privacidad</a></li>
					<li><a href="/politicas">Políticas de Términos de Uso</a></li>
					<li><a href="/habeas">Habeas Data</a></li>
				</ul>
			</div>
			<div>
				<h3 class="border title">Club Vida Sana</h3>
				<ul>
					<li><a href="/vidasana">Beneficios del Club</a></li>
					<li><a href="#">Actualiza tus datos</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div id="copyright">
		&copy; 2023 Farmacia Torres. Todos los derechos reservados. v1.0
	</div>
</div>

`,

	header: /*html*/`
<div id="modals-cont"></div>
<div id="buttomBar">
	<div><i class="fas fa-th-large"></i>categorias</div>
	<div id="user-btn2"><i class="fas fa-user"></i><span id="lbl-nombre">Acceso</span></div>
	<div id="user-ubicacion2"><i class="fas fa-map-marker-alt"></i><span id="lbl-ciudad2">Ubicación</span></div>
	<div onclick="parent.location='${ABS_URL}pedido'"><i class="fas fa-history"></i>pedidos</div>
</div>
<div id="header-cont">
	<div id="logo3" style="width:230px; margin: 10px auto 0 auto">
		<a href="/"><img src="${ABS_URL}/assets/logo2.png" alt="" style="width: 100%;" /></a>
	</div>
	<div id="header" class="max-width">
		<img src="${ABS_URL}/assets/logo-ani.png" alt="" style="width:70px; margin-right:15px" />
		<div id="logo" style="width:230px">
			<a href="/"><img src="${ABS_URL}/assets/logo2.png" alt="" style="width: 100%;" /></a>
		</div>
		<div id="logo2" style="width:30px; display: none">
			<a href="/"><img src="${ABS_URL}/assets/icon_logo2.png" alt="" style="width: 100%;" /></a>
		</div>
		<div class="autocomplete" class="f1">
			<div class="search-cont">
				<div class="f1"><input id="txt-search" class="txt-search"
						placeholder="Búsqueda..." autocomplete="off" /></div>
				<button class="btn-search"><i class="fa fa-search"></i></button>
			</div>
		</div>
		<div id="user-ubicacion" class="main-menu-item" style="border-left: 1px solid rgba(255,255,255,0.3)">
			<i class="fas fa-map-marker-alt"></i>
			<span id="lbl-ciudad" style="text-transform: capitalize;">ubicación...</span> 
			<i class="fas fa-chevron-down"></i>
		</div>
		<div id="user-btn" class="main-menu-item">
			<i class="fas fa-user"></i>
			<span id="lbl-nombre">Acceso</span> <i class="fas fa-chevron-down"></i>
		</div>
		<div class="main-menu-item relative" onclick="showCart(true)" data-id="cart">
			<i class="fas fa-shopping-cart" style="font-size: 1.3em"></i>
			<div id="cart-badge">0</div>
		</div>
	</div>

	<div id="back-categories">
		<div id="categories" class="max-width"></div>
	</div>
</div>
`,




}
