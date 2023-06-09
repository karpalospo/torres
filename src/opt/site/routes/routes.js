const express = require('express');
const router = express.Router();

const homeView = require("../views/home.js");
const searchView = require("../views/busqueda.js");
const categoriasView = require("../views/categorias.js");
const productoView = require("../views/producto.js");
const empresaView = require("../views/empresa.js");
const vidasanaView = require("../views/vidasana.js");
const privacidadView = require("../views/privacidad.js");
const politicasView = require("../views/politicas.js");
const historiaView = require("../views/historia.js");
const habeasView = require("../views/habeas.js");
const pedidoView = require("../views/pedido.js");
const pedidoSuccessView = require("../views/pedido-success.js");
const registroView = require("../views/registro.js");
const registroSucessView = require("../views/registro-success.js");
const perfilView = require("../views/perfil.js");
const puntosView = require("../views/puntos.js");
const pedidosView = require("../views/pedidos.js");
const direccionesView = require("../views/direcciones.js");

function s(str) {
	return str.replace(/(\r\n|\n|\r|\t)/gm, "")
}

router.get('/', function(req, res) {    
    res.status(200).send(s(homeView()))
});

router.get('/busqueda/:str', function(req, res) {    
  res.status(200).send(s(searchView(req.params.str)))
});

router.get('/categorias/:sub', function(req, res) {    
	res.status(200).send(s(categoriasView("", req.params.sub)))
});

router.get('/categorias/:cat/:sub', function(req, res) {    
	res.status(200).send(s(categoriasView(req.params.cat, req.params.sub)))
});

router.get('/producto/:id', function(req, res) {    
	res.status(200).send(s(productoView(req.params.id)))
});

router.get('/pedido', function(req, res) {    
  res.status(200).send(s(pedidoView()))
});

router.get('/pedido-success/:id', function(req, res) {    
  res.status(200).send(s(pedidoSuccessView(req.params.id)))
});

router.get('/registro', function(req, res) {    
	res.status(200).send(s(registroView()))
});

router.get('/registro-exitoso', function(req, res) {    
	res.status(200).send(s(registroSucessView()))
});

router.get('/direcciones', function(req, res) {    
	res.status(200).send(s(direccionesView()))
});

router.get('/perfil', function(req, res) {    
	res.status(200).send(s(perfilView()))
});

router.get('/pedidos', function(req, res) {    
	res.status(200).send(s(pedidosView()))
});

router.get('/puntos', function(req, res) {    
	res.status(200).send(s(puntosView()))
});

router.get('/empresa', function(req, res) {    
  res.status(200).send(s(empresaView()))
});

router.get('/vidasana', function(req, res) {    
  res.status(200).send(s(vidasanaView()))
});

router.get('/privacidad', function(req, res) {    
  res.status(200).send(s(privacidadView()))
});

router.get('/politicas', function(req, res) {    
  res.status(200).send(s(politicasView()))
});

router.get('/historia', function(req, res) {    
  res.status(200).send(s(historiaView()))
});

router.get('/habeas', function(req, res) {    
	res.status(200).send(s(habeasView()))
});

module.exports = router;