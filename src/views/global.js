const ABS_URL = "http://localhost:3001"

module.exports = {

	ABS_URL: ABS_URL,

	head: (param) => {
return /*html*/`
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<title>Farmacia Torres | ${param.title}</title>
	<link href="${ABS_URL}/css/styles.css" rel="stylesheet">
	<link href="${ABS_URL}/css/plugins.css" rel="stylesheet">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet">
	<link rel="shortcut icon" href="${ABS_URL}/assets/icon_logo.png" />
</head>
<body>`},

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
		<div style="height: 20px;"></div>
		<!-- <div id="subscribe" class="row r-c">
			<div class="row"><span style="font-size: 0.9em; font-weight: 300;">Suscríbete al newsletter</span></div>
			<div id="suscribe-cont" class="row r-c"><input id="txt-suscribe" placeholder="Ingresa tu correo..." style="min-width: 300px;" /></div>
			<button>Suscribir</button>
		</div>
		<div style="height: 20px;"></div> -->
		<h3 class="tx-center">Mantente en contacto con nosotros</h3>
		<div id="contacto" class="row r-c">
			<div><i class="far fa-envelope"></i> <a
					href="mailto:servicioalcliente@farmaciatorres.com">servicioalcliente@farmaciatorres.com</a></div>
			<div><a href="tel:+573157823477"><i class="fas fa-mobile-alt"></i> Llamar 315-782-3477</a></div>
			<div><a href="#"><i class="fas fa-comment"></i> Radicar PQRS</a></div>
		</div>
		<div style="height: 20px;"></div>
		<h3 class="tx-center">Síguenos en nuestras redes sociales</h3>
		<div class="row r-c social-icon">
			<a target="_blank" rel="noopener noreferrer" href="#"><img src="${ABS_URL}/assets/face.png" alt="face"></a>
			<a target="_blank" rel="noopener noreferrer" href="#"><img src="${ABS_URL}/assets/twitter.png"
					alt="twitter"></a>
			<a target="_blank" rel="noopener noreferrer" href="#"><img src="${ABS_URL}/assets/insta.png"
					alt="instagram"></a>
			<a target="_blank" rel="noopener noreferrer" href="#"><img src="${ABS_URL}/assets/you.png"
					alt="youtube"></a></li>
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
	<div id="copyright" class="row r-c">
		<div>&copy;2023 Farmacia Torres. Todos los derechos reservados. <small>v1.0</small></div>
	</div>
</div>
`,

	header: /*html*/`
<div id="modals-cont"></div>
<div id="header-cont">
	<div id="header" class="max-width">
		<div style="width:230px">
			<a href="/">
				<img src="${ABS_URL}/assets/logo.png" alt="" style="width: 100%;" />
			</a>
		</div>
		<div class="autocomplete" class="f1">
			<div class="search-cont">
				<div class="f1"><input id="txt-search" class="txt-search"
						placeholder="busca aquí todo lo que necesites..." autocomplete="off" /></div>
				<button class="btn-search"><i class="fa fa-search"></i></button>
			</div>
		</div>
		<div id="user-ubicacion" class="main-menu-item" style="border-left: 1px solid #eee;">
			<i class="fas fa-map-marker-alt"></i>
			<span id="lbl-ciudad" style="text-transform: capitalize;">ubicación...</span> <i
				class="fas fa-chevron-down"></i>
		</div>
		<div id="user-btn" class="main-menu-item">
			<i class="fas fa-user"></i>
			<span id="lbl-nombre">Iniciar Sesión</span> <i class="fas fa-chevron-down"></i>
		</div>
		<div class="main-menu-item relative" onclick="showCart(true)" data-id="cart">
			<i class="fas fa-shopping-cart"></i>
			<span>Items</span>
			<div id="cart-badge">0</div>
		</div>
	</div>

	<div id="back-categories">
		<div id="categories" class="max-width"></div>
	</div>
</div>
`

}
