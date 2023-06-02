const express = require('express');
const router = express.Router();

const homeView = require("../views/home.js");
const searchView = require("../views/busqueda.js");
const categoriasView = require("../views/categorias.js");
const productoView = require("../views/producto.js");
const empresaView = require("../views/empresa.js");
const pedidoView = require("../views/pedido.js");
const registroView = require("../views/registro.js");
const perfilView = require("../views/perfil.js");

function s(str) {
	return str.replace(/(\r\n|\n|\r|\t)/gm, "")
}
router.use(function timeLog(req, res, next) {
  next();
});

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

router.get('/registro', function(req, res) {    
	res.status(200).send(s(registroView()))
});

router.get('/perfil', function(req, res) {    
	res.status(200).send(s(perfilView()))
});

router.get('/empresa', function(req, res) {    
  res.status(200).send(s(empresaView()))
});

module.exports = router;